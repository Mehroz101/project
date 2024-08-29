import React from 'react';
import '../styles/UserFeedbackReviews.css';

const UserFeedbackReviews = () => {
  return (
    <div className="user_feedback_reviews">
      <div className="review_card">
        <h3>Recent Reviews</h3>
        <p>"Great parking experience!" - User A</p>
        <p>"Convenient and easy to use." - User B</p>
      </div>
      <div className="review_card">
        <h3>Ratings Summary</h3>
        <p>Overall Rating: 4.5/5</p>
      </div>
    </div>
  );
};

export default UserFeedbackReviews;
