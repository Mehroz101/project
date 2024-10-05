import { createContext, useEffect, useState, useContext } from "react";
import { getReservation } from "../services/reservationService";
import { getSpace } from "../services/spaceService";

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
      setSpace(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getReservationData();
    getSpaceData();

   
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
