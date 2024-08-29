import React from "react";
import "../styles/Reservation.css";
import Navbar from "../components/Navbar";
import ListingDetail from "../components/ListingDetail";
import { Link } from "react-router-dom";
const Reservation = () => {
  return (
    <>
      <Navbar />
      <div className="reservation_detail_page">
        <div className="reservation_detail_left">
          <div className="booking_detail">
            <div className="booking_detail_top">
              <h2>Booking detail</h2>
              <Link to="/searchResult">edit</Link>
            </div>
            <div className="booking_detail_bottom">
              <div className="booking_location">
                <span>0</span>
                <div className="data">
                  <h3 className="location">Location</h3>
                  <p>Mall of Multan</p>
                </div>
              </div>
              <div className="booking_arrival">
                <span>0</span>
                <div className="data">
                  <h3 className="arrival">Arrival</h3>
                  <p>14-08-24 4:00PM</p>
                </div>
              </div>
              <div className="booking_leave">
                <span>0</span>
                <div className="data">
                  <h3 className="leave">Leave</h3>
                  <p>14-08-24 7:00PM</p>
                </div>
              </div>
              <div className="booking_duration">
                <span>0</span>
                <div className="data">
                  <h3 className="duration">Duration</h3>
                  <p>4h</p>
                </div>
              </div>
            </div>
          </div>
          <div className="your_information">
            <h2>Your information</h2>
            <div className="input_container">
              <div className="input_box">
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Enter your name" />
              </div>
              <div className="input_box">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Enter your email" />
              </div>
              <div className="input_box">
                <label htmlFor="phone_number">Phone number</label>
                <input type="number" placeholder="Enter your phone number" />
              </div>
            </div>
          </div>
          <div className="vehicle_information">
            <h2>Vehicle information</h2>
            <div className="input_container">
              <div className="input_box">
                <label htmlFor="license">License number</label>
                <input type="text" placeholder="Enter License Plate Number" />
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
        </div>
        <div className="reservation_detail_right">
          <div className="reservation_detail_right_box">
            <ListingDetail />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reservation;
