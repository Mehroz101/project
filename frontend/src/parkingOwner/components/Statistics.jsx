import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Statistics.css'; // Ensure your CSS file is properly linked

const OverviewStatistics = () => {
  const navigate = useNavigate();

  const handleManageSpace = () => {
    // Redirect to the space management page
    navigate('/space-management');
  };

  return (
    <div className="overview_statistics">
      <div className="stats_card">
        <h3>Total Spaces</h3>
        <p>50</p>
        <button onClick={handleManageSpace}>Manage Spaces</button>
      </div>
      <div className="stats_card">
        <h3>Available Spaces</h3>
        <p>20</p>
        <button onClick={handleManageSpace}>Manage Spaces</button>
      </div>
      <div className="stats_card">
        <h3>Reserved Spaces</h3>
        <p>10</p>
        <button onClick={handleManageSpace}>Manage Spaces</button>
      </div>
      <div className="stats_card">
        <h3>Pending Requests</h3>
        <p>5</p>
        <button onClick={handleManageSpace}>Manage Requests</button>
      </div>
      <div className="stats_card">
        <h3>Completed Reservations</h3>
        <p>15</p>
        <button onClick={handleManageSpace}>Manage Reservations</button>
      </div>
    </div>
  );
};

export default OverviewStatistics;
