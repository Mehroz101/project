import React, { useEffect, useState } from "react";
import "../styles/CustomReservationRequest.css";
import { getSpace } from "../../services/spaceService";
const CreateRequest = () => {

  return (
    <>
      <div className="create_request_container">
        <div className="booking_detail">
          <div className="booking_detail_top">
            <h2>Booking detail</h2>
          </div>
          <div className="select_space">
            <div className="input_field">
              <input type="text" placeholder="search parking space" />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            {/* <div className="selected_space">
              <div className="space_detail">
                <span>#12345</span>
                <p>Mall of Multan, Multan</p>
              </div>
              
              <i class="fa-solid fa-xmark"></i>

            </div> */}
            <div className="search_results">
              {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, dolorum?</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, dolorum?</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, dolorum?</p> */}
            </div>
          </div>
          <div className="booking_detail_bottom">
            <div className="arrival input_combo_box">
              <label htmlFor="">Arrival</label>
              <input type="date" />
              <input type="time" />
            </div>
            <div className="leave input_combo_box">
              <label htmlFor="">Leave</label>
              <input type="date" />
              <input type="time" />
            </div>
          </div>
        </div>
        <div className="customer_information">
          <h2>Customer information</h2>
          <div className="input_container">
            <div className="input_combo_box">
              <div className="input_box">
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Enter name" />
              </div>
              <div className="input_box">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Enter email" />
              </div>
            </div>
            <div className="input_box">
              <label htmlFor="phone_number">Phone number</label>
              <input type="number" placeholder="Enter phone number" />
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
        {/* <div className="payment_information">
          <h2>Payment information</h2>
          <p>All payment are secure and encrypted</p>
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
                <input type="string" placeholder="08/24" />
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
        </div> */}
        <button className="paynow_reserve">Reserve</button>
      </div>
    </>
  );
};

export default CreateRequest;
