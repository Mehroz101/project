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
  const handleSumbit =async () => {
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
    if(arrivalDate > leaveDate){
      notify("warning","Arrival date must be greater than leave date")
      return
    }
    if(arrivalDate == leaveDate){
      if(arrivalTime > leaveTime){
        notify("warning","Arrival time must be greater than leave time")
        return
      }
      
    }
    const response =await createCustomReservation(customRequest);
    console.log(response);
    return response
  };

  return {
    customRequest,
    handleChange,
    handleSumbit,
  };
};
