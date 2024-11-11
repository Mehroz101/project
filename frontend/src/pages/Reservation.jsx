import React, { useEffect, useState } from "react";
import "../styles/Reservation.css";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import {
  getSpaceForReservation, getSpaceReviews,

} from "../services/spaceService";
import { useNavigate } from "react-router-dom";
import { useReservationForm } from "../services/useReservationForm";
import SelectedListingDetail from "../components/SelectedListingDetail";
import { getSpaceSpecificReservation } from "../services/reservationService";
import { reviewDateCalculator } from "../parkingOwner/components/Functions";
const Reservation = () => {
  const [space, setSpace] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reservations, setReservations] = useState([]);
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const { handleChange, reservation, setReservation, handleSubmit } =
    useReservationForm();
  const handleSubmitForm = async (e) => {
    console.log(space);

    e.preventDefault();

    const response = await handleSubmit();
    if (response === 201) {
      navigate("/profile/booking");
    }
  };

  const getSpace = async () => {
    const response = await getSpaceForReservation(spaceId);
    const response1 = await getSpaceReviews(spaceId);
    const response2 = await getSpaceSpecificReservation(spaceId);
    setSpace(response);
    setReviews(response1);
    setReservations(response2);
  };
  
  useEffect(() => {
    getSpace();
    setReservation((prev) => ({
      ...prev,
      spaceId: spaceId,
      arrivalDate: localStorage.getItem(`arrivalDate`) || "",
      arrivalTime: localStorage.getItem(`arrivalTime`) || "",
      leaveDate: localStorage.getItem(`leaveDate`) || "",
      leaveTime: localStorage.getItem(`leaveTime`) || "",
      totalHours: localStorage.getItem(`totalHours`) || "",
    }));
  }, [localStorage]);

  useEffect(() => {
    if (space) {
      setReservation((prev) => ({
        ...prev,
        per_hour: space?.per_hour,
        per_day: space?.per_day,
      }));
    }
  }, [space]);

  return (
    <>
      <Navbar />
      <div className="reservation_detail_page">
        <div className="reservation_detail_left">
          <div className="booking_detail">
            <div className="booking_detail_top">
              <h2>Booking detail</h2>
              <Link onClick={() => navigate(-1)}>edit</Link>
            </div>
            <div className="booking_detail_bottom">
              <div className="booking_location">
                <i className="fa-solid fa-location-dot"></i>
                <div className="data">
                  <h3 className="location">Location</h3>
                  <p>{space?.address}</p>
                </div>
              </div>
              <div className="booking_arrival">
                <i className="fa-solid fa-right-to-bracket"></i>
                <div className="data">
                  <h3 className="arrival">Arrival</h3>
                  <p>
                    {reservation.arrivalDate} {reservation.arrivalTime}
                  </p>
                </div>
              </div>
              <div className="booking_leave">
                <i className="fa-solid fa-right-from-bracket"></i>
                <div className="data">
                  <h3 className="leave">Leave</h3>
                  <p>
                    {reservation.leaveDate} {reservation.leaveTime}
                  </p>
                </div>
              </div>
              <div className="booking_duration">
                <i className="fa-solid fa-clock"></i>
                <div className="data">
                  <h3 className="duration">Duration</h3>
                  <p>{reservation.totalHours}h</p>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmitForm}>
            <div className="your_information">
              <h2>Your information</h2>
              <div className="input_container">
                <div className="input_box">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={reservation.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="input_box">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={reservation.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="input_box">
                  <label htmlFor="phone_number">Phone number</label>
                  <input
                    type="number"
                    placeholder="Enter your phone number"
                    name="phoneNo"
                    value={reservation.phoneNo}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="vehicle_information">
              <h2>Vehicle information</h2>
              <div className="input_container">
                <div className="input_box">
                  <label htmlFor="license">License number</label>
                  <input
                    type="text"
                    placeholder="Enter License Plate Number"
                    name="vehicleNo"
                    value={reservation.vehicleNo}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="payment_information">
              <h2>Payment information</h2>
              <p>All Payment are Secure and Encrypted</p>
              <div className="payment_form">
                <div className="input_box">
                  <label htmlFor="name">Cardholder Name</label>
                  <input type="text" placeholder="Enter Cardholder Name" />
                </div>
                <div className="input_box">
                  <label htmlFor="card_number">Card Name</label>
                  <input type="number" placeholder="4111 111 111 111" />
                </div>
                <div className="input_combo_box">
                  <div className="input_box">
                    <label htmlFor="expire">Expiry</label>
                    <input type="string" placeholder="12/24" />
                  </div>
                  <div className="input_box">
                    <label htmlFor="cvv">CVV</label>
                    <input type="number" placeholder="123" />
                  </div>
                </div>
                <div className="input_combo_box">
                  <div className="input_box">
                    <label htmlFor="zip_code">Billing Zip Code</label>
                    <input type="text" placeholder="Enter Zip Code" />
                  </div>
                  <div className="input_select_box">
                    <label htmlFor="country">Country</label>
                    <select name="country" id="country">
                      <option value="pakistan">Pakistan</option>
                      <option value="india">India</option>
                      <option value="united state">United State</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <button className="paynow_reserve">$7 - Pay now and reserve</button>
          </form>
        </div>
        <div className="reservation_detail_right">
          <div className="reservation_detail_right_box">
            <SelectedListingDetail
              space={space}
              review={reviews}
              reservation={reservations}
            />
          </div>
          <div className="reservation_detail_right_reviews">
            {reviews?.map((review, index) => {
              return (
                <>
                  <div className="review-item" key={index}>
                    <h4>{review?.userId?.fName}</h4>
                    <div className="review-meta">
                      <span>{review?.rating}</span>
                      <i className="fa-solid fa-star"></i>
                      <span>{reviewDateCalculator(review)}</span>
                    </div>
                    <p>"{review?.reviewMsg}"</p>
                  </div>
                </>
              );
            })}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Reservation;
