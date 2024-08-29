import React, { useState } from 'react';
import "../styles/ReviewPopup.css";

const ReviewPopup = ({hidePopUp}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="review_popup">
      <div className="review_box">
        <i className="fa-solid fa-xmark cross" onClick={hidePopUp}></i>
        <h2>Leave a Review</h2>
        <p>Click the stars to rate us</p>
        <div className="review_stars">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <i
                key={index}
                className={
                  index <= (hover || rating)
                    ? "fa-solid fa-star filled"
                    : "fa-solid fa-star"
                }
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              ></i>
            );
          })}
        </div>
        <div className="review_desc">
          <label htmlFor="review">Review</label>
          <textarea name="review" id="review"></textarea>
        </div>
        <div className="submit_btn">
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
