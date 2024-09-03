import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../services/authService"; // Import the signup service
import { notify } from "./errorHandlerService";

export const useSignupForm = () => {
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetail((prevState) => {
      const updatedState = {
        ...prevState,
        [name]: value,
      };
      // console.log(updatedState); // Log the updated state here
      return updatedState;
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userDetail)

    try {
      const response = await signupUser({
        email: userDetail.email,
        password: userDetail.password,
        confirmPassword: userDetail.confirmPassword,
      });

      if (response.status === 201) {
        notify("success", "login successfully");
        // navigate("/login");
      }
      else{
        switch(response.status){
          case 402:
            notify("error","password not match")
            break;
            case 409:
              notify("error","user already exist")
              break;
        }
      }
    } catch (error) {
      switch(error.response.status){
        case 422:
          notify("error","password not match")
          break;
          case 409:
            notify("error","user already exist")
            break;
      }
    }
  };

  return {
    userDetail,
    handleChange,
    handleSubmit,
  };
};
