import React from "react";
import "../styles/OverviewStats.css";
import "./Chart";
import Chart from "./Chart";
import { useParkingOwner } from "../../context/ReservationContext";

const OverviewStats = () => {
  const { reservation, space } = useParkingOwner();

  // console.log("reservtion")
  // console.log(reservation)
  const totalEarning = Array.isArray(reservation)
    ? reservation.reduce((acc, request) => {
        const price = parseFloat(request.totalPrice); // Convert to number
        return acc + (isNaN(price) ? 0 : price); // Handle invalid numbers
      }, 0)
    : 0;
    const withdrawable = Array.isArray(reservation)
    ? reservation.reduce((acc, request) => {
      
        if (request.state === "completed" && request.withdrawn === false) {
          const price = parseFloat(request.totalPrice);
          return acc + (isNaN(price) ? 0 : price);
        }
        return acc;
      }, 0)
    : 0;
  console.log("withdrawable");
  console.log(withdrawable);

  return (
    <div className="overview_stats">
      <div className="stats_container">
        <div className="stat_item">
          <div className="stat_header">
            <span>Total Earnings</span>
          </div>
          <div className="stat_value">
            <h2>${totalEarning}</h2>
          </div>
        </div>
        <div className="stat_item">
          <div className="stat_header">
            <span>Available Slots</span>
          </div>
          <div className="stat_value">
            <h2>{space?.data?.data?.length}</h2>
          </div>
        </div>
        <div className="stat_item">
          <div className="stat_header">
            <span>Total Bookings</span>
          </div>
          <div className="stat_value">
            <h2>{reservation?.length}</h2>
          </div>
        </div>
        <div className="stat_item">
          <div className="stat_header">
            <span>Withdrawable</span>
          </div>
          <div className="stat_value">
            <h2>${withdrawable}</h2>
          </div>
        </div>
      </div>
      <div className="graph_container">
        <h3>Monthly Earnings</h3>
        {/* Here, you can include a graph/chart library like Chart.js */}
        <div className="earnings_graph">
          {/* Placeholder for the graph */}
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default OverviewStats;
