import { createContext, useEffect, useState, useContext } from "react";
import { getReservation } from "../services/reservationService";
import { getSpace } from "../services/spaceService";
import io from "socket.io-client"; // Import socket.io-client
import { getWithdrawRequest } from "../services/withDrawService";
const REACT_APP_API_URL = import.meta.env.REACT_APP_API_URL;
const socket = io(REACT_APP_API_URL); // Replace with your server URL

// Create the context
const ParkingOwnerContext = createContext();

export const ParkingOwnerProvider = ({ children }) => {
  const [reservation, setReservation] = useState([]);
  const [space, setSpace] = useState([]);
  const [earningReq, setEarningReq] = useState([]);
  const [notifications, setNotifications] = useState([]); // State for notifications
const [reviews,setReviews] = useState([])
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
  const getEarningData = async () => {
    try {
      const response = await getWithdrawRequest();
      setEarningReq(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getReviewsData = async () =>{
    try {
      const response = await getReviews();
      setReviews(response);
    }
    catch(error){
      console.log(error.message)
    }

  }

  const addNotification = (message) => {
    setNotifications((prevNotifications) => {
      const updatedNotifications = [{ message, timestamp: new Date() }, ...prevNotifications];
      return updatedNotifications.slice(0, 10); // Keep only the latest 10 notifications
    });
  };

  useEffect(() => {
    getReservationData();
    getSpaceData();
    getEarningData();
    socket.on("reservationUpdated", (data) => {
      console.log("socket", data.message);
      addNotification(data.message)

      getReservationData();
      getSpaceData();
    });
    socket.on("spaceUpdated", (data) => {
      console.log("socket", data.message);
      addNotification(data.message)

      getReservationData();
      getSpaceData();
    });
    socket.on("paymentUpdated",(data)=>{
      console.log("socket",data);
      addNotification(data.message)

      getEarningData();
      getReservationData()
    })
    socket.on("reviewUpdate",(data)=>{
      console.log("socket",data);
      addNotification(data.message)

      
    })
    // Cleanup on unmount
    return () => {
      socket.off("reservationUpdated");
      socket.off("spaceUpdated");
      socket.off("paymentUpdated")
    };
  }, []);

  return (
    <ParkingOwnerContext.Provider
      value={{
        reservation,
        space,
        earningReq,
        setSpace,
        setReservation,
        setEarningReq,
        getEarningData,
        notifications
      }}
    >
      {children}
    </ParkingOwnerContext.Provider>
  );
};

export const useParkingOwner = () => {
  return useContext(ParkingOwnerContext);
};
