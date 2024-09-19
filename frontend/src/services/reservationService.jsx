import axios from "axios";
import { notify } from "./errorHandlerService";

const API_URL = "http://localhost:5000/api/reservation"; // Adjust to your API endpoint
const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
};

export const createCustomReservation = async (data,price) => {
  try {
    const response = await axios.post(`${API_URL}/create`, data, config);
    console.log(response);
    if (response.status === 201) {
      notify("success", "Reservation created successfully!");
      return response.data.message;
    } else if (response.status === 400) {
      notify("error", "Please check your input data.");
    }
  } catch (error) {
    console.log(error.message);
    notify("error", "Network error. Please check your connection.");
  }
};
export const getReservation = async () => {
  try {
    console.log("reservation service")
    const response = await axios.get(`${API_URL}/get`, config);
    console.log("reservation service")
    if (response.status === 200) {
      console.log(response.data.response)
      return response.data.response;
    } else {
      notify("error", `error: ${response.data.message}`);
    }
  } catch (error) {
    console.log(error.message);
    notify("error", `error: ${error.message}`);
  }
};
export const cancelReservation = async (reservartionId) => {
  try {
    const data = {reservartionId};
    const response = await axios.patch(`${API_URL}/cancel`, data, config);
    console.log(response);
    notify("success", "cancelled");
  } catch (error) {
    console.log(error.message);
    notify("error", "something wrong reservation is not canceled");
  }
};
export const confirmReservation = async (reservartionId) => {
  try {
    const data = {reservartionId};
    const response = await axios.patch(`${API_URL}/confirm`, data, config);
    console.log(response);
    notify("success", "confirmed");
  } catch (error) {
    console.log(error.message);
    notify("error", "something wrong reservation is not canceled");
  }
};

export const getReservationdata = async (reservartionId) =>{
  try {
    console.log(reservartionId)
    const response = await axios.get(`${API_URL}/get/${reservartionId}`, config);
    if (response.status === 200) {
      return response.data.response;
    } else {
      notify("error", `error: ${response.data.message}`);
    }
    
  } catch (error) {
    console.log(error.message)
  }
}