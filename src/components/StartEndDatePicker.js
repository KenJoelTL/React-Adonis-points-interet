import React, { useState } from 'react';

function DatePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <div>
      <label htmlFor="start-date">Start Date:</label>
      <input type="date" id="start-date" onChange={handleStartDateChange} />
      <br />
      <label htmlFor="end-date">End Date:</label>
      <input type="date" id="end-date" onChange={handleEndDateChange} />
      <br />
      <p>
        Start Date: {startDate ? startDate : 'Not selected'}
        <br />
        End Date: {endDate ? endDate : 'Not selected'}
      </p>
    </div>
  );
}

export default DatePicker;
