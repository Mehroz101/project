import React from "react";
import "../styles/ManageSpace.css";
import { Link } from "react-router-dom";
import SpaceRow from "./SpaceRow";
import "../styles/ManageSpace.css"
const ManageSpace = () => {
  return (
    <>
      <div className="manage_space_container">
        <h2>Manage Space</h2>
        <div className="create_space">
          <Link to="create-space">
            <button>List New Space</button>
          </Link>
        </div>
        <div className="space_numbers space_numbers_hide">
          
          <div className="total_space">
            <p>Total listing</p>
            <h2>42</h2>
          </div>
          <div className="active_space">
            <p>Active listing</p>
            <h2>12</h2>
          </div>
          <div className="deactived_space">
            <p>Deactivated listing</p>
            <h2>112</h2>
          </div>
        </div>
        <div className="filter_navbar">
          <ul>
            <li className="active">
              <Link>All</Link>
            </li>
            <li>
              <Link>Active</Link>
            </li>
            <li>
              <Link>Deactive</Link>
            </li>
            <li>
              <Link>Badge</Link>
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
          {/* <select name="filter_option">
            <option value="pending">pending</option>
            <option value="complete">complete</option>
            <option value="cancel">canceled</option>
          </select> */}
        </div>
        <div className="manage_space_list">
          <table className="highlight responsive_table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Title</th>
                <th>Badge</th>
                <th>Reservation Id</th>
                <th>Total Booking</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <SpaceRow/>
              <SpaceRow/>
              <SpaceRow/>
              <SpaceRow/>
              <SpaceRow/>
              <SpaceRow/>
              <SpaceRow/>
              <SpaceRow/>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageSpace;
