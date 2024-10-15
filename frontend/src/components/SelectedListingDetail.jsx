import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  calculatePrice,
  totalBooking,
} from "../parkingOwner/components/Functions";

const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;

const SelectedListingDetail = ({ space, reservation, review }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]); // Store images in state
  const [prices, setPrices] = useState("");
  const [totalCompleted, setTotalCompleted] = useState(0); // State to hold total confirmed bookings

  const totalHours = localStorage.getItem(`totalHours`);
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images?.length - 1 : prevIndex - 1
    );
  };
  
  useEffect(() => {
    console.log(space)
    if (space?.images && space?.images?.length > 0) {
      // Set images from the space object
      const formattedImages = space?.images?.map(
        (image) => `${REACT_APP_API_URL}/${image}`
      );
      setImages(formattedImages); // Update the state with formatted images
    }
  }, [space?.images]); // Effect depends on space.images
  useEffect(() => {
    if (space) {
      const total = calculatePrice(totalHours, space?.per_hour, space.per_day);
      setPrices(total);
      setTotalCompleted(totalBooking("completed", space, reservation));
    }
  }, [space, totalHours]);
 
  return (
    <>
      <div className="listing_detail_container">
        <div className="listing_detail_image_box">
          {images.length > 0 && (
            <>
              <button className="prev_btn" onClick={handlePreviousImage}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <img
                src={images[currentImageIndex]}
                alt="Listing"
                className="listing_image"
              />
              <button className="next_btn" onClick={handleNextImage}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </>
          )}
        </div>
        <div className="listing_detail_section">
          <h2 className="listing_detail_title">{space?.title} </h2>
          <div className="location">
            <i className="fa-solid fa-location-dot"></i>
            <p className="address">{space?.address}</p>
          </div>
          <div className="badge_shortdesc">
            <span className="short_description">
              {space?.short_description}
            </span>
          </div>
          <div className="listing_rating">
            <span className="rating">
              <span className="rating_score">{space?.averageRating || 0}</span>
              <i className="fa-solid fa-star"></i>
              <span className="total_reviews">({review?.length})</span>
            </span>
            <span className="total_booking">{totalCompleted} booking</span>
          </div>
        </div>
        <div className="listing_booking_details">
          <div className="booking_details_duration">
            <span>{totalHours}h</span>
            <span>duration</span>
          </div>
          <div className="booking_details_fee">
            <span>Rs. {prices}</span>
            <span>parking fee</span>
          </div>
          <div className="booking_details_destination">
            <span>7min</span>
            <span>destination</span>
          </div>
        </div>
        <div className="listing_detail_features">
          {space?.features?.map((feature, index) => {
            switch (feature) {
              case "secure":
                return <span className="feature">CCTV</span>;
              case "underground":
                return <span className="feature">Underground</span>;
              case "cctv":
                return <span className="feature">Secure</span>;
              default:
                return null;
            }
          })}
        </div>
        <div className="listing_detail_description">
          <h3>Description</h3>
          <p className="description">{space?.description}</p>
        </div>
        <div className="listing_detail_btn">
          <span className="all_day_book_btn">
            All day in Rs. {space?.per_day}
          </span>
          <Link to={`/reservation/${space?._id}`}>Reserve in Rs. {prices}</Link>
        </div>
      </div>
    </>
  );
};

export default SelectedListingDetail;
