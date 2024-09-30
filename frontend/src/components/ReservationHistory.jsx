import React, { useEffect, useState } from "react";
import Img from "../assets/hero_img.png";
import { Link } from "react-router-dom";
import ReviewPopup from "./ReviewPopup";
import { getUserReservation } from "../services/reservationService";
const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;

const ReservationHistory = () => {
  const [reviewBox, setReviewBox] = useState(false);
  const [data, setData] = useState([]);
  const hidePopupFun = () => {
    setReviewBox(false);
  };
  const getreservationData = async () => {
    try {
      const response = await getUserReservation();
      console.log(response);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getreservationData();
  }, []);
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
              <th>SNo.</th>
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
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img src={`${REACT_APP_API_URL}/${item.spaceId.images[0]}`} alt="Reservation" />
                </td>
                <td className="title">{item.spaceId.address}</td>
                <td className="id">{item._id}</td>
                <td className="date">
                  {item.arrivalDate} {item.arrivalTime}
                </td>
                <td className="date">
                  {item.leaveDate} {item.leaveTime}
                </td>
                <td>Rs. {item.totalPrice}</td>
                <td>
                  <span className={`status ${item.state}`}>{item.state}</span>
                </td>
                {item.state === "confirmed" ||
                  (item.state === "pending" && (
                    <td>
                      <button>Direction</button>
                    </td>
                  ))}
                {item.state === "completed" && (
                  <td>
                    <button onClick={() => setReviewBox(true)}>Review</button>
                  </td>
                )}
                {item.state === "cancelled" && (
                  <td>
                  </td>
                )}
              </tr>
            ))}
          
          </tbody>
        </table>
      </div>

      {reviewBox && <ReviewPopup hidePopUp={hidePopupFun} />}
    </div>
  );
};

export default ReservationHistory;
