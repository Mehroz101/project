import React from 'react';
import '../styles/NotificationsAlerts.css';
import { useParkingOwner } from '../../context/ReservationContext';

const NotificationsAlerts = () => {
  const { notifications } = useParkingOwner(); // Access notifications from context

  return (
    <div className="notifications_alerts">
      {notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        notifications.map((notif, index) => (
          <div key={index} className="alert_card">
            <h3>Notification</h3>
            <p>{notif.message}</p>
            <span>{new Date(notif.timestamp).toLocaleString()}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationsAlerts;
