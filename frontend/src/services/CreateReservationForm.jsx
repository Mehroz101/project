import { useState } from "react";
import { createCustomReservation } from "./reservationService";
import { notify } from "./errorHandlerService";

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
  });
  const handleChange = (e) => {
    setCustomRequest({ ...customRequest, [e.target.name]: e.target.value });
  };
  const handleSumbit = async () => {
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
    } = customRequest;

    if (
      spaceId === "" ||
      name === "" ||
      email === "" ||
      phoneNo === "" ||
      vehicleNo === "" ||
      arrivalTime === "" ||
      leaveTime === "" ||
      arrivalDate === "" ||
      leaveDate === ""
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

    // Combine arrival date and time to create a single Date object
    const arrivalDateTime = new Date(`${arrivalDate}T${arrivalTime}`);
    const currentDateTime = new Date();

    // Check if arrival date and time are in the past
    if (arrivalDateTime <= currentDateTime) {
      notify("warning", "Arrival date and time must be in the future");
      return;
    }


    const response = await createCustomReservation(customRequest);
    console.log(response);
    return response;
  };

  return {
    customRequest,
    handleChange,
    handleSumbit,
  };
};
