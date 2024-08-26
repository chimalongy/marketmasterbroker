import React from "react";
import heroImage from "../../images/heroimage.png";
import service1 from "../../images/Invest-Crypto.png";
import service2 from "../../images/Invest-BCI.png";
import service3 from "../../images/invest3.avif";

import CardComponent1 from "../CardComponent1";

function Services() {
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
        <h1 className="sectionheader">Services</h1>
      </div>

      <div className="sect-container dark-container">
        <div className="sect-container-wrapper">
          <h1 className="sectionheader ">
            All your Investments <br />
            Opportunities On Market Master Broker
          </h1>

          <div className="double-flex">
            <div>
              <CardComponent1
                image={service1}
                header={"Cryptocurrencies"}
                description={"Invest in Crypto currencies you want anywhere"}
                moredetails={
                  <p className="more-details">
                    Embark on a journey into the dynamic world of cryptocurrency
                    investment with us. Gain access to a diverse range of
                    digital assets, from established cryptocurrencies like
                    Bitcoin and Ethereum to exciting altcoins. <br />
                    Our platform empowers you to seamlessly invest, trade, and
                    diversify your portfolio in the ever-evolving crypto market.
                    Whether you're a seasoned investor or a newcomer, we provide
                    the tools and resources to navigate the crypto landscape
                    confidently. Join us and be at the forefront of the future
                    of finance through strategic and rewarding cryptocurrency
                    investments.
                  </p>
                }
              />
            </div>
            <div>
              <CardComponent1
                image={service2}
                header={"Staking"}
                description={
                  "Maximize your returns with our user friendly staking feautures"
                }
                moredetails={
                  <p className="more-details">
                    Earn Money by Staking Crypto Up to 7.5% per year.
                    <br /> Participate in staking your crypto on Meta Finance
                    Capital to earn rewards on your investments while they're
                    held. Begin staking effortlessly with just a few clicks, and
                    receive monthly rewards in the same currency you stake.
                    Enjoy the flexibility of instantly unstaking at any time,
                    all at no cost.
                  </p>
                }
              />
            </div>
          </div>

          <CardComponent1
            image={service3}
            header={"Trading"}
            description={"Unlock unprecedented insights and trading advantages through our state-of-the-art AI-powered Forex trading tools."}
            moredetails={
              <p className="more-details">
                Elevate Your Forex Trading with Cutting-Edge AI Technology"
                Immerse yourself in a revolutionary forex trading experience
                with our company, where artificial intelligence takes center
                stage. Our advanced AI-driven tools analyze market data in
                real-time, providing you with unparalleled insights and
                optimizing your trading strategies. Say goodbye to guesswork and
                embrace precision as our AI algorithms dynamically adapt to
                market trends. Join us to unlock the potential of AI in forex
                trading, ensuring informed decisions, efficient executions, and
                the pursuit of consistent returns. Experience the future of
                forex trading with our innovative AI solutions.
              </p>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Services;
