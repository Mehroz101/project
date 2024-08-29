import React, { useState } from "react";
import Img from "../assets/hero_img.png";
import { Link } from "react-router-dom";
import ReviewPopup from "./ReviewPopup";

const ReservationHistory = () => {
  const [reviewBox, setReviewBox] = useState(false);
  const hidePopupFun = () => {
    setReviewBox(false);
  };
  return (
    <div className="reservation_history_container">
      <h2>Booking History</h2>
      <div className="filter_navbar">
        <select name="filter" id="filter">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <div className="reservation_list">
        <table className="highlight responsive_table">
          <thead>
            <tr>
              <th>S No.</th>
              <th>Image</th>
              <th>Location</th>
              <th>Reservation ID</th>
              <th>Arrival</th>
              <th>Leave</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <img src={Img} alt="Reservation" />
              </td>
              <td>Mall of Multan, Multan</td>
              <td>12345</td>
              <td>08/14/24 4:00PM</td>
              <td>08/14/24 7:00PM</td>
              <td>$7</td>
              <td>
                <span className="status canceled">Canceled</span>
              </td>
              <td>
                {/* <button>Direction</button>
                <button>Review</button> */}
              </td>
            </tr>
            <tr>
              <td>1</td>

              <td>
                <img src={Img} alt="Reservation" />
              </td>
              <td>Mall of Multan, Multan</td>
              <td>12345</td>
              <td>08/14/24 4:00PM</td>
              <td>08/14/24 7:00PM</td>
              <td>$7</td>
              <td>
                <span className="status completed">Completed</span>
              </td>
              <td>
                {/* <button>Direction</button> */}
                <button onClick={() => setReviewBox(true)}>Review</button>
              </td>
            </tr>
            <tr>
              <td>1</td>

              <td>
                <img src={Img} alt="Reservation" />
              </td>
              <td>Mall of Multan, Multan</td>
              <td>12345</td>
              <td>08/14/24 4:00PM</td>
              <td>08/14/24 7:00PM</td>
              <td>$7</td>
              <td>
                <span className="status pending">Pending</span>
              </td>
              <td>
                <button>Direction</button>
                {/* <button>Review</button> */}
              </td>
            </tr>
            <tr>
              <td>1</td>

              <td>
                <img src={Img} alt="Reservation" />
              </td>
              <td>Mall of Multan, Multan</td>
              <td>12345</td>
              <td>08/14/24 4:00PM</td>
              <td>08/14/24 7:00PM</td>
              <td>$7</td>
              <td>
                <span className="status confirm">Confirmed</span>
              </td>
              <td>
                <button>Direction</button>
                {/* <button>Review</button> */}
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>

      {reviewBox && <ReviewPopup hidePopUp={hidePopupFun} />}
    </div>
  );
};

export default ReservationHistory;
