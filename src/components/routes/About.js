import React from "react";
import heroImage from "../../images/heroimage.png";
import aboutpics from "../../images/aipics.jpeg";
import aboutpics2 from "../../images/aboutus.avif";

import Steps from "../Steps";

import "../../styles/About.css";


function About() {
  return (
    <div>
      <div
        style={{
          background:
            "linear-gradient(#28003A80,#08003AB2), url(" + heroImage + ")",
          backgroundSize: "cover", // Add this to ensure the background image covers the container
          backgroundRepeat: "no-repeat", // Add this to prevent the background image from repeating
          backgroundOrigin: "padding-box",
          width: "100%",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 className="sectionheader">About us</h1>
      </div>

      <div className="sect-container dark-container">
  <div className="sect-container-wrapper">
    <div className="crypto-prices-container double-flex">
      <div className="about-top-left">
        <h1 className="sectionheader" data-aos="fade-in" data-aos-duration="2200">
          Your Captivating Journey into the World of Finance.
        </h1>

        <p data-aos="fade-in" data-aos-duration="2400">
          The Market Master Broker was developed using a specialized Generative Pre-trained Transformer (GPT) trained on
          500,000 pages of trading-focused material, aimed at creating an exceptional day trading bot.
        </p>
        <br />
        <br />
        <p data-aos="fade-in" data-aos-duration="2600">
          The results have been truly impressive. Since emerging, the AI-generated bot has consistently delivered daily profits. This highlights the remarkable capabilities of Artificial Intelligence. We are now providing interested investors the chance to utilize this bot.
        </p>
      </div>

      <div className="about-top-right">
        <img src={aboutpics} className="bouncing-div" alt="About" />
      </div>
    </div>
  </div>
</div>



      <div className="steps-container">
        <div className="steps-container-wrapper">
          <div data-aos="fade-up" data-aos-duration="2000">
            <Steps
              stepNumber={"01"}
              stepHeader={"Create an Account"}
              stepDescription={
                "Unlock the World of Trading with Your Account Creation."
              }
            />
          </div> 
          <div data-aos="fade-up" data-aos-duration="2200">
            <Steps
              stepNumber={"02"}
              stepHeader={"Get Started"}
              stepDescription={"Navigate Our Financial Market."}
            />
          </div>
          <div data-aos="fade-up"data-aos-duration="2400">
            <Steps
              stepNumber={"03"}
              stepHeader={"Financial Result"}
              stepDescription={"Unveil Your Financial Outcomes."}
            />
          </div>
        </div>
      </div>


      <div className="sect-container dark-container">
        <div className="sect-container-wrapper">
          <div className="crypto-prices-container double-flex">
            <div className="about-top-left">
            <img src={aboutpics2} className="bouncing-div"/>
            </div>

            <div className="about-top-right">

            <h1 className="sectionheader"data-aos="fade-in"data-aos-duration="2200" >What we do</h1>
            <div className="features-container">
      <p data-aos="fade-in-up"data-aos-duration="2200">
        Our platform, designed for ease of use, enables you to invest in stocks,
        cryptocurrencies, and metals of your choice, regardless of the amount of money you have.
      </p>
      <div className="features-grid"  data-aos="fade-in-up"data-aos-duration="2400">
        <div className="feature-item">
          <i className="fa-solid fa-check icon"></i>
          <p>
            Buy, sell or swap 3,000+ digital assets like crypto, stocks, precious metals, ETFs and crypto indices..
          </p>
        </div>
        <div className="feature-item">
          <i className="fa-solid fa-check icon"></i>
          <p>Automate regular investments with savings plans.</p>
        </div>
        <div className="feature-item">
          <i className="fa-solid fa-check icon"></i>
          <p>Wide range of payment and payout providers.</p>
        </div>
        <div className="feature-item">
          <i className="fa-solid fa-check icon"></i>
          <p>Invest in any asset on Market Master Broker.</p>
        </div>
      </div>
    </div>
              
            </div>


            
          </div>
        </div>
      </div>





    </div>
  );
}

export default About;
