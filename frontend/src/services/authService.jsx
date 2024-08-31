import axios from "axios";

const API_URL = "http://localhost:5000";

export const signupUser = async (userData) => {
  console.log("signupuser call");
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, userData);
    // console.log(response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const signinUser = async (userData) => {
  console.log("signinuser call");
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, userData);
    console.log(response);
    return response;
  } catch (error) {
    return error.response;
  }
};
// Add more functions as needed (login, etc.)
