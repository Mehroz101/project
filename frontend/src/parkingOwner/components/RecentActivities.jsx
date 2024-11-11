import React, { useEffect } from 'react';
import "../styles/RecentActivities.css";
import { useParkingOwner } from '../../context/ReservationContext';
import { reviewDateCalculator } from './Functions';

const RecentActivities = () => {
  
    const { notifications } = useParkingOwner(); // Get notifications from context

    return (
        <div className="recent_activities">
        <h3>Recent Activities</h3>
        {notifications.length === 0 ? (
            <p>No recent activities.</p>
        ) : (
            <ul className="activities_list">
                {notifications.map((notification, index) => (
                    <li key={index} className={`activity_item`}>
                        <div className="activity_type">Notification</div>
                        <div className="activity_description">{notification.message}</div>
                        <div className="activity_time">
                            {reviewDateCalculator(notification.timestamp)}
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
    );
};

export default RecentActivities;
