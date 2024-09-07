import React, { useEffect, useState } from "react";
import "../styles/ManageSpace.css";
import { Link } from "react-router-dom";
import SpaceRow from "./SpaceRow";
import { getSpace } from "../../services/spaceService";

const ManageSpace = () => {
  const [spaces, setSpaces] = useState([]); // Renamed to 'spaces' for clarity
  const [updateSpaces, setUpdateSpaces] = useState([]); // Renamed to 'spaces' for clarity
  const [activeFilter, setActiveFilter] = useState("all"); // State to keep track of active filter

  const spaceRequest = async () => {
    try {
      const response = await getSpace(); // Fetch data from backend
      const spacesArray = response.data.data;
console.log(spacesArray)
      setSpaces(spacesArray); // Set the state with the array
      setUpdateSpaces(spacesArray);
    } catch (error) {
      console.error("Error fetching spaces:", error);
    }
  };
  const updateListView = (state) => {
    setActiveFilter(state);
    if (state === "all") {
      setUpdateSpaces(spaces);
      return;
    }
    if (state === "badge") {
      setUpdateSpaces(spaces.filter((space) => space.badge));
      return;
    }
    const status = state;

    setUpdateSpaces(spaces.filter((space) => space.state === status));
  };
  const handleToggleStatus = (spaceId, newState) => {
    setSpaces((prevSpaces) =>
      prevSpaces.map((space) =>
        space._id === spaceId ? { ...space, state: newState } : space
      )
    );
    spaceRequest()
  };
  useEffect(() => {
    spaceRequest();
  }, []);

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
            <h2>{spaces.length}</h2>
          </div>
          <div className="active_space">
            <p>Active listing</p>
            <h2>{spaces.filter((space) => space.state === "active").length}</h2>
          </div>
          <div className="deactived_space">
            <p>Deactivated listing</p>
            <h2>
              {spaces.filter((space) => space.state === "deactivated").length}
            </h2>
          </div>
        </div>
        <div className="filter_navbar">
          <ul>
            <li className={`${activeFilter === "all" ? "active" : ""}`}>
              <Link onClick={() => updateListView("all")}>All</Link>
            </li>
            <li className={`${activeFilter === "active" ? "active" : ""}`}>
              <Link onClick={() => updateListView("active")}>Active</Link>
            </li>
            <li className={`${activeFilter === "deactivated" ? "active" : ""}`}>
              <Link onClick={() => updateListView("deactivated")}>
                Deactive
              </Link>
            </li>
            <li className={`${activeFilter === "badge" ? "active" : ""}`}>
              <Link onClick={() => updateListView("badge")}>Badge</Link>
            </li>
          </ul>
        </div>
        <div className="search_filter">
          <div className="search_box">
            <select name="search_option">
              <option value="id">Id</option>
              <option value="title">Title</option>
            </select>
            <div className="search_input">
              <input type="text" placeholder="Search..." />
              <button>Search</button>
            </div>
          </div>
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
              {updateSpaces.map((space, index) => (
                <SpaceRow
                  key={index}
                  spaceInfo={space}
                  spaceIndex={index}
                  handleToggleStatus={handleToggleStatus}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageSpace;
