import React, { useEffect, useState } from 'react';

const CrewCalendar = () => {
  const [crew, setCrew] = useState([])
  const [schedule, setSchedule] = useState([])

  useEffect(() => {
    fetch('/api/crew')
      .then(response => response.json())
      .then(data => setCrew(data))

    fetch('/api/schedule')
      .then(response => response.json())
      .then(data => setSchedule(data))
  }, [])

  return (
    <div>
      <h3>Crew Schedule</h3>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px'}}>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
        <div>Sunday</div>

        {Array(7).fill(null).map((_, dayIndex) => (
          <div key={dayIndex}>
            {crew.map(member => (
              <div key={member.id}>
                {member.name}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CrewCalendar;
