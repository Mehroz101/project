import axios from "axios";

const API_URL = "http://localhost:5000/api/withdraw";
const token = localStorage.getItem("token"); // Retrieve the token from localStorage
const config = {
  headers: {
    Authorization: `Bearer ${token}`, // Add the token to the Authorization header
  },
};
export const withDrawRequest = async (WithdrawData) => {
  try {
    const response = await axios.post(`${API_URL}/request`, WithdrawData,config);
    return response
  } catch (error) {
    console.log(error.message);
  }
};

export const getWithdrawRequest = async () =>{
  try {
    const response = await axios.get(`${API_URL}/get`,config);
    if(response.status === 200){
      return response.data
    }
  } catch (error) {
    console.log(error.message)
  }
}