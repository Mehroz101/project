import React, { useEffect } from "react";
import "../styles/UserFeedbackReviews.css";
import { useParkingOwner } from "../../context/ReservationContext";

const UserFeedbackReviews = () => {
  const { reviewnotifications, overAllRating } = useParkingOwner();
  return (
    <div className="user_feedback_reviews">
      <div className="review_card">
        <h3>Recent Reviews</h3>
        {reviewnotifications.length === 0 ? (
          <p>No recent activities.</p>
        ) : (
          reviewnotifications.map((reviewnotification, index) => {
         
           return <p key={index}>
             "{reviewnotification.reviewMsg}" - {reviewnotification.rating}.0
            </p>;
          })
        )}
      </div>
      <div className="review_card">
        <h3>Ratings Summary</h3>
        <p>Overall Rating:  {overAllRating}/5</p>
      </div>
    </div>
  );
};

export default UserFeedbackReviews;
