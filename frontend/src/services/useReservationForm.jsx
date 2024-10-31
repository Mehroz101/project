import { useState } from "react";
import { notify } from "./errorHandlerService";
import { createReservation } from "./reservationService";
import {
  calculateHours,
  calculatePrice,
} from "../parkingOwner/components/Functions";

export const useReservationForm = () => {
  const [reservation, setReservation] = useState({
    name: "",
    email: "",
    phoneNo: "",
    vehicleNo: "",
    arrivalDate: "",
    arrivalTime: "",
    leaveDate: "",
    leaveTime: "",
    spaceId: "",
    per_hour: "",
    per_day: "",
  });
  const handleChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    const {
      name,
      email,
      phoneNo,
      vehicleNo,
      arrivalTime,
      arrivalDate,
      leaveTime,
      leaveDate,
      per_hour,
      per_day,
    } = reservation;
    console.log("reservation: ")
    console.log(reservation)

    
    if (
      name === "" ||
      email === "" ||
      phoneNo === "" ||
      vehicleNo === "" ||
      arrivalTime === "" ||
      arrivalDate === "" ||
      leaveTime === "" ||
      leaveDate === ""
    ) {
      notify("warning", "All fields are required");
    } else {
      try {
        const hour = calculateHours(
          arrivalTime,
          arrivalDate,
          leaveTime,
          leaveDate
        );
       
        const price = calculatePrice(hour, per_hour, per_day);
        console.log("price: ",price)
        const updatedRequest = {
          ...reservation,
          totalPrice: price, // Add the calculated price here
        };
        console.log("reservation is creating");
        const response = await createReservation(updatedRequest);
        console.log("response")
        console.log(response)
        if (response.status === 201) {
          notify("success", "Reservation created successfully");
          return 201;
        } else {
          notify("error", "something wents wrong");
        }
      } catch (error) {
        console.log(error)
        console.log(error.message);
      }
    }
  };

  return {
    handleChange,
    handleSubmit,
    reservation,
    setReservation,
  };
};
