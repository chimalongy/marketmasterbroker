import React, { useState, useRef, useEffect } from "react";
import "../styles/Navbar.css";
import Hambuger from "../svgs/hambuger.svg";
import timesButton from "../svgs/timesButton.svg";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navmove = useNavigate();
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth); 
  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const [showNav, setsetShowNav] = useState(false);
  const navMenu = useRef(null);
  const toggleMenu = () => {
    setsetShowNav(!showNav);
    navMenu.current.classList = [];
    if (!showNav) {
      navMenu.current.classList.add("nav-links-mobile");
    } else {
      navMenu.current.classList.add("nav-links");
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div>
          <div className="logo" onClick={()=>{window.location.assign("/")}}>
            <p>Market</p>
            <p style={{ color: "#93c5fd" }}>Master</p>
            <p>Broker</p>
           
          </div>
          <ul className="nav-links" ref={navMenu}>
            
            <li><NavLink
              exact
              to="/"
              onClick={() => {
                if (window.innerWidth < 768) {
                  toggleMenu();
                }
              }}
            >
              Home
            </NavLink></li>

           <li> <NavLink
              to="/about"
              onClick={() => {
                if (window.innerWidth < 768) {
                  toggleMenu();
                }
              }}
            >
              About
            </NavLink></li>


            <li><NavLink
              to="/services"
              onClick={() => {
                if (window.innerWidth < 768) {
                  toggleMenu();
                }
              }}
            >
              Services
            </NavLink></li>

            <li><NavLink
              to="/plans"
              onClick={() => {
                if (window.innerWidth < 768) {
                  toggleMenu();
                }
              }}
            >
              Plans
            </NavLink></li>


            <li><NavLink
              to="/contact"
              onClick={() => {
                if (window.innerWidth < 768) {
                  toggleMenu();
                }
              }}
            >
              Contact
            </NavLink></li>
           
           
           

          


           <li> <NavLink
              to="/termsofservice"
              onClick={() => {
                if (window.innerWidth < 768) {
                  toggleMenu();
                }
              }}
            >
             Legal
            </NavLink></li>
          </ul>
        </div>


       <div>
       <div className="nav-button-wrapper">



  <button
    className="nav-button login-button"
    onClick={() => {
      navmove("/login");
      {
        if (deviceWidth< 768) {
         if(showNav){
          toggleMenu()
         }
           
        }
      }
    }}
  >
    Login
  </button>
  <button
    className="nav-button login-button"
    onClick={() => {
      navmove("/register");
      {
        if (deviceWidth< 768) {
         if(showNav){
          toggleMenu()
         }
           
        }
      }
    }}
  >
    Register
  </button>


  
 
</div>

<div>
{deviceWidth < 768 ? (
  <div className="menu-icon" onClick={toggleMenu}>
    {showNav ? (
     <i class="fa-regular fa-circle-xmark" ></i>
    ) : (
        <i class="fa-solid fa-bars" ></i>
    )}{" "}
   
  </div>
) : (
  <></>
)}
</div>
       </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
