import React from 'react';
import JobForm from './components/JobForm.jsx';
import JobList from './components/JobList.jsx';
import CrewCalendar from './components/CrewCalendar.jsx';

function App() {
  return (
    <div style={{maxWidth: '900px', margin: 'auto', padding: '20px'}}>
      <h1>Job Tracking for Mechanical Contractors</h1>
      <JobForm />
      <hr />
      <JobList />
      <hr />
      <CrewCalendar />
    </div>
  )
}

export default App;
