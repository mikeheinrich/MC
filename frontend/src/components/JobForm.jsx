import React from 'react';
import { useState } from 'react';

const JobForm = () => {
  const [formData, setFormData] = useState({ quoteId: '', jobNumber: '', crewNeeds: [], status: 'open' })

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    .then(() => alert('Job created!'))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Quote ID" value={formData.quoteId} onChange={(e) => setFormData({...formData, quoteId: e.target.value})}/>
      <input type="text" placeholder="Job Number" value={formData.jobNumber} onChange={(e) => setFormData({...formData, jobNumber: e.target.value})}/>
      <select>
        {['Pipe', 'Sanitary', 'HVAC', 'Electrical'].map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <button type="submit">Create Job</button>
    </form>
  )
}

export default JobForm;
