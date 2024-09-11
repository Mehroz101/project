import React, { useEffect, useState } from "react";
import "../styles/ManageSpace.css";
import { Link } from "react-router-dom";
import SpaceRow from "./SpaceRow";
import { getSpace, handleDelete } from "../../services/spaceService";
import { SearchFunctionality } from "../../services/SearchService";

const ManageSpace = () => {
  const [spaces, setSpaces] = useState([]); // Original data from backend
  const [activeFilter, setActiveFilter] = useState("all"); // State to keep track of active filter
  const { handleSearchChange, setData, setFilteredData, filteredData } =
    SearchFunctionality(); // Initialize search functionality from service

  // Fetch data from backend
  const spaceRequest = async () => {
    try {
      const response = await getSpace();
      const spacesArray = response.data.data;
      setSpaces(spacesArray); // Save the fetched data
      setFilteredData(spacesArray); // Initialize filteredData with all spaces
    } catch (error) {
      console.error("Error fetching spaces:", error);
    }
  };

  // Filter based on status or badge
  const updateListView = (state) => {
    setActiveFilter(state);
    if (state === "all") {
      setFilteredData(spaces); // Reset filtered data to show all
      return;
    }
    if (state === "badge") {
      setFilteredData(spaces.filter((space) => space.badge)); // Filter by badge
      return;
    }
    const status = state;
    setFilteredData(spaces.filter((space) => space.state === status)); // Filter by status
  };

  const handleDeleteSpace = async (spaceId) => {
    await handleDelete(spaceId); // Call delete function
    spaceRequest(); // Refresh space data after deletion
  };

  const handleToggleStatus = async (spaceId, newState) => {
    setSpaces((prevSpaces) =>
      prevSpaces.map((space) =>
        space._id === spaceId ? { ...space, state: newState } : space
      )
    );
    await spaceRequest(); // Refresh space data after status change
  };

  useEffect(() => {
    spaceRequest(); // Initial data fetch
  }, []);

  // Call setData with filtered data to update based on search term
  useEffect(() => {
    setData(spaces);
  }, [spaces, setData]);

  return (
    <>
      <div className="manage_space_container">
        <h2>Manage Space</h2>
        <div className="create_space">
          <Link to="create-space">
            <button>List New Space</button>
          </Link>
        </div>

        {/* Filter Navbar */}
        <div className="filter_navbar">
          <ul>
            <li className={`${activeFilter === "all" ? "active" : ""}`}>
              <Link onClick={() => updateListView("all")}>All</Link>
            </li>
            <li className={`${activeFilter === "active" ? "active" : ""}`}>
              <Link onClick={() => updateListView("active")}>Active</Link>
            </li>
            <li className={`${activeFilter === "deactivated" ? "active" : ""}`}>
              <Link onClick={() => updateListView("deactivated")}>Deactive</Link>
            </li>
            <li className={`${activeFilter === "badge" ? "active" : ""}`}>
              <Link onClick={() => updateListView("badge")}>Badge</Link>
            </li>
          </ul>
        </div>

        {/* Search Box */}
        <div className="search_filter">
          <div className="search_box">
            <div className="search_input">
              <input
                type="text"
                placeholder="Search..."
                onChange={handleSearchChange} // Update search term
              />
              <button>Search</button>
            </div>
          </div>
        </div>

        {/* Manage Spaces List */}
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
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <SpaceRow
                    key={index}
                    spaceInfo={item}
                    spaceIndex={index}
                    handleToggleStatus={handleToggleStatus}
                    handleDeleteSpace={handleDeleteSpace}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="9">No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageSpace;
