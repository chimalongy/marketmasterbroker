import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Footer.css'
const Footer = () => {
  const navmove=useNavigate();
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className='footer-container'>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <div className="social-icons">
          <NavLink to="/login">  Login</NavLink>
          <NavLink to="/register">  Register</NavLink>
          
           

          </div>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <div className="contact-info">
            <p><NavLink to="/contact">Contact</NavLink></p>
            <p><NavLink to="/faq">FAQs</NavLink></p>
            <p><NavLink to="/privacypolicy">Privacy Policy</NavLink></p>
            <p><NavLink to="/termsofservice">Terms of Service</NavLink></p>
            <p><NavLink to="/refundpolicy">Refund Policy</NavLink></p>
           
          
          
          
            
          </div>
        </div>

        <div className="footer-column">
          <h3>Get in touch</h3>
          <p><i class="fa-solid fa-map-location-dot"></i> Tokyo Japan</p>
          <p><i class="fa-regular fa-envelope"></i> marketmasterbroker@gmail.com
          </p>
          
        </div>

      </div>
      <div className={"bottomBarStyle"}>
        <p>&copy; {currentYear}. All rights reserved MarketMasterBroker.com</p>
        
      </div>
    </footer>
  );
};

export default Footer;
