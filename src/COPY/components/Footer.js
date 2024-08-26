import React from 'react';
import DescribedCard from './DescribedCard';
import '../styles/Footer.css';
import Bkg10 from "../images/bkg10.png";

function Footer() {
    const apiUrl = 'https://api.coingecko.com/api/v3';
    
    function OurServices() {
        return (
            <ul className='OurServices-Ul'>
                <li><a href="/#">Forex Trading</a></li>
                <li><a href="/#">Real Estate</a></li>
                <li><a href="/#">Cryptocurrency</a></li>
                <li><a href="/#">Gold Trading</a></li>
            </ul>
        );
    }

    function OurAdress() {
        return (
            <div>
                <i class="fa-solid fa-location-dot"></i>
                <label> 381, Midsummer, Boulevard, Milton Keynes,Acron House Mk9 3HP, United Kingdom</label>
            </div>

        );
    }


    return (
        <footer>
            <div className='Section6'>
                <div className='section6contents'>
                    <div>
                        <img src={Bkg10} alt='img'/>
                    </div>
                    {/* <div><DescribedCard head="Referral Commission 5% - 10%" description="4 Level Referrals Commission Since partners are investors who are intere sted in the stability of their assets." /></div>
                    <div><DescribedCard head="Our Services" description={OurServices()} /></div>
                    <div><DescribedCard head="Corporate Address" description={OurAdress()} /></div> */}

                </div>
            </div>




            <div className='Section7'>
                <div className='section7contents'>
                    <div><i className="fa-brands fa-paypal"></i></div>
                    <div><i className="fa-brands fa-bitcoin"></i></div>
                    <div><i className="fa-brands fa-paypal"></i></div>
                </div>
            </div>

            <div className="site-links">
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/products">Products</a>
                <a href="/services">Services</a>
                <a href="/blog">Blog</a>
                <a href="/contact">Contact</a>
            </div>

            <div className="social-links">
                <a href="https://www.facebook.com"><i className="fa-brands fa-facebook"></i></a>
                <a href="https://www.instagram.com"><i className="fa-brands fa-instagram"></i></a>
            </div>
            <div className="copyright">
                <p>© 2023 CoinVest. All rights reserved.</p>
                <marquee behavior="scroll" direction="left">
   This is a marquee example.
</marquee>
            </div>
        </footer>
    );
}

export default Footer;
