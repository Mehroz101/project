import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const handleError = (error) => {
  if (error.response) {
    // Handle specific error responses
    switch (error.response.status) {
      case 400:
        // Bad Request
        toast.error(`Bad Request: ${error.response.data.message || "Please check your input."}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
      case 401:
        // Unauthorized
        toast.error(`Unauthorized: ${error.response.data.message || "Please log in again."}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
      case 404:
        // Not Found
        toast.error(`Not Found: ${error.response.data.message || "Resource not found."}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
      case 409:
        // Conflict (e.g., email already exists)
        toast.error(`Conflict: ${error.response.data.message || "Email already exists."}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
      case 422:
        // Unprocessable Entity (e.g., password mismatch)
        toast.error(`Unprocessable Entity: ${error.response.data.message || "Password does not match."}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
      default:
        // General Error
        toast.error(`Error: ${error.response.data.message || "Something went wrong."}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        break;
    }
  } else if (error.request) {
    // The request was made but no response was received
    toast.error("Network error: Please check your connection and try again.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    // Something happened in setting up the request that triggered an Error
    toast.error(`Error: ${error.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};
