import { useState } from "react";
import { createCustomReservation } from "./reservationService";
import { notify } from "./errorHandlerService";
import {
  calculateHours,
  calculatePrice,
} from "../parkingOwner/components/Functions";

export const customReservationRequest = () => {
  const [customRequest, setCustomRequest] = useState({
    spaceId: "",
    name: "",
    email: "",
    phoneNo: "",
    vehicleNo: "",
    arrivalTime: "",
    leaveTime: "",
    arrivalDate: "",
    leaveDate: "",
    // price_perhour:"",
    // price_perday:"",
  });
  const handleChange = (e) => {
    setCustomRequest({ ...customRequest, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    const {
      spaceId,
      name,
      email,
      phoneNo,
      vehicleNo,
      arrivalTime,
      leaveTime,
      arrivalDate,
      leaveDate,
      price_perhour,
      price_perday,
    } = customRequest;
    console.log(customRequest);

    if (
      spaceId === "" ||
      name === "" ||
      email === "" ||
      phoneNo === "" ||
      vehicleNo === "" ||
      arrivalTime === "" ||
      leaveTime === "" ||
      arrivalDate === "" ||
      leaveDate === "" ||
      price_perhour === "" ||
      price_perday === ""
    ) {
      notify("info", "Please fill all the fields");
      return;
    }
    // Check if arrival date is after leave date
    if (new Date(arrivalDate) > new Date(leaveDate)) {
      notify(
        "warning",
        "Arrival date must be earlier than or equal to the leave date"
      );
      return;
    }

    // Check if arrival and leave dates are the same
    if (arrivalDate === leaveDate) {
      if (arrivalTime >= leaveTime) {
        notify(
          "warning",
          "Arrival time must be earlier than leave time if on the same day"
        );
        return;
      }
    }

    const hours = calculateHours(
      arrivalTime,
      arrivalDate,
      leaveTime,
      leaveDate
    );
    const price = calculatePrice(hours, price_perhour, price_perday);
    console.log(price);
    // Combine arrival date and time to create a single Date object
    const arrivalDateTime = new Date(`${arrivalDate}T${arrivalTime}`);
    const currentDateTime = new Date();

    // Check if arrival date and time are in the past
    // if (arrivalDateTime <= currentDateTime) {
    //   notify("warning", "Arrival date and time must be in the future");
    //   return;
    // }

    const updatedRequest = {
      ...customRequest,
      totalPrice: price, // Add the calculated price here
    };
    const response = await createCustomReservation(updatedRequest);
    console.log(response);
    return response;
  };

  return {
    customRequest,
    handleChange,
    handleSubmit,
  };
};
