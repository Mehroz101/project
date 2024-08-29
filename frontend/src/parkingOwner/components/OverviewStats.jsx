import React from 'react';
import "../styles/OverviewStats.css";
import "./Chart"
import Chart from './Chart';
const OverviewStats = () => {
    return (
        <div className="overview_stats">
            <div className="stats_container">
                <div className="stat_item">
                    <div className="stat_header">
                        <span>Total Earnings</span>
                    </div>
                    <div className="stat_value">
                        <h2>$8,540</h2>
                    </div>
                </div>
                <div className="stat_item">
                    <div className="stat_header">
                        <span>Available Slots</span>
                    </div>
                    <div className="stat_value">
                        <h2>12</h2>
                    </div>
                </div>
                <div className="stat_item">
                    <div className="stat_header">
                        <span>Total Bookings</span>
                    </div>
                    <div className="stat_value">
                        <h2>342</h2>
                    </div>
                </div>
                <div className="stat_item">
                    <div className="stat_header">
                        <span>Pending Withdrawals</span>
                    </div>
                    <div className="stat_value">
                        <h2>$1,200</h2>
                    </div>
                </div>
            </div>
            <div className="graph_container">
                <h3>Monthly Earnings</h3>
                {/* Here, you can include a graph/chart library like Chart.js */}
                <div className="earnings_graph">
                    {/* Placeholder for the graph */}
                    <Chart/>
                </div>
            </div>
        </div>
    );
};

export default OverviewStats;
