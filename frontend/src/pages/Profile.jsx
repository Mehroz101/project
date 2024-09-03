import React, { useState } from "react";
import "../styles/Profile.css";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

import { Link , Outlet} from "react-router-dom";
const Profile = () => {
  const {logout} = useAuth()

  const logoutFun = () =>{
    logout()
  }
  return (
    <>
      <Navbar />
      <div className="profile_page">
        <div className="profile_left">
          <ul>
            <li>
              <Link className="active" to="/profile">My Profile</Link>
            </li>
            <li>
              <Link to="booking">Booking</Link>
            </li>
            <li>
              <Link to="message">Message</Link>
            </li>
            <li>
              <Link to="listyourspace">List Your Space</Link>
            </li>
            <li>
              <Link onClick={()=>logoutFun()}>Logout</Link>
            </li>
          </ul>
        </div>
        <div className="profile_right">
        <Outlet />

        {/* <AccountInformation/>
        <ReservationHistory/> 
        <ListyourSpace/> */}
        </div>
      </div>
    </>
  );
};

export default Profile;
