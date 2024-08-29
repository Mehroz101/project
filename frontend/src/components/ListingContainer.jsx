import React, { useState } from "react";
import listingImg from "../assets/listingImg-1.png";
import { Link } from "react-router-dom";
const ListingContainer = ({ onShowDetail }) => {

  return (
    <>
      <div className="listing">
        <div className="listing_left">
          <img src={listingImg} alt="" />
        </div>
        <div className="listing_right">
          <div className="listing_title">
            <h3>Mall of Multan, Multan</h3>
          </div>
          <div className="listing_rating">
            <span className="rating"> <span>&#9733;</span>
              <span>&#9733;</span>
              <span>&#9733;</span>
              <span>&#9733;</span>
              <span>&#9734;</span></span>
            <span className="total_booking">100+ booking</span>
          </div>
          <div className="listing_detail">
            <div className="listing_features">
              <span>0</span>
              <span>0</span>
              <span>0</span>
            </div>
            <span>
              <Link onClick={onShowDetail}>details</Link>
            </span>
          </div>
          <div className="listing_btn">
            <button><Link to="/reservation" >Book in $7</Link></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingContainer;
