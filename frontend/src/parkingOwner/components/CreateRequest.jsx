import React, { useEffect, useState } from "react";
import "../styles/CustomReservationRequest.css";
import { useNavigate } from "react-router-dom";
import { getSpace } from "../../services/spaceService";
import { SearchFunctionality } from "../../services/SearchService";
import { customReservationRequest } from "../../services/CreateReservationForm";
const CreateRequest = () => {
  const [selectedSpace, setSelectedSpace] = useState([]);
  const [isSpaceSelect, setIsSpaceSelect] = useState(false);

  // Import the search functionality
  const { handleSearchChange, setData, filteredData } = SearchFunctionality();
  const { customRequest, handleChange, handleSubmit } =
    customReservationRequest();
  const navigate = useNavigate();

  const setSelectedSpaceFun = (space) => {
    setSelectedSpace(space);
    customRequest.spaceId = space._id;

    setIsSpaceSelect(true);
  };
  const getSpaces = async () => {
    const response = await getSpace();
    console.log(response.data.data);
    const activeListing = response.data.data.filter(
      (state) => state.state === "active"
    );
    console.log(activeListing);
    if (activeListing) {
      setData(activeListing); // Initialize the full data in the search service
    }
  };
  useEffect(() => {
    getSpaces();
  }, []);
  useEffect(() => {
    if (selectedSpace) {
      console.log(selectedSpace.per_hour);

      customRequest.price_perhour = selectedSpace.per_hour;
      customRequest.price_perday = selectedSpace.per_day;
    }
  }, [selectedSpace]);
  const handleSubmitFun = async () => {
    const response = await handleSubmit();
    console.log("response", response);
    if (response === "Reservation created successfully") {
      navigate(-1);
    }
  };
  return (
    <>
      <div className="create_request_container">
        <div className="booking_detail">
          <div className="booking_detail_top">
            <h2>Booking detail</h2>
          </div>
          <div className="select_space">
            {!isSpaceSelect ? (
              <div className="input_field">
                <input
                  type="text"
                  placeholder="search parking space"
                  name="search"
                  onChange={handleSearchChange}
                />
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
            ) : (
              <div className="selected_space">
                <div className="space_detail">
                  <span>{selectedSpace._id}</span>
                  <p>{selectedSpace.title}</p>
                </div>

                <i
                  class="fa-solid fa-xmark"
                  onClick={() => setIsSpaceSelect(false)}
                ></i>
              </div>
            )}

            {isSpaceSelect ? (
              ""
            ) : (
              <div className="search_results">
                {filteredData.length > 0 ? (
                  filteredData.map((space) => (
                    <p
                      key={space._id}
                      onClick={() => setSelectedSpaceFun(space)}
                    >
                      {space.title}
                    </p>
                  ))
                ) : (
                  <p>No results found</p>
                )}
              </div>
            )}
          </div>
          <div className="booking_detail_bottom">
            <div className="arrival input_combo_box">
              <label htmlFor="">Arrival</label>
              <input
                type="date"
                name="arrivalDate"
                onChange={handleChange}
                value={customRequest.arrivalDate}
              />
              <input
                type="time"
                name="arrivalTime"
                onChange={handleChange}
                value={customRequest.arrivalTime}
              />
            </div>
            <div className="leave input_combo_box">
              <label htmlFor="">Leave</label>
              <input
                type="date"
                name="leaveDate"
                onChange={handleChange}
                value={customRequest.leaveDate}
              />
              <input
                type="time"
                name="leaveTime"
                onChange={handleChange}
                value={customRequest.leaveTime}
              />
            </div>
          </div>
        </div>
        <div className="customer_information">
          <h2>Customer information</h2>
          <div className="input_container">
            <div className="input_combo_box">
              <div className="input_box">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  onChange={handleChange}
                  value={customRequest.name}
                />
              </div>
              <div className="input_box">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={customRequest.email}
                />
              </div>
            </div>
            <div className="input_box">
              <label htmlFor="phone_number">Phone number</label>
              <input
                type="number"
                placeholder="Enter phone number"
                name="phoneNo"
                onChange={handleChange}
                value={customRequest.phoneNo}
              />
            </div>
          </div>
        </div>
        <div className="vehicle_information">
          <h2>Vehicle information</h2>
          <div className="input_container">
            <div className="input_box">
              <label htmlFor="license">License number</label>
              <input
                type="text"
                placeholder="Enter License Plate Number"
                name="vehicleNo"
                onChange={handleChange}
                value={customRequest.vehicleNo}
              />
            </div>
          </div>
        </div>

        <button className="paynow_reserve" onClick={handleSubmitFun}>
          Reserve
        </button>
      </div>
    </>
  );
};

export default CreateRequest;
