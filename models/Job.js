const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobNumber: {
    type: String,
    unique: true,
    required: true
  },
  crewNumber: {
    type: String,
    required: true
  },
  client: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-generate job number before saving
JobSchema.pre('save', function(next) {
  if (!this.jobNumber) {
    const lastJob = mongoose.model('Job').find().sort('-createdAt').limit(1);
    this.jobNumber = `JC-${String(lastJob + 1).padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Job', JobSchema);