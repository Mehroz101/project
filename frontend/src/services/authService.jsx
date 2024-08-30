// services/authService.js
import axios from 'axios';
// import env package



const API_URL = 'http://localhost:5000';

// Example of a signup function
export const signupUser = async (userData) => {
  console.log("signupuser call")
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add more functions as needed (login, etc.)
