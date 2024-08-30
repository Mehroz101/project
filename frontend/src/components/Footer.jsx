import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
const Footer = () => {
  return (
    <>
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-logo">
            <h1>Parkify</h1>
            <p>Your smart solution for parking.</p>
          </div>
          <div class="footer-links">
            <div class="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/aboutus">About</Link>
                </li>

                <li>
                  <Link to="">List your Space</Link>
                </li>
              </ul>
            </div>
            <div class="footer-section">
              <h3>Contact Us</h3>
              <ul>
                <li>
                  <Link to="">info@example.com</Link>
                </li>
                <li>
                  <Link to="123456789">+123 456 789</Link>
                </li>
                <li>123 Main Street, City</li>
              </ul>
            </div>
            <div class="footer-section">
              <h3>Follow Us</h3>
              <div class="social-media">
                <Link to="">
                  <i class="fab fa-facebook-f"></i>
                </Link>
                <Link to="">
                  <i class="fab fa-twitter"></i>
                </Link>
                <Link to="">
                  <i class="fab fa-instagram"></i>
                </Link>
                <Link to="">
                  <i class="fab fa-linkedin-in"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Smart Parking. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
