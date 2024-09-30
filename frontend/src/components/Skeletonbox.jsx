import React from "react";
import "../styles/SkeletonCard.css"; // You'll define the styles here

const SkeletonCard = () => {
  return (
    <div className="skeleton_card">
      <div className="skeleton_image"></div>
      <div className="skeleton_content">
        <div className="skeleton_text title"></div>
        <div className="skeleton_text location"></div>
        <div className="skeleton_rating">
          <div className="skeleton_star"></div>
          <div className="skeleton_text small"></div>
        </div>
        <div className="skeleton_icons">
          <div className="icon">
            <div className="skeleton_icon"></div>
            <div className="skeleton_icon"></div>
            <div className="skeleton_icon"></div>
          </div>
          <div className="skeleton_detail"></div>
        </div>
        <div className="skeleton_button"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
