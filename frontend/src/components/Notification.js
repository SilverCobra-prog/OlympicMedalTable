import React from 'react';
import '../styles/Notification.css';

function Notification({ notifications }) {
  return (
    <div className="notification-container">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notification;
