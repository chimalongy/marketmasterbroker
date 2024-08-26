import React, { useEffect } from "react";
import MySlider from "./MySlider";
import bkg from "../images/heroimage.png";
import "../styles/Hero.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import { NavLink, useNavigate } from "react-router-dom";

function Hero() {
    const navmove = useNavigate();
  useEffect(() => {
    AOS.init(); // Initialize AOS library
  }, []);

  return (  
    <div className="hero-wrapper">
      <div className="hero-container">
        <div
          className="hero-left"
          data-aos="slide-right"
          data-aos-duration="2000"
        >
          {/* <MySlider /> */}
          <div className="hero-stuffs">
            <h1 className="sectionheader" style={{textAlign:"left"}}>
            Experience Elite Trading with<br/>
            <span style={{ color: "yellow", padding: "10px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
  A Fully Automated Trading System.
</span>


            </h1>
            <p className="herodescription TDes">
            
            </p>
            <button className="button-div" onClick={() => {
                  navmove("/register");
                }}>Get Started and Experience Success</button>

           
          </div>
        </div>
        {/* <div className="hero-right">
          <img src={bkg} alt="hero-img" className="bounce" />
        </div> */}
      </div>
    </div>
  );
}

export default Hero;
