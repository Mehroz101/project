import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ParkingFinderCard from "../components/ParkingFinderCard";
import "../styles/MainApp.css";

import ListingContainer from "../components/ListingContainer";
import ListingDetail from "../components/ListingDetail";
import MapBox from "../components/MapBox";
import { getallspaces } from "../services/spaceService";
import { notify } from "../services/errorHandlerService";
const MainApp = () => {
  const [togglebtn, setToggelbtn] = useState(false);
  const [parkingInput, setParkingInput] = useState(false);
  const [showListingDetail, setShowListingDetail] = useState(false); // State to control ListingDetail visibility
  const [spaces, setSpaces] = useState();
  const [showSpace, setShowSpace] = useState("");
  const handleShowDetail = (spaceId) => {
    const selectedSpace = spaces.filter((space) => space._id === spaceId);
    setShowSpace(selectedSpace[0]);
  };

  const handleCloseDetail = () => {
    setShowListingDetail(false); // Hide ListingDetail
    setShowSpace("");
  };
  const getspaces = async () => {
    try {
      const response = await getallspaces();
      setSpaces(response);
    } catch (error) {
      console.log(error.message);
      notify("error", "Something wrong, please try again later");
    }
  };
  useEffect(() => {
    getspaces();
  }, []);
  useEffect(() => {
    if (showSpace) {
      console.log(showSpace);
      setShowListingDetail(true); // Show ListingDetail
    }
  }, [showSpace]);

  return (
    <>
      <div className="main_page">
        <Navbar />
        <div className="app_container">
          <div className="app_left">
            <div
              className={
                parkingInput
                  ? "ParkingFinderCard"
                  : "ParkingFinderCard ParkingFinderCard_hide"
              }
            >
              <ParkingFinderCard />
              <div
                className="droparrow"
                onClick={() => setParkingInput(!parkingInput)}
              >
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>
            <div
              className={
                parkingInput
                  ? "parkingFinderDetail parkingFinderDetail_hide"
                  : "parkingFinderDetail "
              }
              onClick={() => setParkingInput(!parkingInput)}
            >
              <p className="location">Mall of Multan, Multan</p>
              <div className="datetime">
                <span className="arrival">14-08-24 4:00PM</span>
                <span className="leave">14-08-24 7:00PM</span>
              </div>
            </div>
            <div className="app_listings">
              <div className="listing_filter_sort">
                <select name="sort" id="sort">
                  <option>sort by</option>
                  <option value="price">Price</option>
                  <option value="distance">Distance</option>
                </select>
                <select name="filter" id="filter">
                  <option>filter</option>
                  <option value="CCTV">CCTV</option>
                  <option value="gurad">Guard</option>
                </select>
                <button
                  className="toggle_btn"
                  onClick={() => setToggelbtn(!togglebtn)}
                >
                  {togglebtn ? "list" : "map"}
                </button>
              </div>
              <div
                className={`${
                  togglebtn
                    ? "Listing_container Listing_container_hide"
                    : "Listing_container"
                } ${parkingInput ? "listing_container_full" : ""}`}
              >
                {spaces?.map((slot) => (
                  <ListingContainer
                    key={slot._id}
                    slotData={slot}
                    onShowDetail={handleShowDetail}
                  />
                ))}
              </div>
            </div>
            {showListingDetail && (
              <div className="popup_detail">
                <ListingDetail
                  space={showSpace}
                  onHideDetail={handleCloseDetail}
                />
              </div>
            )}
          </div>
          <div
            className={togglebtn ? "app_right" : "app_right app_right_hide"}
            onClick={() => setParkingInput(false)}
          >
            {spaces && (
              <ListingContainer
                slotData={spaces[0]}
                onShowDetail={handleShowDetail}
              />
            )}
            <MapBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainApp;
