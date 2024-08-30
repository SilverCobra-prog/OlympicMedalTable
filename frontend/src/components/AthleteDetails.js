import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AthleteDetails({ athleteId }) {
  const [athlete, setAthlete] = useState(null);

  useEffect(() => {
    fetchAthleteDetails(athleteId);
  }, [athleteId]);

  const fetchAthleteDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/athletes/${id}`);
      setAthlete(response.data);
    } catch (error) {
      console.error('Error fetching athlete details:', error);
    }
  };

  if (!athlete) return <div>Loading...</div>;

  return (
    <div className="athlete-details">
      <h2>{athlete.athlete_name}</h2>
      <p><strong>Country:</strong> {athlete.country}</p>
      <p><strong>Sport:</strong> {athlete.sport}</p>
      <p><strong>Event:</strong> {athlete.event}</p>
      <p><strong>Gold:</strong> {athlete.gold}</p>
      <p><strong>Silver:</strong> {athlete.silver}</p>
      <p><strong>Bronze:</strong> {athlete.bronze}</p>
    </div>
  );
}

export default AthleteDetails;
