import React from "react";
import Hero from "../Hero";
import aboutusImage from "../../images/about-us.jpg";
import "../../styles/Home.css";
import TabComponent from "../TabComponent";
import CardComponent1 from "../CardComponent1";
import CardComponent2 from "../CardComponent2";
import CountCard from "../CountCard";
import CardComponent3 from "../CardComponent3";
import CardComponent4 from "../CardComponent4";
import customer1 from "../../images/2.png";
import customer2 from "../../images/3.png";
import customer3 from "../../images/4.png";
import customer4 from "../../images/5.jpg";

import oilrig from "../../images/oil-rig.png";
import treasure from "../../images/treasure.png";
import capital from "../../images/capital.png";
import realestate from "../../images/building.png";
import tradeImage from "../../images/multidevice.png";

import descriptionImage from "../../images/descriptionImage.jpg";
import FAQs from "../FAQs";
import Plans from "../Plans";
import Steps from "../Steps";
import FeauturesCard from "../FeauturesCard";

import journeyimage1 from "../../images/1.gif";
import journeyimage2 from "../../images/2.gif";
import journeyimage3 from "../../images/3.gif";
import journeyimage4 from "../../images/4.gif";
import aiResults from "../../images/aipics.jpeg";
import JourneyCards from "../JourneyCards";

import priorityImage from "../../images/priorityImage.jpg";
import CryptoPrices from "../CoinPrices";
import BasicPlanCard from "../BasicPlanCard";
import PlansPage from "./PlansPage";
import Testimonials from "../Testimonials";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.livecoinwatch.com/static/lcw-widget.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div className="home-container">
      <Hero />
      <div
        className="livecoinwatch-widget-5"
        lcw-base="USD"
        lcw-color-tx="#999999"
        lcw-marquee-1="coins"
        lcw-marquee-2="movers"
        lcw-marquee-items="10"
        data-aos="slide-right"
        data-aos-duration="6000"
        data-aos-delay="6000"
      ></div>
      <div>
        {/* <iframe
        src="https://fxpricing.com/fx-widget/ticker-tape-widget.php?id=1,2,3,5,14,20&d_mode=compact-name"
        width="100%"
        height="85"
        style={{ border: 'unset' }}
       // data-aos="slide-left" data-aos-duration="6000" data-aos-delay="6000"
      ></iframe> */}
      </div>

      <div className="steps-container">
        <div className="steps-container-wrapper">
          <div data-aos="fade-up" data-aos-duration="2000">
            <Steps
              stepNumber={"01"}
              stepHeader={"Sign Up"}
              stepDescription={
                "Start your trading journey by creating an account."
              }
            />
          </div>
          <div data-aos="fade-up" data-aos-duration="2200">
            <Steps
              stepNumber={"02"}
              stepHeader={"Start Trading"}
              stepDescription={"Explore our financial market offerings."}
            />
          </div>
          <div data-aos="fade-up" data-aos-duration="2400">
            <Steps
              stepNumber={"03"}
              stepHeader={"Financial Results"}
              stepDescription={"See the outcomes of your financial decisions."}
            />
          </div>
        </div>
      </div>

      <div className="sect-container light-container">
        <div className="sect-container-wrapper">
          <div className="top" data-aos="fade-up" data-aos-duration="2000">
            <h1
              className="sectionheader"
              data-aos="zoom-in"
              data-aos-duration="2000"
            >
              Effortless Automated Investing with
              <br /> MarketMaster
            </h1>
            <p
              className="sectiondescription"
              data-aos="zoom-in-up"
              data-aos-duration="2400"
            >
              Looking to invest without the guesswork? Automate your investments
              with MarketMaster AI Trader. Join in under 2 minutes and leverage
              the power of our GPT-powered day trading bot to trade on the NYSE
              for you.
            </p>
          </div>
          <div className="buttom">
            <div className="left">
              <div data-aos="zoom-in-up" data-aos-duration="2200">
                <FeauturesCard
                  icon={<i class="fa-solid fa-database"></i>}
                  header={"Seamless Trading with User-Centered Design"}
                  description={
                    "MarketMaster's intuitive platform makes trading straightforward, giving you the tools to easily manage your financial future."
                  }
                />
              </div>
              <div data-aos="zoom-in-up" data-aos-duration="2400">
                <FeauturesCard
                  icon={<i class="fa-solid fa-sliders"></i>}
                  header={"Comprehensive Support Along the Way"}
                  description={
                    "Our responsive support team is available to help with any inquiries. Reach out through email or the app, and receive timely assistance."
                  }
                />
              </div>
              <div data-aos="zoom-in-up" data-aos-duration="2600">
                <FeauturesCard
                  icon={<i class="fa-solid fa-layer-group"></i>}
                  header={"Quick and Easy Transactions"}
                  description={
                    "Effortlessly deposit and withdraw euros, or transfer cryptocurrencies like Bitcoin, Ethereum, Tether, TRON, Dogecoin, and Litecoin with ease."
                  }
                />
              </div>
            </div>

            <div className="right">
              <img
                src={descriptionImage}
                alt=""
                data-aos="zoom-in-up"
                data-aos-duration="2600"
                className="bouncing-div"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sect-container dark-container">
        <div className="sect-container-wrapper">
          <div className="top">
            <h1
              className="sectionheader"
              data-aos="zoom-in"
              data-aos-duration="2000"
            >
              Embark on Your Investment
              <br /> Journey
            </h1>
          </div>

          <div className="journey-flex">
            <div data-aos="fade-in" data-aos-duration="2200">
              <JourneyCards
                image={journeyimage1}
                header={"Generate Passive Income with Staking"}
              />
            </div>
            <div data-aos="fade-in" data-aos-duration="2400">
              <JourneyCards
                image={journeyimage2}
                header={"Expand Your Portfolio with Crypto Investments"}
              />
            </div>
            <div data-aos="fade-in" data-aos-duration="2600">
              <JourneyCards
                image={journeyimage3}
                header={"Explore Global Markets with Forex Trading"}
              />
            </div>
            <div data-aos="fade-in" data-aos-duration="2800">
              <JourneyCards
                image={journeyimage4}
                header={"Invest in Equities for Long-Term Wealth Growth"}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sect-container light-container">
        <div className="sect-container-wrapper priorty">
          <div className="left">
            <h1
              className="sectionheader"
              style={{ textAlign: "left" }}
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              Security is Our Top Priority.
            </h1>

            <p data-aos="fade-in" data-aos-duration="2200">
              Confidence is crucial in cryptocurrency trading. At MarketMaster,
              we put your security first by implementing industry-leading safety
              features and protocols.
            </p>
            <br />
            <p data-aos="fade-in" data-aos-duration="2400">
              <b>More Secure Than Your Online Bank</b>
              <br />
              &#10686;&#10686; All data sent to our servers is encrypted with
              2048-bit standard protocols and stored on a secure network
              protected by a firewall.
              <br />
              <br />
              <b>Additional Security Measures</b>
              <br />
              &#10686;&#10686; We strongly recommend enabling 2FA for both your
              MarketMaster account and the associated email. We use Hardware
              Security Keys/FIDO2 as an added 2FA method.
            </p>
          </div>

          <div className="right">
            <img src={priorityImage} alt="" />
          </div>
        </div>
      </div>

      <div className="sect-container dark-container">
        <div className="sect-container-wrapper">
          <h1
            className="sectionheader"
            data-aos="fade-in"
            data-aos-duration="2000"
          >
            Stay in Control, Always.
          </h1>

          <p
            className="sectiondescription"
            data-aos="fade-up"
            data-aos-duration="2200"
          >
            With MarketMaster AI Trader, you'll always be informed and in
            command. Our user-first approach equips you with everything you need
            to manage your trades and make smart, informed choices.
          </p>

          <div
            className="crypto-prices-container"
            data-aos="zoom-in-up"
            data-aos-duration="2200"
          >
            <CryptoPrices />
          </div>
        </div>
      </div>

      <div className="sect-container light-container">
        <div className="sect-container-wrapper">
          <div className="crypto-prices-container double-flex">
            <div>
              <img src={aiResults} alt="" className="bouncing-div" />
            </div>
            <div>
  <h1
    className="sectionheader"
    data-aos="fade-in"
    data-aos-duration="2000"
  >
    Actions Speak Louder Than Words.
  </h1>
  <p
    className="sectiondescription"
    data-aos="fade-up"
    data-aos-duration="2200"
  >
    MarketMaster AI Trader is an AI-powered day trading bot that leverages both technical analysis (TA) and real-time news indicators to make sequential trades on a carefully selected list of monitored stocks.
  </p>
