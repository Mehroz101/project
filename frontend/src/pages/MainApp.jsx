import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ParkingFinderCard from "../components/ParkingFinderCard";
import "../styles/MainApp.css";
import ListingContainer from "../components/ListingContainer";
import ListingDetail from "../components/ListingDetail";
import MapBox from "../components/MapBox";
import { getallspaces } from "../services/spaceService";
import { notify } from "../services/errorHandlerService";
import { useParkingFinderCardForm } from "../services/useParkingFinderCardForm";
import { useParams } from "react-router-dom";
import { getallreservation } from "../services/reservationService";
import SkeletonCard from "../components/Skeletonbox";
import { calculateDistance } from "../parkingOwner/components/Functions";

const MainApp = () => {
  const [togglebtn, setToggelbtn] = useState(false);
  const [parkingInput, setParkingInput] = useState(false);
  const [showListingDetail, setShowListingDetail] = useState(false); // State to control ListingDetail visibility
  const [spaces, setSpaces] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [showSpace, setShowSpace] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const {
    searchInput,
    arrivalDate,
    arrivalTime,
    leaveDate,
    leaveTime,
    totalHours,
  } = useParams();

  const handleShowDetail = (spaceId) => {
    const selectedSpace = spaces.filter((space) => space._id === spaceId);
    setShowSpace(selectedSpace[0]);
  };

  const handleCloseDetail = () => {
    setShowListingDetail(false); // Hide ListingDetail
    // setShowSpace("");
  };

  // const getspaces = async (searchLocation) => {
  //   try {
  //     const response = await getallspaces();
  //     const reservation = await getallreservation();
  //     setSpaces(response || []);
  //     setReservation(reservation);
  //     setIsLoading(false); // Data loaded, hide skeleton
  //   } catch (error) {
  //     console.log(error.message);
  //     notify("error", "Something went wrong, please try again later");
  //   }
  // };
  const getspaces = async (searchLocation = null) => {
    try {
      const response = await getallspaces();
      const reservation = await getallreservation();

      // Use the user's search location to filter spaces within 5 km
      if (searchInput) {
        // const searchCoords = await fetchCoordinates(searchInput); // Fetch coordinates from the user's input
        const nearbySpaces = response.filter((space) => {
          const distance = calculateDistance(
            searchLocation?.latitude,
            searchLocation?.longitude,
            space?.latitude,
            space?.longitude
          );
          return distance <= 5;
        });
        setSpaces(nearbySpaces || []);

      } else {
        setSpaces(response || []);

      }

      setReservation(reservation);
      setIsLoading(false); // Data loaded, hide skeleton
    } catch (error) {
      console.log(error.message);
      notify("error", "Something went wrong, please try again later");
    }
  };

  useEffect(() => {
    getspaces(null);
  }, []);

  useEffect(() => {
    if (showSpace) {
      setShowListingDetail(true);
      console.log(showSpace)
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
              <p className="location">{searchInput}</p>
              <div className="datetime">
                <span className="arrival">
                  {arrivalDate} {arrivalTime}
                </span>
                <span className="leave">
                  {leaveDate} {leaveTime}
                </span>
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
                  <option value="guard">Guard</option>
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
                {isLoading ? (
                  <>
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                  </>
                ) : // Ensure spaces is an array before checking its length
                Array.isArray(spaces) && spaces.length === 0 ? (
                  <div className="no_data_found">
                    <i class="fa-solid fa-face-meh"></i>
                    <span>No space found</span>
                  </div>
                ) : (
                  Array.isArray(spaces) &&
                  spaces.map((slot) => (
                    <ListingContainer
                      key={slot._id}
                      slotData={slot}
                      reservations={reservation}
                      onShowDetail={handleShowDetail}
                    />
                  ))
                )}
              </div>
            </div>
            {showListingDetail && (
              <div className="popup_detail">
                <ListingDetail
                  space={showSpace}
                  reservations={reservation}
                  onHideDetail={handleCloseDetail}
                />
              </div>
            )}
          </div>
          <div
            className={togglebtn ? "app_right" : "app_right app_right_hide"}
            onClick={() => setParkingInput(false)}
          >
            {isLoading ? (
              <>
                <SkeletonCard />
              </>
            ) : Array.isArray(spaces) && spaces.length === 0 ? (
              ""
            ) : (
              Array.isArray(spaces) && (
                <ListingContainer
                  key={showSpace._id} // Show selected space or first space
                  slotData={showSpace}
                  reservations={reservation}
                  onShowDetail={handleShowDetail}
                />
              )
            )}
            <MapBox
              spaces={spaces}
              getSpace={getspaces}
              onShowDetail={handleShowDetail}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainApp;
