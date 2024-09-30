import { createContext, useEffect, useState, useContext } from "react";
import io from "socket.io-client"; // Import socket.io-client
import { getReservation } from "../services/reservationService";
import { getSpace } from "../services/spaceService";

// Create the context
const ParkingOwnerContext = createContext();

// Socket connection (Make sure to replace with your actual backend URL)
const socket = io("http://localhost:5000");

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
      setSpace(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getReservationData();
    getSpaceData();

    // Set up socket listeners for real-time updates
    socket.on("reservationUpdated", (updatedReservations) => {
      console.log(updatedReservations);
      setReservation(updatedReservations);
    });

    socket.on("spaceUpdated", (updatedSpaces) => {
      setSpace(updatedSpaces);
    });

    // Cleanup on unmount
    return () => {
      socket.off("reservationUpdated");
      socket.off("spaceUpdated");
    };
  }, []);

  return (
    <ParkingOwnerContext.Provider value={{ reservation, space }}>
      {children}
    </ParkingOwnerContext.Provider>
  );
};

export const useParkingOwner = () => {
  return useContext(ParkingOwnerContext);
};
