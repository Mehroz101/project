import React from "react";

const ParkingFinderCard = () => {
  return (
    <>
      <div className="parking_finder_card">
        <form action="">
          <input type="text" placeholder="Location" className="location" name="location" />
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
          <input type="submit" value="Find" className="btn"/>
        </form>
      </div>
    </>
  );
};

export default ParkingFinderCard;
