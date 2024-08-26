import "../styles/Navbar.css";
import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';

const NavBar = () => {
    const screenSize = window.innerWidth;
    const navRef = useRef();
    const minbuttonref= useRef();
    // const btnGetStarted= useRef();
    const headerRef= useRef();

    let [isvisble, setIsvisible]= useState(false);

    function showNav(){
       
       
           
        navRef.current.className="";
        navRef.current.classList.add("responsive-nav-visible");
        // btnGetStarted.current.style.display="block";
        minbuttonref.current.className="fa-solid fa-circle-xmark";
        headerRef.current.style.flexDirection="column";
        setIsvisible(true);
        console.log(isvisble);
        

    }

    function closeNav(){
       
        navRef.current.className="";
        // btnGetStarted.current.style.display="block";
        minbuttonref.current.className="fa-solid fa-bars";
        navRef.current.classList.add("responsive-nav-remove")
        headerRef.current.style.display="flex";
        headerRef.current.style.flexDirection="row";
        navRef.current.classList.add("responsive-nav-visible");
        setIsvisible(false);
        console.log(isvisble);
        
        
    }

    function toggleNavBar() {
      if (isvisble===true){
        closeNav()
    
    }
     else{
           showNav()
           
        }
    }
    return (
        <header ref={headerRef}>

            
         <label className="logo">
                <i  className="fa-solid fa-comments-dollar"></i>
                    Sparky.Cash</label>
            <nav >

                
                
               

                <ul ref={navRef} className="responsive-nav-remove" >
                    <li onClick={closeNav}>
                        
                        <Link to="/">HOME</Link>
                    </li>
                    <li onClick={closeNav}>
                        <Link to="/about">ABOUT</Link>
                    </li>
                    <li onClick={closeNav}>
                        <Link to="/contact">CONTACT US</Link>
                    </li>
                    
                </ul>
                {/* <button ref={btnGetStarted}> <Link to="/register">CONTACT US</Link></button> */}
            </nav>

            <button className="responsive-button" onClick={toggleNavBar} >
                    <i className="fa-solid fa-bars" ref={minbuttonref}></i>
            </button>

        </header>



    );
}

export default NavBar;