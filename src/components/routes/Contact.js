import React from "react";
import "../../styles/Contact.css";

import contactImage from "../../images/contact.png";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";

function Contact() {
  return (
   <div>
     <div className="sect-container dark-container">
      <div className="sect-container-wrapper">
        <h1 className="sectionheader" data-aos="fade-in-up"data-aos-duration="2200">Contact us</h1>
        <p className="sectiondescription" data-aos="fade-in-up"data-aos-duration="2400">
          Connect with Us: Reach Out for Support and Assistance.
        </p>
      </div>
    </div>

     <div className="sect-container dark-container">
      <div className="sect-container-wrapper">
      <div className="double-flex">
          <div className="left" data-aos="zoom-in-up"data-aos-duration="2200">
            <div>
              <h1 className="sectionheader">Ready to Get Started?</h1>
              <form>
                <input placeholder="Enter Name *" />
                <input placeholder="Enter Email *" />
                <input placeholder="Enter Subject" />
                <textarea rows={5} placeholder="Message Body *"></textarea>

                <button className="button-div">Send Message</button>
              </form>
            </div>
          </div>
          <div className="right">
            <img src={contactImage}  className="bouncing-div" alt="" />
          </div>
        </div>

        <div className="contact-cards-container">
          <div
            data-aos="slide-up"
            data-aos-duration="2000"
            data-aos-delay="1000"
          >
            <i class="fa-solid fa-mobile-screen"></i>
            <p className="TDes"> Call Us</p>
            <p className="card-info">+447520645543</p>
          </div>

          <div
            data-aos="slide-up"
            data-aos-duration="2000"
            data-aos-delay="1200"
          >
            <i class="fa-solid fa-location-dot"></i>
            <p className="TDes"> Visit us</p>
            <p className="card-info">MarketMasterBroker.com</p>
          </div>

          <div
            data-aos="slide-up"
            data-aos-duration="2000"
            data-aos-delay="1400"
          >
            <i class="fa-regular fa-envelope"></i>
            <p className="TDes"> Email us</p>
            <p className="card-info">TradeQuestHub@gmail.com</p>
          </div>

          <div
            data-aos="slide-up"
            data-aos-duration="2000"
            data-aos-delay="1600"
          >
            <i class="fa-solid fa-comments"></i>
            <p className="TDes">Live Chat</p>
            <p className="card-info">Chat with us 24/7</p>
          </div>
        </div>
      
      </div>
    </div>

    <div className="sect-container light-container">
      <div className="sect-container-wrapper">
        <FrequentlyAskedQuestions/>
        
        </div></div>
   </div>
  );
}

export default Contact;
