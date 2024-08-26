import React from "react";
import Collapsible from "react-collapsible";
import "../styles/FAQs.css";

function FAQs() {
  return (
    <div className="FAQs-Main">
      <h1 className="sectionheader"data-aos="fade-in" data-aos-duration="2000">Frequently Asked Questions</h1>
      <p className="TDes"data-aos="zoom-in" data-aos-duration="2000" data-aos-delay="1500">Have Any Questions? We Have Answers!</p>
      <div className="FAQ-List">
        <div className="left" data-aos="slide-up" data-aos-duration="2000">
          <Collapsible
            trigger={
              <button className="custom-trigger">
                What is MarketMasterBroker and how does it work?
              </button>
            }
            transitionTime={200} 
            contentOuterClassName="custom-content-outer" 
            contentInnerClassName="custom-content-inner" 
          >
            <p className="custom-content">
              MarketMasterBroker is a leading brokerage platform offering access to various financial markets, including Forex, stocks, and indices. It provides advanced trading tools and platforms for traders to execute their strategies efficiently.
            </p>
          </Collapsible>

          <Collapsible
            trigger={
              <button className="custom-trigger">How do I create an account with MarketMasterBroker?</button>
            }
            transitionTime={200} 
            contentOuterClassName="custom-content-outer" 
            contentInnerClassName="custom-content-inner" 
          >
            <p className="custom-content">
              Creating an account with MarketMasterBroker is simple. Just click on the "Register" button and fill out the required information. Once your account is verified, you can start trading.
            </p>
          </Collapsible>

          <Collapsible
            trigger={
              <button className="custom-trigger">
                What deposit methods are available on MarketMasterBroker?
              </button>
            }
            transitionTime={200} 
            contentOuterClassName="custom-content-outer" 
            contentInnerClassName="custom-content-inner" 
          >
            <p className="custom-content">
              MarketMasterBroker offers multiple deposit methods, including bank transfers, credit/debit cards, and electronic wallets. You can choose the method that suits you best and follow the instructions to deposit funds into your account.
            </p>
          </Collapsible>

          <Collapsible
            trigger={
              <button className="custom-trigger">
                How long does it take for a withdrawal to be processed?
              </button>
            }
            transitionTime={200} 
            contentOuterClassName="custom-content-outer" 
            contentInnerClassName="custom-content-inner" 
          >
            <p className="custom-content">
              Withdrawal processing times vary depending on the withdrawal method chosen and may take between 1 to 5 business days. MarketMasterBroker strives to process withdrawals as quickly as possible to ensure a smooth experience for its users.
            </p>
          </Collapsible>
        </div>
        <div className="right"data-aos="slide-up" data-aos-duration="2000">
          <Collapsible
            trigger={
              <button className="custom-trigger">
                Is my personal and financial information secure with MarketMasterBroker?
              </button>
            }
            transitionTime={200} 
            contentOuterClassName="custom-content-outer" 
            contentInnerClassName="custom-content-inner" 
          >
            <p className="custom-content">
              Yes, MarketMasterBroker takes the security of its users' information seriously. It employs advanced encryption and security measures to safeguard your personal and financial data from unauthorized access.
            </p>
          </Collapsible>

          <Collapsible
            trigger={
              <button className="custom-trigger">
                Can I access MarketMasterBroker's platform on mobile devices?
              </button>
            }
            transitionTime={200} 
            contentOuterClassName="custom-content-outer" 
            contentInnerClassName="custom-content-inner" 
          >
            <p className="custom-content">
              Yes, MarketMasterBroker's trading platform is accessible on both desktop and mobile devices. You can download the mobile app from the respective app stores and trade on the go.
            </p>
          </Collapsible>

          <Collapsible
            trigger={
              <button className="custom-trigger">
                Does MarketMasterBroker offer educational resources for traders?
              </button>
            }
            transitionTime={200} 
            contentOuterClassName="custom-content-outer" 
            contentInnerClassName="custom-content-inner" 
          >
            <p className="custom-content">
              Yes, MarketMasterBroker provides a range of educational resources, including tutorials, webinars, and market analysis, to help traders improve their skills and knowledge.
            </p>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
