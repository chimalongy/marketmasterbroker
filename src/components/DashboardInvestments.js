import React, { useEffect, useState } from "react";
import "../styles/DashboardInvestments.css";
import Plans from "./Plans";
import axios from "axios";
import {
  baseurl,
  getuserInvestments,
  getUserWallets,
  getBitcoinPrice,
  getEthereumPrice,
  getLitecoinPrice,
  getElapsedHours,
} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import investmentImage from "../images/cardpayment.gif";
import startInvestingImage from "../images/startinvesting.png";
import InvestmentCard from "./InvestmentCard";
export default function DashboardInvestments() {
  const [loadingInvestments, setLoadingInvestments] = useState(true);
  const [savingInvestment, setSavingInvestment] = useState(false);
  const [Wallets, setWallets] = useState([]);

  const loggedUserdata = useSelector((state) => state.userdata);
  const [showStartInvestment, setShowStartInvestment] = useState(false);

  const [formValues, setFormValues] = useState({
    investmentPlan: "",
    amount: "",
    asset: "",
    paymentOption: "",
  });

  const [errors, setErrors] = useState({});

  const investmentPlans = [
    {
      value: "basic",
      label: "Basic Package",
      duration: 2,
      minimumdeposit: 200,
      maimumdeposite: 150000,
      roi: 35,
      returnCycle: "Hourly",
    },
    {
      value: "standard",
      label: "Standard Package",
      duration: 2,
      minimumdeposit: 500,
      maimumdeposite: 300000,
      roi: 50,
      returnCycle: "Hourly",
    },
    {
      value: "super",
      label: "Super Package",
      duration: 5,
      minimumdeposit: 1000,
      maimumdeposite: 500000,
      roi: 70,
      returnCycle: "Hourly",
    },
    // {
    //   value: "golden",
    //   label: "Golden Package",
    //   duration: 10,
    //   minimumdeposit: 5000,
    //   maimumdeposite: 15000000,
    //   roi: 35,
    //   returnCycle: "Daily",
    // },
    // {
    //   value: "executive",
    //   label: "Executive Package",
    //   duration: 20,
    //   minimumdeposit: 10000,
    //   maimumdeposite: 2000000,
    //   roi: 35,
    //   returnCycle: "Daily",
    // },
    // { value: "standard", label: "Standard Package" },
    // { value: "super", label: "Super Package" },
  ];

  const assets = [
    { value: "bitcoin", label: "Bitcoin" },
    { value: "ethereum", label: "Ethereum" },
    { value: "litecoin", label: "Litecoin" },
    { value: "tether", label: "Tether" },
  ];

  const paymentOptions = [
    { value: "dollar", label: "Dollar Account" },
    { value: "bitcoin", label: "Bitcoin" },
    { value: "ethereum", label: "Ethereum" },
    { value: "litecoin", label: "Litecoin" },
    { value: "tether", label: "Tether" },
  ];

  const quickAmounts = [
    100, 150, 200, 250, 300, 500, 1000, 5000, 10000, 50000, 100000,
  ];

  const [UserInvestments, SetUserInvestments] = useState([]);
  const [errormessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleAmountClick = (amount) => {
    setFormValues({
      ...formValues,
      amount: amount,
    });
  };

  useEffect(() => {
    setLoadingInvestments(true);
    async function getUInvestments() {
      let userinvestments = await getuserInvestments(loggedUserdata.email);
      SetUserInvestments(userinvestments);
      console.log("RETRIEVED", userinvestments);

      for (let i=0; i <userinvestments.length;i++){
        let elapsedhours = getElapsedHours(userinvestments[i]);
      if ((elapsedhours === (Number(userinvestments[i].investmentDuration) *24))&&(userinvestments[i].STATUS !=="COMPLETED") ){
        let requestData = {
          requestTask:"updateInvestmentStatus",
          id: userinvestments[i].id,
        }
        let result = await axios.post(baseurl, requestData)
        console.log(result.data)
      }
      }
    }

    async function getUWallets() {
      let userWallets = await getUserWallets(loggedUserdata.email);
      setWallets(userWallets);
      console.log("RETRIEVED Wallats", userWallets);
    }

    getUInvestments();
    getUWallets();
    setLoadingInvestments(false);
  }, []);

  function validateInputs() {
    setErrorMessage("");

    if (!formValues.investmentPlan) {
      setErrorMessage("Please select a plan.");
      return false;
    }
    if (!formValues.amount || formValues.amount == 0) {
      setErrorMessage("Please add a value amount.");
      return false;
    }
    if (!formValues.asset) {
      setErrorMessage("Please select an asset.");
      return false;
    }
    if (!formValues.asset) {
      setErrorMessage("Please select an asset.");
      return false;
    }
    if (!formValues.paymentOption) {
      setErrorMessage("Please select a wallet.");
      return false;
    }

    function checkAmount() {
      let selectedPlan = investmentPlans.filter(
        (plan) => plan.value == formValues.investmentPlan
      );
      console.log(selectedPlan);
      if (formValues.amount < selectedPlan[0].minimumdeposit) {
        return false;
      } else {
        return true;
      }
    }

    if (!checkAmount()) {
      setErrorMessage("Insufficient amount for this package.");
      return false;
    }

    return true;
  }

  async function confirmInvestment() {
    setSavingInvestment(true);
    if (validateInputs()) {
      const selectedPayment = 0;
      let selectedWallet = Wallets.filter(
        (wallet) => wallet.type == formValues.paymentOption
      );
      let walletvalue = selectedWallet[0].value;

      let convertedAmount = 0;

      switch (formValues.paymentOption) {
        case "BTC":
          console.log("switched btc");
          let btcprice = await getBitcoinPrice();
          console.log("btc price", btcprice);
          convertedAmount = formValues.amount / btcprice;

          break;
        case "ETH":
          console.log("switched eth");
          let ethprice = await getEthereumPrice();
          console.log("eth price", ethprice);
          convertedAmount = formValues.amount / ethprice;
          break;
        case "LTC":
          console.log("switched ltc");
          let ltcprice = await getLitecoinPrice();
          console.log("ltc price", ltcprice);
          convertedAmount = formValues.amount / ltcprice;
          break;

        default:
          console.log("usd or tether");
          convertedAmount = 1 * formValues.amount;
          break;
      }

      if (walletvalue >= convertedAmount) {
        console.log("move forward");
        let selectedPlanDetails = investmentPlans.filter(
          (plan) => plan.value == formValues.investmentPlan
        );

        const requestData = {
          requestTask: "registerinvestment",
          email: loggedUserdata.email,
          firstName: loggedUserdata.firstName,
          investmentPlan: formValues.investmentPlan,
          asset: formValues.asset,
          amount: formValues.amount,
          convertedAmount:convertedAmount,
          paymentWallet: formValues.paymentOption,
          investmentDuration: selectedPlanDetails[0].duration,
          investmentROI: selectedPlanDetails[0].roi,
          investmentLabel: selectedPlanDetails[0].label,
          returnCycle: selectedPlanDetails[0].returnCycle,
          walletID:selectedWallet[0].id
         
        };
        console.log(requestData)
       let result= await axios.post(baseurl,requestData);
       console.log(result.data)
       alert (`CONGRATULATIONS YOUR ${formValues.amount} for ${formValues.investmentPlan} has been registered`)
       setShowStartInvestment(!showStartInvestment)
       setSavingInvestment(false);











      } else {
        setErrorMessage(
          `Insufficent funds in this wallet. You need ${
            convertedAmount - walletvalue
          } of ${formValues.paymentOption} to proceed`
        );
        setSavingInvestment(false);

        return;
      }
    }
    setSavingInvestment(false);
  }
  return (
    <div className="DashboardInvestments">
      {loadingInvestments ? (
        <div className="loadingTab first-inner">
          <i className="fa-solid fa-spinner fa-spin"></i>
        </div>
      ) : (
        <div className="first-inner"  >
          {UserInvestments.length === 0 ?
          
          (
            <div>
              {!showStartInvestment ? (
                <div className="first-inner start-investment-container"  data-aos="fade-in-out"data-aos-duration="2000" >
                  <img src={startInvestingImage} alt="" />
                  <h1 className="dash-header">No Active investment</h1>
                  <p className="dash-description">
                    You currently do not have an active investment, kindly click
                    the button below to get started.
                  </p>
                  <div
                    className="dashboardbutton"
                    onClick={() => {
                      setShowStartInvestment(true);
                    }}
                  >
                    Start Investing
                  </div>
                </div>
              ) : (
                <div className="">
                  <div className="investment-content-container"  data-aos="fade-in-out"data-aos-duration="2400" >
                    <div className="left">
                      <div className=" invest-form-container">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}
                        >
                          {errormessage && (
                            <div className="form-error-container">
                              {errormessage}
                            </div>
                          )}

                          <div className="form-group">
                            <label>Investment Plan</label>
                            <select
                              name="investmentPlan"
                              value={formValues.investmentPlan}
                              onChange={handleChange}
                            >
                              <option value="">Select plan</option>
                              {investmentPlans.map((plan) => (
                                <option key={plan.value} value={plan.value}>
                                  {plan.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="form-group">
                            <label>Select from quick amount</label>
                            <div className="quick-amounts">
                              {quickAmounts.map((amount) => (
                                <button
                                  key={amount}
                                  type="button"
                                  onClick={() => handleAmountClick(amount)}
                                  className={`quick-amount-button ${
                                    formValues.amount === amount.toString()
                                      ? "selected"
                                      : ""
                                  }`}
                                >
                                  ${amount}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Or Enter Your Amount</label>
                            <input
                              name="amount"
                              type="text"
                              placeholder="enter amount"
                              value={formValues.amount}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="form-group">
                            <label>Choose Asset</label>
                            <select
                              name="asset"
                              value={formValues.asset}
                              onChange={handleChange}
                            >
                              <option value="">Select asset</option>
                              {assets.map((asset) => (
                                <option key={asset.value} value={asset.value}>
                                  {asset.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="form-group">
                            <label>Pay from:</label>
                            <select
                              name="paymentOption"
                              value={formValues.paymentOption}
                              onChange={handleChange}
                            >
                              <option value="">Select currency</option>
                              {Wallets.map((option) => (
                                <option key={option.type} value={option.type}>
                                  {option.type} ({option.value})
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* <button type="submit" className="submit-button">
                              Submit
                            </button> */}
                        </form>
                      </div>
                    </div>

                    <div className="right second-inner investmentcheckout"  data-aos="fade-in-out"data-aos-duration="2600" >
                      <p className="dash-header">Checkout</p>

                      <div className="checkout-segment">
                        <div>
                          <div>
                            <p>Investment Plan</p>
                            <p className="investvalue">
                              {formValues.investmentPlan == ""
                                ? "Select Plan"
                                : formValues.investmentPlan.toUpperCase()}
                            </p>
                          </div>

                          <div>
                            <p>Duration</p>
                            <p className="investvalue">
                              <p className="investvalue">
                                {formValues.investmentPlan === ""
                                  ? "Select Plan"
                                  : (() => {
                                      let a = investmentPlans.filter(
                                        (plan) =>
                                          plan.value ==
                                          formValues.investmentPlan.toLowerCase()
                                      );
                                      let duration = a[0].duration;
                                      let durationString = duration + " DAYS";
                                      return durationString;
                                    })()}
                              </p>
                            </p>
                          </div>
                        </div>

                        <div>
                          <div>
                            <p>Minimum Deposit</p>
                            <p className="investvalue">
                              {formValues.investmentPlan === ""
                                ? "Select Plan"
                                : (() => {
                                    let a = investmentPlans.filter(
                                      (plan) =>
                                        plan.value ==
                                        formValues.investmentPlan.toLowerCase()
                                    );
                                    let minimumdeposit = a[0].minimumdeposit;
                                    let minimumdepositString =
                                      "$ " +
                                      minimumdeposit.toLocaleString("en-US") +
                                      ".00";
                                    return minimumdepositString;
                                  })()}
                            </p>
                          </div>

                          <div>
                            <p>Maximum Deposit</p>
                            <p className="investvalue">
                              {formValues.investmentPlan === ""
                                ? "Select Plan"
                                : (() => {
                                    let a = investmentPlans.filter(
                                      (plan) =>
                                        plan.value ==
                                        formValues.investmentPlan.toLowerCase()
                                    );
                                    let maximumdeposit = a[0].maimumdeposite;
                                    let maximumdepositString =
                                      "$ " +
                                      maximumdeposit.toLocaleString("en-US") +
                                      ".00";
                                    return maximumdepositString;
                                  })()}
                            </p>
                          </div>
                          <div>
                            <p>ROI</p>
                            <p className="investvalue">
                              {formValues.investmentPlan === ""
                                ? "Select Plan"
                                : (() => {
                                    let a = investmentPlans.filter(
                                      (plan) =>
                                        plan.value ==
                                        formValues.investmentPlan.toLowerCase()
                                    );
                                    let roi = a[0].roi;
                                    let roiValue =
                                      formValues.amount * (roi / 100);
                                    let roiString = "$ " + roiValue;
                                    return roiString;
                                  })()}
                            </p>
                          </div>

                          <div>
                            <p>Return Cycle</p>
                            <p className="investvalue">
                              {formValues.investmentPlan === ""
                                ? "Select Plan"
                                : (() => {
                                    let a = investmentPlans.filter(
                                      (plan) =>
                                        plan.value ==
                                        formValues.investmentPlan.toLowerCase()
                                    );
                                    let returnCycle = a[0].returnCycle;

                                    return returnCycle;
                                  })()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="checkout-segment">
                        <p>Amount </p>
                        <p className="investvalue">
                          {formValues.amount && "$ " + formValues.amount}
                        </p>
                      </div>
                      <div className="checkout-segment">
                        <p>Crypto Asset </p>
                        <p className="investvalue">
                          {formValues.asset.toLocaleUpperCase()}
                        </p>
                      </div>
                      <div className="checkout-segment">
                        <p>Pay from </p>
                        <p className="investvalue">
                          {formValues.paymentOption.toUpperCase()}
                        </p>
                      </div>

                      <div
                        className="dashboardbutton"
                        onClick={() => {
                          if (!savingInvestment) {
                            confirmInvestment();
                          }
                        }}
                      >
                        {savingInvestment ? (
                          <i class="fa-solid fa-spinner fa-spin"></i>
                        ) : (
                          "Confirm and Invest"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) 
          
          : 
          
          (
            <div className="investment-list-container">

              <div className="dashboardbutton" style={{maxWidth:"200px"}} onClick={()=>{
                setShowStartInvestment(!showStartInvestment)
              }}>
                     { showStartInvestment ? "View Investments": " Add investment"}
              </div>
              {
                showStartInvestment ?
                (
                    //SECOND FORM

                    <div className="investment-content-container">
                    <div className="left">
                      <div className=" invest-form-container">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}
                        >
                          {errormessage && (
                            <div className="form-error-container">
                              {errormessage}
                            </div>
                          )}

                          <div className="form-group">
                            <label>Investment Plan</label>
                            <select
                              name="investmentPlan"
                              value={formValues.investmentPlan}
                              onChange={handleChange}
                            >
                              <option value="">Select plan</option>
                              {investmentPlans.map((plan) => (
                                <option key={plan.value} value={plan.value}>
                                  {plan.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="form-group">
                            <label>Select from quick amount</label>
                            <div className="quick-amounts">
                              {quickAmounts.map((amount) => (
                                <button
                                  key={amount}
                                  type="button"
                                  onClick={() => handleAmountClick(amount)}
                                  className={`quick-amount-button ${
                                    formValues.amount === amount.toString()
                                      ? "selected"
                                      : ""
                                  }`}
                                >
                                  ${amount}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Or Enter Your Amount</label>
                            <input
                              name="amount"
                              type="text"
                              placeholder="enter amount"
                              value={formValues.amount}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="form-group">
                            <label>Choose Asset</label>
                            <select
                              name="asset"
                              value={formValues.asset}
                              onChange={handleChange}
                            >
                              <option value="">Select asset</option>
                              {assets.map((asset) => (
                                <option key={asset.value} value={asset.value}>
                                  {asset.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="form-group">
                            <label>Pay from:</label>
                            <select
                              name="paymentOption"
                              value={formValues.paymentOption}
                              onChange={handleChange}
                            >
                              <option value="">Select currency</option>
                              {Wallets.map((option) => (
                                <option key={option.type} value={option.type}>
                                  {option.type} ({option.value})
                                </option>
                              ))}
                            </select>
                          </div>
                          {/* <button type="submit" className="submit-button">
                              Submit
                            </button> */}
                        </form>
                      </div>
                    </div>

                    <div className="right second-inner investmentcheckout">
                      <p className="dash-header">Checkout</p>

                      <div className="checkout-segment">
                        <div>
                          <div>
                            <p>Investment Plan</p>
                            <p className="investvalue">
                              {formValues.investmentPlan == ""
                                ? "Select Plan"
                                : formValues.investmentPlan.toUpperCase()}
                            </p>
                          </div>

                          <div>
                            <p>Duration</p>
                            <p className="investvalue">
                              <p className="investvalue">
                                {formValues.investmentPlan === ""
                                  ? "Select Plan"
                                  : (() => {
                                      let a = investmentPlans.filter(
                                        (plan) =>
                                          plan.value ==
                                          formValues.investmentPlan.toLowerCase()
                                      );
                                      let duration = a[0].duration;
                                      let durationString = duration + " DAYS";
                                      return durationString;
                                    })()}
                              </p>
                            </p>
                          </div>
                        </div>

                        <div>
                          <div>
                            <p>Minimum Deposit</p>
                            <p className="investvalue">
                              {formValues.investmentPlan === ""
                                ? "Select Plan"
                                : (() => {
                                    let a = investmentPlans.filter(
                                      (plan) =>
                                        plan.value ==
                                        formValues.investmentPlan.toLowerCase()
                                    );
                                    let minimumdeposit = a[0].minimumdeposit;
                                    let minimumdepositString =
                                      "$ " +
                                      minimumdeposit.toLocaleString("en-US") +
                                      ".00";
                                    return minimumdepositString;
                                  })()}
                            </p>
                          </div>

                          <div>
                            <p>Maximum Deposit</p>
                            <p className="investvalue">
                              {formValues.investmentPlan === ""
                                ? "Select Plan"
                                : (() => {
                                    let a = investmentPlans.filter(
                                      (plan) =>
                                        plan.value ==
                                        formValues.investmentPlan.toLowerCase()
                                    );
                                    let maximumdeposit = a[0].maimumdeposite;
                                    let maximumdepositString =
                                      "$ " +
                                      maximumdeposit.toLocaleString("en-US") +
                                      ".00";
                                    return maximumdepositString;
                                  })()}
                            </p>
                          </div>
                          <div>
                            <p>ROI</p>
                            <p className="investvalue">
                              {formValues.investmentPlan === ""
                                ? "Select Plan"
                                : (() => {
                                    let a = investmentPlans.filter(
                                      (plan) =>
                                        plan.value ==
                                        formValues.investmentPlan.toLowerCase()
                                    );
                                    let roi = a[0].roi;
                                    let roiValue =
                                      formValues.amount * (roi / 100);
                                    let roiString = "$ " + roiValue;
                                    return roiString;
                                  })()}
                            </p>
                          </div>

                          <div>
                            <p>Return Cycle</p>
                            <p className="investvalue">
                              {formValues.investmentPlan === ""
                                ? "Select Plan"
                                : (() => {
                                    let a = investmentPlans.filter(
                                      (plan) =>
                                        plan.value ==
                                        formValues.investmentPlan.toLowerCase()
                                    );
                                    let returnCycle = a[0].returnCycle;

                                    return returnCycle;
                                  })()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="checkout-segment">
                        <p>Amount </p>
                        <p className="investvalue">
                          {formValues.amount && "$ " + formValues.amount}
                        </p>
                      </div>
                      <div className="checkout-segment">
                        <p>Crypto Asset </p>
                        <p className="investvalue">
                          {formValues.asset.toLocaleUpperCase()}
                        </p>
                      </div>
                      <div className="checkout-segment">
                        <p>Pay from </p>
                        <p className="investvalue">
                          {formValues.paymentOption.toUpperCase()}
                        </p>
                      </div>

                      <div
                        className="dashboardbutton"
                        onClick={() => {
                          if (!savingInvestment) {
                            confirmInvestment();
                          }
                        }}
                      >
                        {savingInvestment ? (
                          <i class="fa-solid fa-spinner fa-spin"></i>
                        ) : (
                          "Confirm and Invest"
                        )}
                      </div>
                    </div>
                  </div>


                ):
                
                (
                
                <div className="investment-cards-container">
                  {
                    UserInvestments.map((investment)=>(
                      <div className="second-inner" key={investment.id}>
                        <InvestmentCard investmentData={investment}/>
                      </div>
                    ))
                  }
                </div>
                
                )
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
}
