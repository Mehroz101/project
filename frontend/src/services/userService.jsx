import axios from "axios";

const API_URL = "http://localhost:5000";



export const updateAccountInformation = async (userData) => {
    // console.log("updateAccountInformation call");
    // console.log(userData);
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
  
    try {
      const response = await axios.put(
        `${API_URL}/api/user/updateaccountinformation`,
        userData,
        config // Pass the config with headers
      );
      return response;
    } catch (error) {
      throw error.response;
    }
  };
  export const showAccountInformation = async () => {
    console.log("showAccountInformation call");
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    // console.log("token : ", token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
  
      },
    };
  
    try {
      const response = await axios.get(
        `${API_URL}/api/user/showaccountinformation`,
        config // Pass the config with headers
      );
      // console.log(response);
      return response;
    } catch (error) {
      throw error.response;
    }
  };