import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [profileNav, setProfileNav] = useState(false);
  const [email, setEmail] = useState("");
  const navbarRef = useRef(null); // Reference to the navbar element
  const { logout } = useAuth();
  const logoutFun = () => {
    logout();
  };
  const getUsername = () => {
    const emailname = localStorage.getItem("user");
    if (emailname) {
      const name = emailname.split("@")[0];
      setEmail(name);
    } else {
      setEmail("Login");
    }
  };
  // Handle clicks outside the navbar to close it
  useEffect(() => {
    getUsername();
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setNavbar(false);
        setProfileNav(false); // Optionally hide profile menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="container" ref={navbarRef}>
      <div className="nav_items">
        <div className="nav_left">
          <h1>
            <Link to="/">Parkify</Link>{" "}
          </h1>
        </div>
        <div className={navbar ? `nav_right nav_show` : `nav_right`}>
          <div className="nav_right_list">
            {/* <span onClick={() => setNavbar(!navbar)}>a</span> */}
            <ul>
              <li>
                <Link to="/" onClick={() => setNavbar(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/searchResult" onClick={() => setNavbar(false)}>
                  Find Parking
                </Link>
              </li>
              <li>
                <Link to="/aboutus" onClick={() => setNavbar(false)}>
                  About
                </Link>
              </li>
              <li className="profile">
                {email == "Login" ? (
                  <Link
                    to="/profile"
                    onClick={() => setProfileNav(!profileNav)}
                  >
                    <span>{email}</span>
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    onClick={() => setProfileNav(!profileNav)}
                  >
                    <i className="fa-solid fa-user"></i>
                    <span>{email}</span>
                    <i className="fa-solid fa-chevron-down arrow_down"></i>
                  </Link>
                )}
              </li>
              {profileNav && (
                <ul className="profile_links">
                  <li>
                    <Link to="/profile" onClick={() => setNavbar(false)}>
                      Account Information
                    </Link>
                  </li>
                  <li>
                    <Link to="booking" onClick={() => setNavbar(false)}>
                      Booking
                    </Link>
                  </li>
                  <li>
                    <Link to="message" onClick={() => setNavbar(false)}>
                      Messages
                    </Link>
                  </li>
                  <li>
                    <Link to="listyourspace" onClick={() => setNavbar(false)}>
                      List your space
                    </Link>
                  </li>
                  <li>
                    <Link
                      to=""
                      onClick={() => {
                        setNavbar(false);
                        logoutFun();
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
              {navbar && (
                <span className="backbtn" onClick={() => setNavbar(!navbar)}>
                  <i className="fa-solid fa-arrow-left"></i>
                </span>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="menu_icon" onClick={() => setNavbar(!navbar)}>
        <i className="fa-solid fa-bars"></i>
      </div>
    </nav>
  );
};

export default Navbar;
