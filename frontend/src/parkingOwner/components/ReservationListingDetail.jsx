import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { confirmReservation, reservedReservation } from "../../services/reservationService";
const ReservationListingDetail = ({ onShowDetail, spaceDetail, data }) => {
  const [space, setSpace] = useState([]);
  const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;

  const confimed =async (id) =>{
    // console.log(id)
    await confirmReservation(id)
  }
  const reserved =async (id) =>{
    await reservedReservation(id)
  }
  useEffect(() => {
    if (spaceDetail) {
      // console.log("space data");
      setSpace(spaceDetail);
      // console.log(spaceDetail);
    }
  }, [spaceDetail]);
  return (
    <>
      <div className="listing">
        <div className="listing_left">
          <img src={`${REACT_APP_API_URL}/${space.images?.[0]}`} alt="" />
        </div>
        <div className="listing_right">
          <div className="listing_title">
            <h3>{space.title}</h3>
          </div>
          <div className="location">
            <i class="fa-solid fa-location-dot"></i>
            <span>{space.address}</span>
          </div>
          <div className="listing_rating">
            <span className="rating">
              <span className="rating_score">{(space.averageRating)}</span>
              <i class="fa-solid fa-star"></i>
              <span className="total_reviews">(123)</span>
            </span>
            <span className="total_booking">100+ booking</span>
          </div>
          <div className="listing_detail">
            <div className="listing_features">
              <span title="secure">
                <i class="fa-solid fa-shield-halved"></i>
              </span>
              <span title="underground">
                <i class="fa-solid fa-arrow-down-short-wide"></i>
              </span>
              <span title="cctv">
                <i class="fa-solid fa-video"></i>
              </span>
            </div>
            <span>
              <Link
                to={`/dashboard/manage-space/view-space/${space._id}`}
                onClick={onShowDetail}
              >
                details
              </Link>
            </span>
          </div>
          <div className="listing_btn">
            {data.state === "pending" && (
              <Link to="/dashboard/reservation-request" onClick={()=>confimed(data._id)}>
                <button>Confirmed Now</button>
              </Link>
            )}
            
            {data.state === "confirmed" && (
              <Link to="/dashboard/reservation-request"  onClick={()=>reserved(data._id)}>
                <button>Reserved Now</button>
              </Link>
            )}
            {/* {data.state === "reserved" && (
              <Link to="/dashboard/reservation-request" >
                <button >Free Now</button>
              </Link>
            )} */}
            {/* <Link to="/dashboard/reservation-request">
              <button>Reserve Now</button>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationListingDetail;
