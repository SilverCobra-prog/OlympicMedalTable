import React from 'react';
import '../styles/Filter.css';

function Filter({ searchTerm, onSearch }) {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Search by country"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default Filter;
