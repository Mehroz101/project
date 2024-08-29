import React from 'react';
import "../styles/RecentActivities.css";

const RecentActivities = () => {
    const activities = [
        { id: 1, type: 'Booking', description: 'Reserved parking slot #12', time: '2 hours ago' },
        { id: 2, type: 'Payment', description: 'Received payment of $45', time: '5 hours ago' },
        { id: 3, type: 'Slot Released', description: 'Slot #7 became available', time: '1 day ago' },
        { id: 4, type: 'Booking', description: 'Reserved parking slot #3', time: '2 days ago' },
        { id: 5, type: 'Payment', description: 'Received payment of $80', time: '3 days ago' },
    ];

    return (
        <div className="recent_activities">
            <h3>Recent Activities</h3>
            <ul className="activities_list">
                {activities.map(activity => (
                    <li key={activity.id} className={`activity_item ${activity.type.toLowerCase()}`}>
                        <div className="activity_type">{activity.type}</div>
                        <div className="activity_description">{activity.description}</div>
                        <div className="activity_time">{activity.time}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivities;
