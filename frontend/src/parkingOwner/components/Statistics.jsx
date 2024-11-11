import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Statistics.css'; // Ensure your CSS file is properly linked
import { useParkingOwner } from '../../context/ReservationContext';

const OverviewStatistics = ({reservation,space}) => {
  const navigate = useNavigate();
  // const { reservation = [], space = {} } = useParkingOwner(); // Default empty values
  const [stats, setStats] = useState({
    totalSpaces: 0,
    availableSpaces: 0,
    pendingRequests: 0,
    completedRequests: 0,
  });

  const handleManageSpace = () => {
    navigate('manage-space');
  };
  const handleManageRequest = () => {
    navigate('reservation-request');
  };

  // Update the statistics whenever `reservation` or `space` changes
  useEffect(() => {
    const totalSpaces = space.length || 0;
    const availableSpaces = space.filter((slot) => slot.state === 'active').length || 0;
    const pendingRequests = reservation?.filter((request) => request?.state === 'pending' && request.spaceId !== null).length || 0;
    const completedRequests = reservation?.filter((request) => request.state === 'completed').length || 0;
    //console.log("reservation",reservation)
    //console.log("totalSpaces",totalSpaces)
    //console.log("availableSpaces",availableSpaces)
    //console.log("pendingRequests",pendingRequests)
    //console.log("completedRequests",completedRequests)

//console.log(reservation)
//console.log(space)
    // Set the updated stats
    setStats({
      totalSpaces,
      availableSpaces,
      pendingRequests,
      completedRequests,
    });
  }, [reservation,space]); // Dependencies

  return (
    <div className="overview_statistics">
      <div className="stats_card">
        <h3>Total Spaces</h3>
        <p>{stats.totalSpaces}</p>
        <button onClick={handleManageSpace}>Manage Spaces</button>
      </div>
      <div className="stats_card">
        <h3>Available Spaces</h3>
        <p>{stats.availableSpaces}</p>
        <button onClick={handleManageSpace}>Manage Spaces</button>
      </div>
      <div className="stats_card">
        <h3>Pending Requests</h3>
        <p>{stats.pendingRequests}</p>
        <button onClick={handleManageRequest}>Manage Requests</button>
      </div>
      <div className="stats_card">
        <h3>Completed Requests</h3>
        <p>{stats.completedRequests}</p>
        <button onClick={handleManageRequest}>Manage Reservations</button>
      </div>
    </div>
  );
};

export default OverviewStatistics;
