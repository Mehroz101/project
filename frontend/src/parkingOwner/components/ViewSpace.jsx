import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpace } from "../../services/spaceService";
import "../styles/ViewSpace.css";
const ViewSpace = () => {
  const [space, setSpace] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState();
  const [images, setImages] = useState([]);
  const { spaceId } = useParams();
  const REACT_APP_API_URL = "http://localhost:5000/";

  const getSpaceData = async () => {
    const spaceData = await getSpace(spaceId);
    setSpace(spaceData.data.space);
    const images = spaceData.data.space.images.map((image) => image);
    setImages(images);
    setCurrentImageIndex(0);
    console.log(space);
  };
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
  useEffect(() => {
    getSpaceData();
  }, []);
  return (
    <>
      <div className="view_space">
        <div className="listing_detail_image_box">
          <button className="prev_btn" onClick={handlePreviousImage}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <img
            src={`${REACT_APP_API_URL}/${images[currentImageIndex]}`}
            alt="Listing"
            className="listing_image"
          />
          <button className="next_btn" onClick={handleNextImage}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <div className="listing_detail">
          <div className="listing_left_section">
            <h2 className="listing_detail_title">{space.title} </h2>
            <p className="address">
              <i class="fa-solid fa-location-dot"></i>{space.title}
            </p>
            <div className="listing_rating">
              <span className="rating">
                <span className="rating_score">4.5</span>
                <i class="fa-solid fa-star"></i>
                <span className="total_reviews">(123)</span>
              </span>
              <span className="total_booking">100+ booking</span>
            </div>
            <div className="shortdesc desc">
              <h3>Short Description</h3>
              <span className="short_description">
               {space.short_description}
              </span>
            </div>
            <div className="longdesc desc">
              <h3>Long Description</h3>
              <span className="long_description">
               {space.description}
              </span>
            </div>
            <div className="location">
              <h3>Location</h3>
              <div class="mapouter">
                <div class="gmap_canvas">
                  <iframe
                    width="100%"
                    height="250"
                    frameborder="0"
                    
                    src={`https://www.google.com/maps?q=${space.latitude},${space.longitude}&z=15&output=embed`}
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="review_section">
              <h3>Reviews</h3>
              <div className="review_list">
                <div className="review_item">
                  <div className="review_header">
                    <div className="review_info">
                      <h4>John Doe</h4>
                      <div className="review_rating_date">
                        <div className="rating">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <span className="review_date">2 days ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="review_text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="review_item">
                  <div className="review_header">
                    <div className="review_info">
                      <h4>John Doe</h4>
                      <div className="review_rating_date">
                        <div className="rating">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <span className="review_date">2 days ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="review_text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="review_item">
                  <div className="review_header">
                    <div className="review_info">
                      <h4>John Doe</h4>
                      <div className="review_rating_date">
                        <div className="rating">
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                          <i class="fa-solid fa-star"></i>
                        </div>
                        <span className="review_date">2 days ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="review_text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="listing_right_section">
            <h3>Detail</h3>
            <div className="features">
              <h4>Features</h4>
              <div className="features_items">
              {space.features?.map((feature) => (
                <span>{feature}</span>
              ))}
               
              </div>
            </div>
            <div className="pricing">
              <h4>Pricing</h4>
              <div className="per_day">
                <span>Per Day</span>
                <span>{space.per_day}</span>
              </div>
              <div className="per_hour">
                <span>Per Hour</span>
                <span>{space.per_hour}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewSpace;
