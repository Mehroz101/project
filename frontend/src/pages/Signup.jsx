import React, { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This will navigate to the previous page
  };
  return (
    <>
      <div className="login_page signup_page">
        <div className="back_page_btn">
          <span onClick={() => goBack()}>
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
                  Create an <span className="brand_name">Account</span>
                </h1>
                <button className="google_btn">
                  <i class="fa-brands fa-google"></i>
                  <span>Signin with Google</span>
                </button>
                <div className="bottom_line">
                  <div className="line"></div>
                  <span>or</span>
                  <div className="line"></div>
                </div>
                <p className="short_text">
                  Enter email and password to create an account
                </p>
                <div className="email_box box">
                  <label htmlFor="email">Email</label>
                  <div className="field">
                    <i class="fa-solid fa-envelope"></i>
                    <input type="email" placeholder="Email" />
                  </div>
                </div>
                <div className="password_box box">
                  <label htmlFor="password">Password</label>
                  <div className="field">
                    <i class="fa-solid fa-key"></i>
                    <input type="password" placeholder="Password" />
                  </div>
                </div>
                <div className="password_box box">
                  <label htmlFor="password">Confirm password</label>
                  <div className="field">
                    <i class="fa-solid fa-key"></i>
                    <input type="password" placeholder="Confirm Password" />
                  </div>
                </div>
                <button className="login_btn">Sign up</button>
              </form>
              <div className="dont_account">
                <p>
                  "Do you have an account
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

export default Signup;