</div>

          </div>
        </div>
      </div>

      <div className="sect-container dark-container">
        <div className="sect-container-wrapper ">
          <h1
            className="sectionheader"
            data-aos="fade-in"
            data-aos-duration="2200"
          >
            Feedbacks
          </h1>
          <p className="sectiondescription"></p>
          <Testimonials />
        </div>
      </div>

      <PlansPage />

      <div className="Get-Started-container dark-container">
        <div className="get-started-wrapper">
          <div className="left">
            <div>
              <h1
                className="sectionheader"
                data-aos="fade-in"
                data-aos-duration="2200"
              >
                Ready to Get Started?
              </h1>
              <form data-aos="zoom-in-up" data-aos-duration="2200">
                <input placeholder="Enter Name *" />
                <input placeholder="Enter Email *" />
                <input placeholder="Enter Subject" />
                <textarea rows={5} placeholder="Message Body *"></textarea>

                <button className="button-div">Send Message</button>
              </form>
            </div>
          </div>
          <div className="right">
            <h1
              className="sectionheader"
              data-aos="fade-in"
              data-aos-duration="2200"
            >
              Connect with Us: Reach Out for Support and Assistance
            </h1>
            <p className="sectiondescription">
              Search no more! Click the button below to get started.
            </p>
            <button className="btn-get-solution">Get Your Solution</button>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}
