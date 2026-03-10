import React, { useEffect, useState } from 'react';

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/api/jobs')
      .then((response) => response.json())
      .then((data) => setJobs(Array.isArray(data) ? data : (data.data || data.jobs || [])))
      .catch(() => setJobs([]));
  }, []);

  return (
    <div>
      <h3>All Jobs</h3>
      <ul>
        {jobs.map((job) => (
          <li key={job._id || job.id}>
            <strong>{job.jobNumber}</strong> - {job.quoteId}
            <br />
            Status: {job.status}
            <br />
            Crew: {job.crew?.length > 0 ? job.crew.join(', ') : 'Unassigned'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;
