import React from "react";
import { useState } from "react";
import { useSearch } from "../context/SearchContext";
import { useNavigate } from "react-router";
const ParkingFinderCard = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [inputValue, setInputValue] = useState(searchQuery);
const navigate = useNavigate()
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);
    navigate("/searchResult")
  };
  return (
    <>
      <div className="parking_finder_card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Location"
            value={inputValue}
            onChange={handleChange}
            className="location"
            name="location"
          />
          <div className="date_time">
            <div className="arrival">
              <label htmlFor="arrival">Arrival</label>
              <input type="date" name="arrival_date" id="arrival" />
              <input type="time" name="arrival_time" id="arrival" />
            </div>
            <div className="leave">
              <label htmlFor="leave">Leave</label>
              <input type="date" name="leave_date" id="leave" />
              <input type="time" name="leave_time" id="leave" />
            </div>
          </div>
          <input type="submit" value="Find" className="btn" />
        </form>
      </div>
    </>
  );
};

export default ParkingFinderCard;
