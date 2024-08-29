import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AboutUs.css'; // Make sure to create this CSS file
import Navbar from '../components/Navbar';
import AboutusImg from "../assets/aboutus.jpg"
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <>
    <Navbar/>
    <div className="about_us_section">
      <div className="about_us_image">
        <img 
          src={AboutusImg}
          alt="About Us Illustration"
        />
      </div>
      <div className="about_us_content">
        <h2>About Us</h2>
        <p>
          We are dedicated to providing the best parking solutions for our customers.
          With a focus on innovation and user satisfaction, we ensure that finding 
          and reserving parking spaces is as seamless as possible.
        </p>
        <Link to="/contact" className="contact_us_button">
          Contact Us
        </Link>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AboutUs;
