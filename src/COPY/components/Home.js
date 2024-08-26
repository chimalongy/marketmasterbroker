import React from 'react';

import MethodCard from './MethodCard';
import StepsCard from './StepsCard';
import '../styles/Home.css'; // Import CSS file for styling;
import YouTube from 'react-youtube';
import InvestmentCard from './InvestmentCard';
import { Link } from 'react-router-dom';

import NavBar from './Navbar';
import Footer from './Footer';


//images import

import Bkg1 from "../images/bkg1.png"
import Bkg2 from "../images/bkg2.png"
import Bkg3 from "../images/bkg3.jpg"
import Bkg4 from "../images/bkg4.jpeg"
import Bkg5 from "../images/bkg5.jpg"
import Bkg6 from "../images/bkg6.jpg"
import Bkg7 from "../images/bkg7.jpg"
import Bkg8 from "../images/bkg8.jpg"
import Bkg9 from "../images/bkg9.jpeg"
import Plans from '../components/Plans';


const Home = () => {
  // 2Xg3JHVAog0
  const videoId = '';





  return (
    <div className="main">

      <div className='Section1' >
        <div className='section1contents'>
          <div className='page-welcome'>
            <h1> WELCOME TO Ominecoin Limited</h1>
            <p>Invest in a trustworthy & lucrative investment platform for great earnings, believe in Ominecoin Limited, a UK registered company to make your financial desires come true.</p>
            <button onClick={()=>{window.location.assign('/register')}}>REGISTER TODAY!</button>
          </div>
          <div className='page-welcome-image-div' >
            <img src={Bkg1} alt="welcome-image" />



          </div>
        </div>


      </div>


      <div className='Section2'>

        <h2 className='section2header'>PROFIT CALCULATOR</h2>

        <div className='section2contents'>
          <Plans/>
        </div>

      </div>

      <div className='Section3'
      style={{
        backgroundImage: `url(${Bkg2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      
      
      >
        <div>
        <h2 className='section2header'>WHY CHOOSE US</h2>
        </div>
        <div className='section3contents'>
          <div>
            <MethodCard mheading="PROFESSIONAL TEAM MANAGEMENT" mlogo={<i className="fa-solid fa-people-group"></i>} />
          </div>
          <div>
            <MethodCard mheading="LEGAL REGISTERED COMPANY" mlogo={<i className="fa-solid fa-file-signature"></i>} />
          </div>
          <div>
            <MethodCard mheading="DDOS PROTECTED SERVER" mlogo={<i className="fa-solid fa-shield-virus"></i>} />
          </div>
          <div>
            <MethodCard mheading="COMODO SSL Certificate" mlogo={<i className="fa-solid fa-file-circle-check"></i>} />
          </div>
          <div>
            <MethodCard mheading="24/7 FRIENDLY CUSTOMER SUPPORT" mlogo={<i className="fa-solid fa-headset"></i>} />
          </div>

        </div>

      </div>
      <div className='Section4'>
        <div className='section4contents'>
          <div className='section4contents-left'>
            <h3 className='section2header'>ABOUT US</h3>
            <p>
              Ominecoin limited is a London based international crypto trading company. That has been registered in united kingdom in 2017 at Bristol city. we specialized in primary stock trading, bitcion mining ,debt and investment brokerage and real estate management service to private and institutional investors. Individual and business in distress. The agency operate through a vast network of freelance financial consultants, investment managers, individual traders, venture financiers micro finance institution and other independent contractors.
              <a href='/#'> Read more...</a>
            </p>
            <div className='video'>
              <YouTube videoId={videoId} className="video" />
            </div>


          </div>
          <div className='section4contents-right'>
            <h3 className='section2header'>STEPS TO SUCCESS</h3>
            <StepsCard icon={<i className="fa-solid fa-user-pen"></i>} header="OPEN AN ACCOUNT" description="Click 'Join Today' button to become our member after which you will taken to the page." />
            <StepsCard icon={<i className="fa-sharp fa-solid fa-user-check"></i>} header="LOG IN YOUR ACCOUNT" description="Log in your account & click to make a deposit then select the plan." />
            <StepsCard icon={<i className="fa-solid fa-money-bill-transfer"></i>} header="MAKE DEPOSIT" description="Select a plan then select a e-currency and enter deposit amount and click to spend." />
            <StepsCard icon={<i className="fa-solid fa-hand-holding-dollar"></i>} header="EARN PROFIT" description="After complete, the deposit period your profit will be credited to your account." />


          </div>

        </div>

      </div>
      <div className='Section5'>

        <div className='section5contents'>
        
          <h2 className='section5header section2header'>WHAT WE INVEST IN</h2>
          <div className='section5contentflex'>
            <div>
              <InvestmentCard logo={Bkg5} header="FOREX TRADING" description="Forex is a portmanteau of foreign currency and exchange..." />
            </div>
            <div>
              <InvestmentCard logo={Bkg4} header="REAL ESTATE" description="Real estate investment involves the purchase, ownership, management..." />
            </div>
            <div>
              <InvestmentCard logo={Bkg3} header="CRYPTOCURRENCY" description="Ominecoin Limited now offers all traders the opportunity to trade a wide..." />
            </div>
            <div>
              <InvestmentCard logo={Bkg8} header="TRADING GOLD" description="Gold is commonly seen as a great store of wealth, this precious metal is also..." />
            </div>
            <div>
              <InvestmentCard logo={Bkg6} header="OIL AND GAS" description="Surprising as it might be, anyone can invest in the oil market to make a profit..." />
            </div>
            <div>
              <InvestmentCard logo={Bkg7} header="STOCK & SHARE" description="A stock or share (also known as a company's 'equity') is a financial instrument that..." />
            </div>
            <div>
              <InvestmentCard logo={Bkg9} header="RETIREMENT PLANNING" description="Saving for retirement can be a daunting task, but with a sound strategy, it’s well..." />
            </div>

          </div>
        </div>

      </div>


      <div className='Section8'>
        <div className='section8contents'>
          <Footer />
        </div>
      </div>


    </div>
  );
};

export default Home;
