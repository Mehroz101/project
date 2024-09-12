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
      `${API_URL}/create`,
      data,
      config
    );
    console.log(response)
    if(response.status === 201) {
      notify("success", "Reservation created successfully!");
      return response.data.message
    } else if(response.status === 400) {
      notify("error", "Please check your input data.");
    }

  } catch (error) {
    console.log(error.message); 
    notify("error", "Network error. Please check your connection.");
  }
};
