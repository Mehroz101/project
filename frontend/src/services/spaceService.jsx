import axios from "axios";
import { toast } from "react-toastify";
import { notify } from "./errorHandlerService"; // Import notify function

const API_URL = "http://localhost:5000/api/spaces"; // Adjust to your API endpoint

export const createSpace = async (formData) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  console.log("token:", token);
  
  console.log("FormData to be sent:", formData);
  try {
    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    // Check the status code and notify accordingly
    if (response.status === 201) {
      notify("success","Space created successfully!");
    } else {
      notify("warning","Space creation completed with some issues.");
    }
    // return response;
  }
  
   catch (error) {
    // console.log(error)
    // Handle specific status codes or default to general error
    if (error.response) {
      switch (error.response.status) {
        case 400:
         notify("error","Please check your input data.");
          break;
        case 401:
         notify("error","Please log in again.");
          break;
        case 403:
         notify("error","You don't have permission to perform this action.");
          break;
        case 500:
         notify("error","Please try again later.");
          break;
        default:
         notify("error","Error creating space: " + (error.response?.data?.message || error.message));
      }
    } else {
      notify("error","Network error. Please check your connection.");
    }
  }
};

export const getSpace = async () => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    },
  };

  try {
    const response = await axios.get(`${API_URL}/show`, config);

    // Check the status code and notify accordingly
    if (response.status === 200) {
      return response;
    } else if (response.status === 204) {
    notify("info","No spaces found.");
      return response;
    } else {
    notify("error","Fetched spaces with some issues.");
    }
  } catch (error) {
    // Handle specific status codes or default to general error
    if (error.response) {
      switch (error.response.status) {
        case 401:
          notify("error","Unauthorized. Please log in again.");
          break;
        case 403:
          notify("error","Forbidden. You don't have permission to perform this action.");
          break;
        case 404:
          // notify("info","to space list yet");
          break;
        case 500:
          notify("error","Server error. Please try again later.");
          break;
        default:
          notify("error","Error fetching spaces: " + (error.response?.data?.message || error.message));
      }
    } else {
      notify("error","Network error. Please check your connection.");
    }
    throw error.response; // Still throw the error to handle it in the component if needed
  }
};

export const toggleSpaceStatus = async (spaceId)  =>{
  console.log("service:", spaceId);
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      "Content-Type": "application/json", // Ensure the Content-Type is JSON
    },
  };

  // Prepare the data to be sent
  const data = { spaceId };

  try {
    const response = await axios.patch(
      `${API_URL}/update`, // Endpoint URL
      data, // Send the spaceId in the request body
      config // Pass the config with headers
    );
    if (response.status === 200) {
      notify("success","Space status updated successfully!");
      return response;
    }  else {
    notify("error","Fetched spaces with some issues.");
    }
  } catch (error) {
    // Handle specific status codes or default to general error
    if (error.response) {
      switch (error.response.status) {
       
        case 404:
          notify("info","space not found");
          break;
        case 500:
          notify("error","Server error. Please try again later.");
          break;
        default:
          notify("error","Error fetching spaces: " + (error.response?.data?.message || error.message));
      }
    } else {
      notify("error","Network error. Please check your connection.");
    }
    throw error.response; // Still throw the error to handle it in the component if needed
  }
  

}