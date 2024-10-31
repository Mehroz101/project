import axios from "axios";
const API_URL_Link = import.meta.env.REACT_APP_API_URL;
const API_URL = `${API_URL_Link}/api/withdraw`;

export const withDrawRequest = async (data) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    console.log(config)
    // const response = await axios.post(
    //   `${API_URL}/request`,
    //   data,
    //   config
    // );
    const response = await axios.post(`${API_URL}/request`,data,config);

    console.log("response in service");
    console.log(response);
    return response;
  } catch (error) {
    console.log("error");
    console.log(error);
  }
};

export const getWithdrawRequest = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.get(`${API_URL}/get`, config);
  
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
  }
};
