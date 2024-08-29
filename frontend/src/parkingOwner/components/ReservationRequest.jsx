import React from "react";
import "../styles/ReservationRequest.css";
import { Link } from "react-router-dom";
import RequestRow from "./RequestRow";
const ReservationRequest = () => {
  return (
    <>
      <div className="reservation_request_container">
        <h2>Reservation Request</h2>
        <div className="create_request">
          <Link to="create-request">
            <button>create request</button>
          </Link>
        </div>
        <div className="requests_numbers requests_numbers_hide">
          <div className="request_day">
            <h2>Today</h2>
          </div>
          <div className="total_request">
            <p>Total request</p>
            <h2>42</h2>
          </div>
          <div className="pending_request">
            <p>Pending request</p>
            <h2>12</h2>
          </div>
          <div className="total_completed_request">
            <p>Total completed request</p>
            <h2>112</h2>
          </div>
        </div>
        <div className="filter_navbar">
          <ul>
            <li className="active">
              <Link>All</Link>
            </li>
            <li>
              <Link>completed</Link>
            </li>
            <li>
              <Link>running</Link>
            </li>
            <li>
              <Link>pending</Link>
            </li>
            <li>
              <Link>canceled</Link>
            </li>
          </ul>
        </div>
        <div className="search_filter">
          <div className="search_box">
            <select name="search_option">
              <option value="id">Id</option>
              <option value="title">title</option>
            </select>
            <div className="search_input">
              <input type="text" placeholder="search..." />
              <button>search</button>
            </div>
          </div>
          <select name="filter_option">
            <option value="pending">pending</option>
            <option value="complete">complete</option>
            <option value="cancel">canceled</option>
          </select>
        </div>
        <div className="reservation_request_list">
          <table className="highlight responsive_table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Title</th>
                <th>Request Id</th>
                <th>Arrival</th>
                <th>Leave</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
             
              <RequestRow />
              <RequestRow />
              <RequestRow />
              <RequestRow />
              <RequestRow />
              <RequestRow />
              <RequestRow />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ReservationRequest;
