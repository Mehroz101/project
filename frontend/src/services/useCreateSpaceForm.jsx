// src/services/useCreateSpaceForm.js
import { useState } from "react";
import { createSpace } from "../services/spaceService";
import { notify } from "./errorHandlerService";

export const useCreateSpaceForm = () => {
  const [spaceDetails, setSpaceDetails] = useState({
    title: "",
    short_description: "",
    description: "",
    features: [],
    longitude: "",
    latitude: "",
    per_hour: "",
    per_day: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setSpaceDetails((prevState) => ({
        ...prevState,
        features: checked
          ? [...prevState.features, value]
          : prevState.features.filter((feature) => feature !== value),
      }));
    } else {
      setSpaceDetails((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (files) => {
    try {
      const formData = new FormData();
      
      formData.append("title", spaceDetails.title);
      formData.append("short_description", spaceDetails.short_description);
      formData.append("description", spaceDetails.description);
      formData.append("features", JSON.stringify(spaceDetails.features));
      formData.append("longitude", spaceDetails.longitude);
      formData.append("latitude", spaceDetails.latitude);
      formData.append("per_hour", spaceDetails.per_hour);
      formData.append("per_day", spaceDetails.per_day);

      files.forEach((file, index) => {
        console.log(`File ${index + 1}:`);
        console.log('File Name:', file.name);
        console.log('File Size:', file.size);
        console.log('File Type:', file.type);
        console.log('Last Modified Date:', new Date(file.lastModified).toLocaleDateString());
        console.log('Last Modified Timestamp:', file.lastModified);
        
        formData.append("files", file);
      });

      // Debugging FormData
      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      const response = await createSpace(formData);

      if (response.status === 200) {
        notify("success", "Space created successfully!");
      } else {
        handleError(response);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          notify(
            "error",
            `Bad Request: ${
              error.response.data.message || "Please check your input."
            }`
          );
          break;
        case 401:
          notify(
            "error",
            `Unauthorized: ${
              error.response.data.message || "Please log in again."
            }`
          );
          break;
        case 404:
          notify(
            "error",
            `Not Found: ${error.response.data.message || "Resource not found."}`
          );
          break;
        case 409:
          notify(
            "error",
            `Conflict: ${
              error.response.data.message || "Space already exists."
            }`
          );
          break;
        case 422:
          notify(
            "error",
            `Unprocessable Entity: ${
              error.response.data.message || "Validation error."
            }`
          );
          break;
        default:
          notify(
            "error",
            `Error: ${
              error.response.data.message || "An unexpected error occurred."
            }`
          );
      }
    } else if (error.request) {
      notify("error", "No response received from server.");
    } else {
      notify("error", `Error: ${error.message}`);
    }
  };

  return { spaceDetails, handleChange, handleSubmit };
};
