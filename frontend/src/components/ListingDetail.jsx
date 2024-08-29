import React, { useState } from "react";
import img1 from "../assets/listingImg-1.png";
import img2 from "../assets/listingImg-2.png";
// import img3 from "../assets/listingImg-2.png"; // Add more images as needed

const images = [img1, img2]; // Array of images

const ListingDetail = ({ onHideDetail }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="listing_detail_container">
        <div className="back_btn">
          <span onClick={onHideDetail}>
            <i className="fa-solid fa-xmark"></i>
          </span>
        </div>
        <div className="listing_detail_image_box">
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
        </div>
        <div className="listing_detail_section">
          <h2 className="listing_detail_title">Mall of Multan, Multan  </h2>
          <p className="address">Near Nadren Bypass, Bosan road, Multan</p>
          <div className="badge_shortdesc">
            <span className="badge">Secure</span>
            <span className="short_description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
              eos!
            </span>
          </div>
          <div className="listing_rating">
            <span className="rating">
              <span>&#9733;</span>
              <span>&#9733;</span>
              <span>&#9733;</span>
              <span>&#9733;</span>
              <span>&#9734;</span>
            </span>
            <span className="total_booking">100+ booking</span>
          </div>
        </div>
        <div className="listing_booking_details">
          <div className="booking_details_duration">
            <span>5h</span>
            <span>duration</span>
          </div>
          <div className="booking_details_fee">
            <span>$7</span>
            <span>parking fee</span>
          </div>
          <div className="booking_details_destination">
            <span>7min</span>
            <span>destination</span>
          </div>
        </div>
        <div className="listing_detail_features">
          <span className="feature">CCTV</span>
          <span className="feature">Underground</span>
          <span className="feature">Secure</span>
        </div>
        <div className="listing_detail_description">
          <h3>Description</h3>
          <p className="description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione
            dignissimos et ut accusantium, rerum, expedita dolorem consequuntur
            ipsa corporis sint, dolorum dolores dolore corrupti deleniti
            veritatis cumque officiis quod saepe?
          </p>
        </div>
        <div className="listing_detail_btn">
          <button className="all_day_book_btn">All day in $57</button>
          <button className="book_btn">Reserve in $7</button>
        </div>
      </div>
    </>
  );
};

export default ListingDetail;
