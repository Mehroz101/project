import React, { useEffect, useState } from "react";
import listingImg from "../assets/listingImg-1.png";
import { Link } from "react-router-dom";
const ListingContainer = ({ onShowDetail, slotData }) => {
  const [space, setSpace] = useState([]);
  const REACT_APP_API_URL = "http://localhost:5000/";

  useEffect(() => {
    if (slotData) {
      console.log(slotData);
      setSpace(slotData);
    }
  }, []);
  return (
    <>
      <div className="listing">
        <div className="listing_left">
          <img src={`${REACT_APP_API_URL}${space.images?.[0]}`} alt="" />
        </div>
        <div className="listing_right">
          <div className="listing_title">
            <h3>{space.title}</h3>
          </div>
          <div className="location">
            <i className="fa-solid fa-location-dot"></i>
            <span>{space.location}</span>
          </div>
          <div className="listing_rating">
            <span className="rating">
              <span className="rating_score">4.5</span>
              <i className="fa-solid fa-star"></i>
              <span className="total_reviews">(123)</span>
            </span>
            <span className="total_booking">100+ booking</span>
          </div>
          <div className="listing_detail">
            <div className="listing_features">
              {space.features?.map((feature, index) => {
                switch (feature) {
                  case "secure":
                    return (
                      <span key={index} title="secure">
                        <i className="fa-solid fa-shield-halved"></i>
                      </span>
                    );
                  case "underground":
                    return (
                      <span key={index} title="underground">
                        <i className="fa-solid fa-arrow-down-short-wide"></i>
                      </span>
                    );
                  case "cctv":
                    return (
                      <span key={index} title="cctv">
                        <i className="fa-solid fa-video"></i>
                      </span>
                    );
                  default:
                    return null;
                }
              })}
            </div>
            <span>
              <Link onClick={()=>onShowDetail(space._id)}>details</Link>
            </span>
          </div>
          <div className="listing_btn">
            <button>
              <Link to="/reservation">Book in ${space.per_hour}</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingContainer;
