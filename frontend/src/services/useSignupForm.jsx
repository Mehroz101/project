import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService"; // Import the signup service
import { useErrorHandling } from "../hooks/useErrorHandling"; // Import custom error handling hook

export const useSignupForm = () => {
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayError } = useErrorHandling(); // Use the custom error handling hook
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserDetail({
      ...userDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signupUser({
        email: userDetail.email,
        password: userDetail.password,
        confirmPassword: userDetail.confirmPassword,
      });

      if (response.status === 201) {
        alert("Account created successfully!");
        navigate("/login"); // Redirect to login page after successful signup
      }
    } catch (error) {
      displayError(error); // Handle the error using the custom error handling hook
    }
  };

  return {
    userDetail,
    handleChange,
    handleSubmit,
  };
};
