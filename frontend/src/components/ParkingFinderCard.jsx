import React, { useEffect } from "react";
import { useState } from "react";
import { useSearch } from "../context/SearchContext";
import { useNavigate } from "react-router";
import { useParkingFinderCardForm } from "../services/useParkingFinderCardForm";
import { useParams } from "react-router-dom";
const ParkingFinderCard = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const { searchInput, arrivalDate, arrivalTime, leaveDate, leaveTime } =
    useParams();

  // const [inputValue, setInputValue] = useState(searchQuery);
  const { handleChange, handleSubmit, findParking } =
    useParkingFinderCardForm();
  const navigate = useNavigate();
  // const handleChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const response = handleSubmit();
    if (response === 400) {
      return;
    }
    // setSearchQuery(inputValue);
    navigate(
      `/searchResult/${findParking.searchInput}/${findParking.arrivalDate}/${findParking.arrivalTime}/${findParking.leaveDate}/${findParking.leaveTime}/${findParking.totalHours}`
    );
  };
  useEffect(() => {
    findParking.searchInput = searchInput;
    findParking.arrivalTime = arrivalTime;
    findParking.arrivalDate = arrivalDate;
    findParking.leaveTime = leaveTime;
    findParking.leaveDate = leaveDate;
  }, []);
  return (
    <>
      <div className="parking_finder_card">
        <form onSubmit={handleSubmitForm}>
          <input
            type="text"
            placeholder="Location"
            value={findParking.searchInput}
            onChange={handleChange}
            className="location"
            name="searchInput"
          />
          <div className="date_time">
            <div className="arrival">
              <label htmlFor="arrival">Arrival</label>
              <input
                type="date"
                name="arrivalDate"
                onChange={handleChange}
                value={findParking.arrivalDate}
                id="arrival"
              />
              <input
                type="time"
                name="arrivalTime"
                onChange={handleChange}
                value={findParking.arrivalTime}
                id="arrival"
              />
            </div>
            <div className="leave">
              <label htmlFor="leave">Leave</label>
              <input
                type="date"
                name="leaveDate"
                onChange={handleChange}
                value={findParking.leaveDate}
                id="leave"
              />
              <input
                type="time"
                name="leaveTime"
                onChange={handleChange}
                value={findParking.leaveTime}
                id="leave"
              />
            </div>
          </div>
          <input type="submit" value="Find" className="btn" />
        </form>
      </div>
    </>
  );
};

export default ParkingFinderCard;
