import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  jobNumber: {
    type: String,
    unique: true,
    required: true,
    default: 'JOB-XXXX-0000',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['quote', 'pending', 'active', 'on_hold', 'completed', 'cancelled'],
    default: 'quote',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },

  // Client/Owner info
  client: {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'],
    },
    phone: {
      type: String,
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        // regex pattern to validate US state codes
        match: [/^[A-Z]{2}$/, 'Please fill a valid 2-character US state code'],
      },
      zip: {
        type: String,
        match: [/^[0-9]{5}(-[0-9]{4})?$/, 'Please fill a valid ZIP code'],
      },
    },
  },

  // Quote information
  quote: {
    quoteNumber: {
      type: String,
      required: true,
      unique: true,
    },
    totalValue: {
      type: Number,
      min: 0,
      default: 0,
    },
    marginPercent: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    estimatedHours: {
      type: Number,
      min: 0,
      default: 0,
    },
    startDate: {
      type: Date,
    },
    completionDate: {
      type: Date,
    },
    source: {
      type: String,
      enum: ['email', 'excel', 'manual'],
      default: 'manual',
    },
  },

  // Timeline
  milestones: [{
    name: String,
    date: Date,
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed'],
      default: 'pending',
    },
    notes: String,
  }],

  // Crew assignments
  crewAssignments: [{
    crewMemberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crew',
    },
    role: String,
    startDate: Date,
    endDate: Date,
    hours: {
      type: Number,
      min: 0,
      default: 0,
    },
  }],

  // Next Actions (checklist)
  nextActions: [{
    description: String,
    dueDate: Date,
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crew',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: Date,
  }],

  // Attachments
  attachments: [{
    filename: String,
    originalName: String,
    path: String,
    type: String,
    uploadedAt: Date,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crew',
    },
  }],

  // Metadata
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crew',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  notes: String,
});

// Pre-save hook to update jobNumber if it's still the default
JobSchema.pre('save', async function (next) {
  if (this.isNew && this.jobNumber === 'JOB-XXXX-0000') {
    // Find the highest existing job number in the current year
    const currentYear = new Date().getFullYear();
    const lastJob = await this.constructor.findOne({
      jobNumber: { regex: `^JOB-${currentYear}-` },
      status: { $ne: 'cancelled' }
    }).sort('-jobNumber').lean();

    if (lastJob && lastJob.jobNumber) {
      // Extract the number part and increment it
      const lastNumberPart = lastJob.jobNumber.match(/JOB-${currentYear}-(\d{4})/)[1];
      const nextNumber = parseInt(lastNumberPart) + 1;
      this.jobNumber = `JOB-${currentYear}-${String(nextNumber).padStart(4, '0')}`;
    } else {
      // Start with 0001 if this is the first job for the year
      this.jobNumber = `JOB-${currentYear}-0001`;
    }
  }
  this.updatedAt = Date.now();
  next();
});

// Case-insensitive index for name fields
JobSchema.index({ 'client.name': 1 }, { collation: { strength: 2 } });
JobSchema.index({ 'client.company': 1 }, { collation: { strength: 2 } });

export default mongoose.model('Job', JobSchema);