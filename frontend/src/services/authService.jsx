import axios from "axios";

const API_URL = "http://localhost:5000";

export const signupUser = async (userData) => {
  // console.log("signupuser call");
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, userData);
    // console.log(response.data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const signinUser = async (userData) => {
  // console.log("signinuser call");
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, userData);
    // console.log(response);
    localStorage.setItem("token", response.data.token); // Store the token
    localStorage.setItem("user", response.data.user.email);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const forgetPass = async (userData) => {
  // console.log("forgetPass call");
  try {
    const response = await axios.post(`${API_URL}/api/auth/forget`, userData);
    // console.log(response);
    return response; // Return the response if successful
  } catch (error) {
    return Promise.reject(error.response || error); // Return a rejected promise in case of error
  }
};
export const resetPass = async (userData) => {
  // console.log("resetPass call");

  try {
    const response = await axios.put(
      `${API_URL}/api/auth/resetpassword`,
      userData
    );
    // console.log(response);
    return response; // Return the response if successful
  } catch (error) {
    return Promise.reject(error.response || error); // Return a rejected promise in case of error
  }
};


