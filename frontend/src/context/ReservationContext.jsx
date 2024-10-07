import { createContext, useEffect, useState, useContext } from "react";
import { getReservation } from "../services/reservationService";
import { getSpace } from "../services/spaceService";
import io from "socket.io-client"; // Import socket.io-client
const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;
const socket = io(REACT_APP_API_URL); // Replace with your server URL

// Create the context
const ParkingOwnerContext = createContext();

export const ParkingOwnerProvider = ({ children }) => {
  const [reservation, setReservation] = useState([]);
  const [space, setSpace] = useState([]);

  const getReservationData = async () => {
    try {
      const response = await getReservation();
      setReservation(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getSpaceData = async () => {
    try {
      const response = await getSpace();
      setSpace(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getReservationData();
    getSpaceData();
    socket.on("reservationUpdated", (data) => {
      console.log("socket", data.message);
      getReservationData();
      getSpaceData();
    });
    socket.on("spaceUpdated", (data) => {
      console.log("socket", data.message);
      getReservationData();
      getSpaceData();
    });
    // Cleanup on unmount
    return () => {
      socket.off("reservationUpdated");
      socket.off("spaceUpdated");
    };
  }, []);

  return (
    <ParkingOwnerContext.Provider
      value={{ reservation, space, setSpace, setReservation }}
    >
      {children}
    </ParkingOwnerContext.Provider>
  );
};

export const useParkingOwner = () => {
  return useContext(ParkingOwnerContext);
};
