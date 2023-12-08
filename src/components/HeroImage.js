import "./HeroImageStyles.css";
import introImg from "../assets/setup1.jpg";

import React from "react";
import { Link } from "react-router-dom";

const HeroImage = () => {
  return (
    <div className="hero">
      <div className="mask">
        <img className="into-img" src={introImg} alt="landImg" />
      </div>
      <div className="content">
        <h1>Call Africa welcomes you</h1>
        <p>your go-to platform for mobile solutions</p>
        <div>
          <Link to="/services" className="btn">
            Services
          </Link>
          <Link to="/contact" className="btn btn-light">
            Contact-Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
