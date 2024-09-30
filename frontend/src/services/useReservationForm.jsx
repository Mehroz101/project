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
      totalPrice,
      per_hour,
      per_day,
    } = reservation;

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
        const updatedRequest = {
          ...reservation,
          totalPrice: price, // Add the calculated price here
        };
        console.log(reservation);
        const response = await createReservation(updatedRequest);
        if (response.status === 201) {
          notify("success", "Reservation created successfully");
          return 201;
        } else {
          notify("error", "something wents wrong");
        }
        console.log(response);
      } catch (error) {
        notify("error", "something wents wrong");
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
