import React, { useState } from "react";
import "../styles/ReviewPopup.css";

const ReviewPopup = ({ hidePopUp, handleSubmit, review, setReview }) => {
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
                  index <= (hover || review.rating)
                    ? "fa-solid fa-star filled"
                    : "fa-solid fa-star"
                }
                onClick={() =>
                  setReview((prev) => ({
                    ...prev,
                    rating: index,
                  }))
                }
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(review.rating)}
              ></i>
            );
          })}
        </div>
        <div className="review_desc">
          <label htmlFor="review">Review</label>
          <textarea
            name="review"
            value={setReview.msg}
            onChange={(e) =>
              setReview((prev) => ({
                ...prev,
                msg: e.target.value,
              }))
            }
            id="review"
          ></textarea>
        </div>
        <div className="submit_btn">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
