import React, { useState } from "react";

import { Link } from "react-router-dom";
const AccountInformation = () => {
  const [resetform, setResetform] = useState(false);

  return (
    <>
        <div className="profile_right_form">
          <h2>Account Information</h2>
          <p className="form_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            eligendi praesentium corporis reiciendis! Temporibus deleniti
            repellat laudantium, quidem qui asperiores.
          </p>
          <div className="profile_from_container">
            <form>
              <div className="input_combo_box">
                <div className="input_box">
                  <label htmlFor="fName">First Name</label>
                  <input type="text" placeholder="First name" />
                </div>
                <div className="input_box">
                  <label htmlFor="lName">Last Name</label>
                  <input type="text" placeholder="Last name" />
                </div>
              </div>
              <div className="input_box">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email address" />
              </div>
              <div className="input_box">
                <label htmlFor="number">Phone Number</label>
                <input type="number" placeholder="0301 1111111" />
              </div>
              <button>Save and Update</button>
            </form>
          </div>
        </div>
        <div className="profile_right_reset_password">
          <button className="reset_pass" onClick={() => setResetform(true)}>
            Reset Password
          </button>
          <h2
            className={
              resetform
                ? "reset_password_from_head"
                : "reset_password_from_head_hide"
            }
          >
            Change password
          </h2>
          <from
            className={
              resetform ? "reset_password_from" : "reset_password_from_hide"
            }
          >
           <div className="email_box box">
                  <div className="field">
                    <i class="fa-solid fa-envelope"></i>
                    <input type="email" placeholder="Email" />
                  </div>
                </div>
            <button>Forget Password</button>
          </from>
        </div>
        <button className="delete_account_btn">Delete my Account</button>
    </>
  );
};

export default AccountInformation;
