import React, { useEffect, useState } from "react";
import { useAccountInformationForm } from "../services/useAccountInformationForm";
import { showAccountInformation } from "../services/userService";

const AccountInformation = () => {
  const [resetForm, setResetForm] = useState(false);
  // const [userDetail, setUserDetail] = useState({
  //   fname: "",
  //   lname: "",
  //   email: "",
  //   phone: "",
  // });
  const { handleSubmit, handleChange, userDetail, updateUserDetails } =
    useAccountInformationForm();

  // Fetch user data and populate the form
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserDetail((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  useEffect(() => {
    showAccountInformation()
      .then((response) => {
        const user = response.data.user;
        //console.log(user)
        updateUserDetails({
          fname: user.fName || "" ,
          lname: user.lName || "",
          email: user.email || "",
          phone: user.phone || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <>
      <div className="profile_right_form">
        <h2>Account Information</h2>
        <p className="form_text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
          eligendi praesentium corporis reiciendis! Temporibus deleniti repellat
          laudantium, quidem qui asperiores.
        </p>
        <div className="profile_from_container">
          <form onSubmit={handleSubmit}>
            <div className="input_combo_box">
              <div className="input_box">
                <label htmlFor="fName">First Name</label>
                <input
                  type="text"
                  name="fname"
                  value={userDetail.fname || ""}
                  onChange={handleChange}
                  placeholder="First name"
                />
              </div>
              <div className="input_box">
                <label htmlFor="lName">Last Name</label>
                <input
                  type="text"
                  name="lname"
                  value={userDetail.lname || ""}
                  onChange={handleChange}
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="input_box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={userDetail.email || ""}
                onChange={handleChange}
                placeholder="Email address"
              />
            </div>
            <div className="input_box">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={userDetail.phone || ""}
                onChange={handleChange}
                placeholder="0301 1111111"
              />
            </div>
            <button type="submit">Save and Update</button>
          </form>
        </div>
      </div>
      <div className="profile_right_reset_password">
        <button className="reset_pass" onClick={() => setResetForm(!resetForm)}>
          Reset Password
        </button>
        <h2
          className={
            resetForm
              ? "reset_password_from_head"
              : "reset_password_from_head_hide"
          }
        >
          Change password
        </h2>
        <form
          className={
            resetForm ? "reset_password_from" : "reset_password_from_hide"
          }
        >
          <div className="email_box box">
            <div className="field">
              <i className="fa-solid fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
          </div>
          <button type="submit">Forget Password</button>
        </form>
      </div>
      {/* <button className="delete_account_btn">Delete my Account</button> */}
    </>
  );
};

export default AccountInformation;
