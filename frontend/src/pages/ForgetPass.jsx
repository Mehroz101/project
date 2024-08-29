import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
const ForgetPass = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This will navigate to the previous page
  }
  return (
    <>
      <div className="login_page forgetpass_page">
        <div className="back_page_btn">
          <span onClick={()=>goBack()}>
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </span>
        </div>
        <div className="login_container">
          <div className="login_left">
            <div className="login_logo">
              <Link to="/">Parkify</Link>
            </div>
            <div className="login_details">
              <form action="">
                <h1>
                  Forget <span className="brand_name">Password</span>
                </h1>
               
                
                <p className="short_text">
                  Enter email to forget password
                </p>
                <div className="email_box box">
                  <label htmlFor="email">Email</label>
                  <div className="field">
                    <i class="fa-solid fa-envelope"></i>
                    <input type="email" placeholder="Email" />
                  </div>
                </div>
               

               
                <button className="login_btn">Forget Password</button>
              </form>
              <div className="dont_account">
                <p>
                  Do you have an account
                  <span>
                    <Link to="/login"> Signin here</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="login_right"></div>
        </div>
      </div>
    </>
  );
};

export default ForgetPass;
