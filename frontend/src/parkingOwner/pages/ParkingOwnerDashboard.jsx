import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/ParkingOwnerDashboard.css"; // Import your routes


const ParkingOwnerDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard_page">
        <div className="dashboard_left">
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="reservation-request">Reservation Request</Link>
            </li>
            <li>
              <Link to="manage-space">Manage Space</Link>
            </li>
            <li>
              <Link to="earning">Earning</Link>
            </li>
          </ul>
        </div>
        <div className="dashboard_right">
        
          <Outlet />
          
        </div>
      </div>
    </>
  );
};

export default ParkingOwnerDashboard;
