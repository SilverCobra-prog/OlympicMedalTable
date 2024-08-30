import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MedalTable from './components/MedalTable';
import Filter from './components/Filter';
import AthleteDetails from './components/AthleteDetails';
import Notification from './components/Notification';
import './styles/App.css';

function App() {
  const [medals, setMedals] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAthleteId, setSelectedAthleteId] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchMedalData();
    fetchNotifications();
  }, []);

  const fetchMedalData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/medals');
      setMedals(response.data);
      setAthletes(response.data); // Assuming athletes are part of the medal data
    } catch (error) {
      console.error('Error fetching medal data:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = medals.filter((item) =>
      item.country.toLowerCase().includes(term.toLowerCase())
    );
    setMedals(filtered);
  };

  const handleAthleteClick = (athleteId) => {
    setSelectedAthleteId(athleteId);
  };

  return (
    <div className="app-container">
      <h1>Olympic Medal Tracker</h1>
      <Filter searchTerm={searchTerm} onSearch={handleSearch} />
      <MedalTable medals={medals} onAthleteClick={handleAthleteClick} />
      {selectedAthleteId && <AthleteDetails athleteId={selectedAthleteId} />}
      <Notification notifications={notifications} />
    </div>
  );
}

export default App;
