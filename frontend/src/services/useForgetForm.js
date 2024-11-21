import { useState } from "react";
import { forgetPass } from "../services/authService";
import { notify } from "./errorHandlerService";

export const useForgetForm = () => {
  const [userDetail, setUserDetail] = useState({ email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    const promise = forgetPass({
      email: userDetail.email,
    });

    return promise;
    // e.preventDefault();

    // const myPromise = forgetPass({ email: userDetail.email });

    // toast.promise(myPromise, {
    //   pending: "Sending mail...",
    //   success: "Check your email!",
    //   error: "Failed to send mail",
    // });

    // try {
    //   const response = await myPromise;

    //   if (response.status === 200) {
    //     notify("success", "Check your email.");
    //     // Optionally, navigate to a different route
    //     // navigate("/dashboard");
    //   } else {
    //     handleResponseErrors(response);
    //   }
    // } catch (error) {
    //   handleCatchErrors(error);
    // }
  };

  const handleResponseErrors = (response) => {
    switch (response.status) {
      case 400:
        notify(
          "error",
          `Bad Request: ${response.data.message || "Please check your input."}`
        );
        break;
      case 401:
        notify(
          "error",
          `Unauthorized: ${response.data.message || "Please log in again."}`
        );
        break;
      case 404:
        notify(
          "error",
          `Not Found: ${response.data.message || "Resource not found."}`
        );
        break;
      case 409:
        notify(
          "error",
          `Conflict: ${response.data.message || "Email already exists."}`
        );
        break;
      case 422:
        notify(
          "error",
          `Unprocessable Entity: ${
            response.data.message || "Password does not match."
          }`
        );
        break;
      default:
        notify(
          "error",
          `Error: ${response.data.message || "Something went wrong."}`
        );
        break;
    }
  };

  const handleCatchErrors = (error) => {
    if (error.response) {
      handleResponseErrors(error.response);
    } else if (error.request) {
      notify(
        "error",
        "Network error: Please check your connection and try again."
      );
    } else {
      notify("error", `Error: ${error.message}`);
    }
  };

  return {
    userDetail,
    handleChange,
    handleSubmit,
  };
};
