import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink, useNavigate } from "react-router-dom";

const MySlider = () => {
  const navmove = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 6000,
  };

  return (
    <Slider {...settings}>
      <div>
        <div className="slider-content" data-aos="zoom-in" data-aos-duration="6000" data-aos-delay="6000">
          <h1 className="PageHeader">Experience Elite Trading with a Top International Broker</h1>
          <p className="herodescription TDes">
            Explore global markets, including Forex, stocks, and indices, using MT4
            and MT5 – the preferred online trading platforms for elite traders.
          </p>

          <div className="hero-button-wrapper">
            <div
              className="button-div"
              onClick={() => {
                navmove("/register");
              }}
            >
              Open an Account
            </div>
           
          </div>
        </div>
      </div>
      <div>
        <div className="slider-content">
          <h1 className="PageHeader">Elevate Your Trading with the World’s Leading Broker!</h1>
          <p className="TDes">
            Enjoy Unbeatable Trading Conditions! Benefit from ZERO Spread on the most popular
            instruments.
          </p>
        

          <div className="hero-button-wrapper">
          <div
              className="button-div"
              onClick={() => {
                navmove("/register");
              }}
            >
              Open an Account
            </div>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default MySlider;
