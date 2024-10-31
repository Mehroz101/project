import React, { useEffect } from 'react';
import "../styles/RecentActivities.css";
import { useParkingOwner } from '../../context/ReservationContext';

const RecentActivities = () => {
    // const activities = [
    //     { id: 1, type: 'Booking', description: 'Reserved parking slot #12', time: '2 hours ago' },
    //     { id: 2, type: 'Payment', description: 'Received payment of $45', time: '5 hours ago' },
    //     { id: 3, type: 'Slot Released', description: 'Slot #7 became available', time: '1 day ago' },
    //     { id: 4, type: 'Booking', description: 'Reserved parking slot #3', time: '2 days ago' },
    //     { id: 5, type: 'Payment', description: 'Received payment of $80', time: '3 days ago' },
    // ];
    const { notifications } = useParkingOwner(); // Get notifications from context

    useEffect(() => {
        // You can add additional logic if needed for when notifications change
    }, [notifications]);

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
                            {new Date(notification.timestamp).toLocaleString()}
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
    );
};

export default RecentActivities;
