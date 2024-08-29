import React from 'react';
import '../styles/NotificationsAlerts.css';

const NotificationsAlerts = () => {
  return (
    <div className="notifications_alerts">
      <div className="alert_card">
        <h3>Low Occupancy Alerts</h3>
        <p>No recent low occupancy alerts.</p>
      </div>
      <div className="alert_card">
        <h3>Payment Issues</h3>
        <p>No recent payment issues.</p>
      </div>
    </div>
  );
};

export default NotificationsAlerts;
