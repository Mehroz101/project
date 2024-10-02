import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/ParkingOwnerDashboard.css"; // Import your routes

const ParkingOwnerDashboard = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("dashboard");

  // Set active link based on the current URL path
  useEffect(() => {
    const pathParts = location.pathname.split("/"); // Split the path by "/"
    const lastPart = pathParts[pathParts.length - 1] || "dashboard"; // Get the last part, default to "dashboard"
    setActiveLink(lastPart);
  }, [location]); // Update the state whenever the location changes

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard_page">
        <div className="dashboard_left">
          <ul>
            <li>
              <Link
                className={`${activeLink === "profile" ? "active" : ""}`}
                to="/profile"
                onClick={() => handleLinkClick("profile")}
              >
                Go to Profile
              </Link>
            </li>
            <li>
              <Link
                className={`${activeLink === "dashboard" ? "active" : ""}`}
                to="/dashboard"
                onClick={() => handleLinkClick("dashboard")}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  activeLink === "reservation-request" ? "active" : ""
                }`}
                to="reservation-request"
                onClick={() => handleLinkClick("reservation-request")}
              >
                Reservation Request
              </Link>
            </li>
            <li>
              <Link
                className={`${activeLink === "manage-space" ? "active" : ""}`}
                to="manage-space"
                onClick={() => handleLinkClick("manage-space")}
              >
                Manage Space
              </Link>
            </li>
            <li>
              <Link
                className={`${activeLink === "earning" ? "active" : ""}`}
                to="earning"
                onClick={() => handleLinkClick("earning")}
              >
                Earning
              </Link>
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
