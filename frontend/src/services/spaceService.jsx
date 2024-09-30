import axios from "axios";
import { toast } from "react-toastify";
import { notify } from "./errorHandlerService"; // Import notify function

const API_URL = "http://localhost:5000/api/spaces"; // Adjust to your API endpoint
const token = localStorage.getItem("token"); // Retrieve the token from localStorage
const config = {
  headers: {
    Authorization: `Bearer ${token}`, // Add the token to the Authorization header
  },
};
export const createSpace = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    // Check the status code and notify accordingly
    if (response.status === 201) {
      notify("success", "Space created successfully!");
      return 201;
    } else {
      notify("warning", "Space creation completed with some issues.");
      return;
    }
    // return response;
  } catch (error) {
    // console.log(error)
    // Handle specific status codes or default to general error
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
          return
      }
    } else {
      notify("error", "Network error. Please check your connection.");
      return
    }
  }
};

export const getSpace = async (spaceId = null) => {
  if (spaceId == null) {
    console.log("service page: " + spaceId);
    try {
      const response = await axios.get(`${API_URL}/show`, config);

      // Check the status code and notify accordingly
      if (response.status === 200) {
        console.log(response.data.data);
        return response;
      } else if (response.status === 204) {
        notify("info", "No spaces found.");
        return response;
      } else {
        notify("error", "Fetched spaces with some issues.");
      }
    } catch (error) {
      // Handle specific status codes or default to general error
      if (error.response) {
        switch (error.response.status) {
          case 401:
            notify("error", "Unauthorized. Please log in again.");
            break;
          case 403:
            notify(
              "error",
              "Forbidden. You don't have permission to perform this action."
            );
            break;
          case 404:
            // notify("info","to space list yet");
            break;
          case 500:
            notify("error", "Server error. Please try again later.");
            break;
          default:
            notify(
              "error",
              "Error fetching spaces: " +
                (error.response?.data?.message || error.message)
            );
        }
      } else {
        notify("error", "Network error. Please check your connection.");
      }
      throw error.response; // Still throw the error to handle it in the component if needed
    }
  } else {
    try {
      console.log("req page:=> " + spaceId);
      const response = await axios.get(
        `${API_URL}/getspacedetail/${spaceId}`,
        config
      );
      return response;
    } catch (error) {
      console.log(error.message);
      notify("error" + error.message);
    }
  }
};
export const getSpaceForReservation = async (spaceId) => {
  try {
    console.log("req page:=> " + spaceId);
    const response = await axios.get(
      `${API_URL}/getspacedetailforreservation/${spaceId}`,
      config
    );
    return response.data.data;
  } catch (error) {
    console.log(error.message);
    notify("error" + error.message);
  }
};
export const toggleSpaceStatus = async (spaceId) => {
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
      console.log(response.data.message);
      notify("success", "Space status updated successfully!");
      return response.data.message;
    } else {
      notify("error", "Fetched spaces with some issues.");
    }
  } catch (error) {
    // Handle specific status codes or default to general error
    if (error.response) {
      switch (error.response.status) {
        case 404:
          notify("info", "space not found");
          break;
        case 500:
          notify("error", "Server error. Please try again later.");
          break;
        default:
          notify(
            "error",
            "Error fetching spaces: " +
              (error.response?.data?.message || error.message)
          );
      }
    } else {
      notify("error", "Network error. Please check your connection.");
    }
    throw error.response; // Still throw the error to handle it in the component if needed
  }
};
export const updateSpaceDetails = async (formData, spaceId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      "Content-Type": "multipart/form-data", // Set the content type for FormData
    },
  };

  try {
    const response = await axios.put(
      `${API_URL}/updatespacedetail/${spaceId}`,
      formData,
      config
    );
    console.log(response);
    if (response.status === 201) {
      notify("success", "Space update successfully");
      return 201;
    }
  } catch (error) {
    console.error("Error updating space details:", error);
  }
};

export const handleDelete = async (spaceId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/deletespace/${spaceId}`,
      config
    );
    if (response.status == 200) {
      notify("success", "Space deleted successfully!");
    }
    return response.data;
  } catch (error) {
    console.log(error.message);
    notify("error" + error.message);
  }
};

export const getallspaces = async () => {
  try {
    const response = await axios.get(`${API_URL}/getallspaces`, config);
    console.log(response);
    if (response.status === 201) return response.data.data;
    // return response.data.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          notify("info", "Space not found.");
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
