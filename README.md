# Job Tracking System for Process Mechanical Contractors

A lightweight job tracking application designed for small specialty mechanical contractors to centralize job information from scattered sources (email, spreadsheets) and provide a single source of truth for crew assignments, job status, and next actions.

## Overview

This application replaces scattered spreadsheets and email threads with a centralized system for managing:
- Job intake and tracking
- Crew assignments and availability
- Next actions and checklists
- File attachments (drawings, specs, photos)
- Reporting and dashboards

## Tech Stack

### Backend
- **Framework**: Node.js + Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Simple team sharing (JWT optional)
- **File Storage**: Local filesystem with multer
- **Quote Import**: csv-parser or xlsx for Excel files

### Frontend
- **Framework**: React 18+ with functional components
- **Build Tool**: Vite (fast, modern)
- **Styling**: Tailwind CSS (lightweight, utility-first)
- **State Management**: React Context + useReducer
- **Routing**: React Router v6

## Key Features

### Job Management
- Auto-generated job numbers (JOB-YYYY-NNNN)
- Status tracking (quote, pending, active, on_hold, completed, cancelled)
- Crew assignment with availability calendar
- Next actions checklist with due dates
- File attachments for drawings, specs, photos
- Quote import from CSV/Excel files

### Crew Management
- Team member profiles with skills and roles
- Availability tracking
- Hourly rates
- Assignment scheduling

### Reporting
- Active jobs dashboard
- Crew utilization metrics
- Overdue actions tracking
- Margin analysis

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB running locally or remote connection
- Git for version control

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mechanical-contractors
```

2. Install dependencies:
```bash
cd backend && npm install
cd ../frontend && npm install
```

3. Set up environment variables:
```bash
# Backend .env
MONGODB_URI=mongodb://localhost:27017/mechanical_contractors
PORT=3001
NODE_ENV=development

# Frontend .env
VITE_API_URL=http://localhost:3001/api
```

4. Start the backend server:
```bash
cd backend
npm run dev
```

5. Start the frontend development server:
```bash
cd frontend
npm run dev
```

6. Open your browser to `http://localhost:5173`

## Database Schema

### Jobs Collection
```javascript
{
  _id: ObjectId,
  jobNumber: String,          // Auto-generated: JOB-2025-0001
  title: String,
  description: String,
  status: String,            // 'quote', 'pending', 'active', 'on_hold', 'completed', 'cancelled'
  priority: String,          // 'low', 'medium', 'high', 'urgent'
  client: {
    name: String,
    company: String,
    email: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zip: String
    }
  },
  quote: {
    quoteNumber: String,
    totalValue: Number,
    marginPercent: Number,
    estimatedHours: Number,
    startDate: Date,
    completionDate: Date,
    source: String           // 'email', 'excel', 'manual'
  },
  milestones: [{
    name: String,
    date: Date,
    status: String,
    notes: String
  }],
  crewAssignments: [{
    crewMemberId: ObjectId,
    role: String,
    startDate: Date,
    endDate: Date,
    hours: Number
  }],
  nextActions: [{
    description: String,
    dueDate: Date,
    assignedTo: ObjectId,
    completed: Boolean,
    completedAt: Date
  }],
  attachments: [{
    filename: String,
    originalName: String,
    path: String,
    type: String,
    uploadedAt: Date,
    uploadedBy: ObjectId
  }],
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date,
  notes: String
}
```

### Crew Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  role: String,
  skills: [String],
  availability: {
    status: String,
    notes: String
  },
  hourlyRate: Number,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Jobs
- `GET /api/jobs` - List jobs with filters
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Archive job
- `POST /api/jobs/:id/attachments` - Upload files
- `POST /api/jobs/:id/next-actions` - Add next action

### Crew
- `GET /api/crew` - List all crew members
- `GET /api/crew/:id` - Get crew member details
- `POST /api/crew` - Add crew member
- `PUT /api/crew/:id` - Update crew member

### Quotes
- `POST /api/quotes/import` - Import from CSV/Excel
- `POST /api/quotes` - Manual quote entry
- `POST /api/quotes/:id/convert-to-job` - Create job from quote

### Reports
- `GET /api/reports/active-jobs` - Active jobs count
- `GET /api/reports/crew-utilization` - Crew utilization
- `GET /api/reports/overdue-actions` - Overdue actions
- `GET /api/reports/job-margin` - Margin analysis

## Development Phases

### Phase 1: Foundation (Week 1-2)
- Project setup with Vite + React
- Express server + MongoDB connection
- Basic CRUD API for jobs and crew
- Simple React job list

### Phase 2: Core Features (Week 3-4)
- Job number auto-generation
- Quote CSV import
- Crew availability display
- Next actions checklist
- File attachment upload

### Phase 3: Workflow (Week 5-6)
- Job timeline with milestones
- Crew assignment calendar
- Email notifications
- Search and filtering

### Phase 4: Reporting (Week 7-8)
- Dashboard with charts
- Advanced reports
- Responsive mobile design
- Performance optimizations

## Success Criteria

1. **Single source of truth**: All job info in one place
2. **Crew visibility**: See who's assigned where without calling
3. **Quick job intake**: Quote to job in under 5 minutes
4. **Mobile-accessible**: Field crews can view on phones
5. **Lightweight**: <30 second load times, minimal clicks
6. **Low maintenance**: Simple stack easy for small team

## Deployment

### Local Setup
```bash
# Backend
docker-compose up -d mongodb
npm run dev

# Frontend
npm run dev
```

### Cloud Deployment
- Frontend: Vercel
- Backend + MongoDB: Railway or Hetzner
- File Storage: S3 or Cloudflare R2

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.