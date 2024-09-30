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

export const createCustomReservation = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/createCustomReservation`,
      data,
      config
    );
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
    const response = await axios.get(`${API_URL}/get`, config);
    if (response.status === 200) {
      console.log("response");
      console.log(response);
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
    const data = { reservartionId };
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
    const data = { reservartionId };
    const response = await axios.patch(`${API_URL}/confirm`, data, config);
    console.log(response);
    notify("success", "confirmed");
  } catch (error) {
    console.log(error.message);
    notify("error", "something wrong reservation is not canceled");
  }
};

export const getReservationdata = async (reservartionId) => {
  try {
    console.log(reservartionId);
    const response = await axios.get(
      `${API_URL}/get/${reservartionId}`,
      config
    );
    if (response.status === 200) {
      return response.data.response;
    } else {
      notify("error", `error: ${response.data.message}`);
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const createReservation = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/createReservation`,
      data,
      config
    );
    return response;
  } catch (error) {
    console.log("error in service page");
    console.log(error.message);
  }
};
export const getUserReservation = async () => {
  try {
    const response = await axios.get(`${API_URL}/getuserreservation`, config);
    if (response.status === 200) {
      console.log("response");
      // console.log(response.data);
      return response.data.response;
    } else {
      notify("error", `error: ${response.data.message}`);
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const getallreservation = async () => {
  try {
    const response = await axios.get(`${API_URL}/getallreservation`, config);
    if (response.status === 404) {
      return notify("error", "no space found");
    }
    if (response.status === 201) return response.data.response;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          notify("error", "Please check your input data.");
          break;
        case 401:
          notify("error", "Please log in again.");
          break;
        case 403:
          notify("error", "You don't have permission to perform this action.");
          break;
        case 500:
          notify("error", "Please try again later.");
          break;
        default:
          notify(
            "error",
            "Error creating space: " +
              (error.response?.data?.message || error.message)
          );
      }
    } else {
      notify("error", "Network error. Please check your connection.");
    }
  }
};
