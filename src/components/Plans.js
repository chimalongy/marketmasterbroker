import React, { useState, useEffect } from "react";
import PlanCard from "./PlanCard";
import "../styles/Plans.css";
import { CheckIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { baseurl, setCookie, getCookie } from "../utils/constants";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import QRCode from "react-qr-code";

function Plans({ userData }) {
  const includedFeatures = [
    "Instruments: Indices, Currencies, Energies, and Metals",
    "Spreads: From 1 pip",
    "Platform: MT4",
    "Instant Withdrawals",
  ];
  const walletAddress = "TGvPkNXjVPfGCybSWHEAietkhwM5iGHAiM";
  useEffect(() => {
    AOS.init(); // Initialize AOS library
  }, []);

  function CopyToClipboard(text) {
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(text);
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    };
    copyToClipboard();
  }

  const [showEnterAmount, setShowEnterAmount] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [minpayment, setMinPayment] = useState(0);
  const [maxpayment, setMaxPayment] = useState(0);
  const [amount, setAmount] = useState(0);
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const [errorMessage, setErrorMessage] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [planRegistered, setPlanRegistered] = useState(false);
  const [showcryptoscreenshot, setshowcryptoscreenshot] = useState(false);



  async function handleProceed() {
    if (amount == 0) {
      setErrorMessage("Invalid amount for the selected plan");
      return;
    } else if (amount < minpayment) {
      setErrorMessage(`You must pay atleast ${minpayment} for this plan.`);
      return;
    } else if (selectedPlan !== "Platinum" && amount > maxpayment) {
      setErrorMessage(`Maximum payment for this plan is ${maxpayment}.`);
      return;
    } else if (!paymentMethod || paymentMethod == "") {
      setErrorMessage(`Please select a payment method`);
      return;
    } else {
      setErrorMessage(``);
      setLoadingPayment(true);

     
        //getUserInvestments
        console.log(paymentMethod);
        const requestData = {
          requestTask: "registerinvestment",
          email: userData.email,
          plan: selectedPlan,
          amount: amount,
          firstName: userData.firstName,
          paymentMethod: paymentMethod,
          file: file, 
        };
        const result = await axios.post(baseurl, requestData);
        console.log("User investments is", result.data);

        if (result.data == "registered") {
          setPlanRegistered(true);
        }

        setTimeout(() => {
          setLoadingPayment(false);
        }, 2500);
      
      
    }
  }

  function handlePlanSelect(plan, min, max) {
    if (document.cookie.indexOf("usersession") !== -1) {
      setSelectedPlan(plan);
      setMinPayment(min);
      setMaxPayment(max);
      if (plan == "Platinum") {
        setMaxPayment("1000+");
      }
      setShowEnterAmount(true);
    } else {
      window.location.assign("/register");
    }
  }

  function handlePaySelect(paytype) {
    setPaymentMethod(paytype);
  }


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && allowedFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please select a valid image file (JPEG, PNG, GIF).');
    }
  };
  

  function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]); // Extract base64 part
        reader.onerror = error => reject(error);
    });
}
  const handleFileSubmit = async () => {
    if (amount == 0) {
      setErrorMessage("Invalid amount for the selected plan");
      return;
    } else if (amount < minpayment) {
      setErrorMessage(`You must pay atleast ${minpayment} for this plan.`);
      return;
    } else if (selectedPlan !== "Platinum" && amount > maxpayment) {
      setErrorMessage(`Maximum payment for this plan is ${maxpayment}.`);
      return;
    } else if (!paymentMethod || paymentMethod == "") {
      setErrorMessage(`Please select a payment method`);
      return;
    } 
    else if (!file) {
      setError('No file selected or invalid file type.');
      return;
    }
    else{
      setErrorMessage(``);
      setLoadingPayment(true);

      const base64File = await toBase64(file);
     
     // console.log(base64File)
      const requestData = {
        requestTask: "registerinvestment",
        email: userData.email,
        plan: selectedPlan,
        amount: amount,
        firstName: userData.firstName,
        paymentMethod: paymentMethod,
        file: base64File // base64 encoded file
    };
    
    const result = await axios.post(baseurl, requestData);
   
    console.log(result.data)

    if (result.data == "registered") {
      setPlanRegistered(true);
      setshowcryptoscreenshot(false)
    }

    setTimeout(() => {
      setLoadingPayment(false);
    }, 2500);
  
      
    
          
     
     
    

    }
  }
  
  return (
    <div>
      {!planRegistered ? (
        <>
          {!showEnterAmount ? (
            <div className="Plans-card">
              {/* BRONX */}
              <div
                className="bg-white py-2 sm:py-2"
                data-aos="zoom-in-up"
                data-aos-duration="2000"
                data-aos-delay="1000"
              >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto max-w-2xl sm:text-center"></div>
                  <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="p-8 sm:p-10 lg:flex-auto">
                      <h3
                        className="text-2xl font-bold tracking-tight text-gray-900"
                        style={{ color: "red" }}
                      >
                        Bronze
                      </h3>
                      <p className="mt-6 text-base leading-7 text-gray-600">
                        Get 400% your investment after 24 hours.
                      </p>
                      <div className="mt-10 flex items-center gap-x-4">
                        <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                          What’s included
                        </h4>
                        <div className="h-px flex-auto bg-gray-100" />
                      </div>
                      <ul
                        role="list"
                        className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                      >
                        {includedFeatures.map((feature) => (
                          <li key={feature} className="flex gap-x-3">
                            <CheckIcon
                              className="h-6 w-5 flex-none text-indigo-600"
                              aria-hidden="true"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                      <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                        <div className="mx-auto max-w-xs px-8">
                          <p className="text-base font-semibold text-gray-600">
                            MIN AMOUNT
                          </p>
                          <p className="mt-6 flex items-baseline justify-center gap-x-2">
                            <span className="text-5xl font-bold tracking-tight text-gray-900">
                              $100
                            </span>
                            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                              USD
                            </span>
                          </p>

                          <div style={{ padding: "30px" }}></div>

                          <p className="text-base font-semibold text-gray-600">
                            MAX AMOUNT
                          </p>
                          <p className="mt-6 flex items-baseline justify-center gap-x-2">
                            <span className="text-5xl font-bold tracking-tight text-gray-900">
                              $500
                            </span>
                            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                              USD
                            </span>
                          </p>
                          <a
                            href="#"
                            className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            style={{ backgroundColor: "#1e3a8a" }}
                            onClick={() => {
                              handlePlanSelect("Bronze", 100, 500);
                            }}
                          >
                            Get access
                          </a>
                          <p className="mt-6 text-xs leading-5 text-gray-600">
                            Invoices and receipts available for easy company
                            reimbursement
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Silver */}
              <div
                className="bg-white py-2 sm:py-2"
                data-aos="zoom-in-up"
                data-aos-duration="2000"
              >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto max-w-2xl sm:text-center"></div>
                  <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="p-8 sm:p-10 lg:flex-auto">
                      <h3
                        className="text-2xl font-bold tracking-tight text-gray-900"
                        style={{ color: "silver" }}
                      >
                        Silver
                      </h3>
                      <p className="mt-6 text-base leading-7 text-gray-600">
                        Get 400% of your investment everyday for 24 7 days.
                      </p>
                      <div className="mt-10 flex items-center gap-x-4">
                        <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                          What’s included
                        </h4>
                        <div className="h-px flex-auto bg-gray-100" />
                      </div>
                      <ul
                        role="list"
                        className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                      >
                        {includedFeatures.map((feature) => (
                          <li key={feature} className="flex gap-x-3">
                            <CheckIcon
                              className="h-6 w-5 flex-none text-indigo-600"
                              aria-hidden="true"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                      <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                        <div className="mx-auto max-w-xs px-8">
                          <p className="text-base font-semibold text-gray-600">
                            MIN AMOUNT
                          </p>
                          <p className="mt-6 flex items-baseline justify-center gap-x-2">
                            <span className="text-5xl font-bold tracking-tight text-gray-900">
                              $100
                            </span>
                            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                              USD
                            </span>
                          </p>

                          <div style={{ padding: "30px" }}></div>

                          <p className="text-base font-semibold text-gray-600">
                            MAX AMOUNT
                          </p>
                          <p className="mt-6 flex items-baseline justify-center gap-x-2">
                            <span className="text-5xl font-bold tracking-tight text-gray-900">
                              $500
                            </span>
                            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                              USD
                            </span>
                          </p>
                          <a
                            href="#"
                            className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            style={{ backgroundColor: "#1e3a8a" }}
                            onClick={() => {
                              handlePlanSelect("Silver", 100, 500);
                            }}
                          >
                            Get access
                          </a>
                          <p className="mt-6 text-xs leading-5 text-gray-600">
                            Invoices and receipts available for easy company
                            reimbursement
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gold */}
              <div
                className="bg-white py-2 sm:py-2"
                data-aos="zoom-in-up"
                data-aos-duration="2000"
              >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto max-w-2xl sm:text-center"></div>
                  <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="p-8 sm:p-10 lg:flex-auto">
                      <h3
                        className="text-2xl font-bold tracking-tight text-gray-900"
                        style={{ color: "gold" }}
                      >
                        Gold
                      </h3> 
                      <p className="mt-6 text-base leading-7 text-gray-600">
                        Get 500% your investment everyday.
                      </p>
                      <div className="mt-10 flex items-center gap-x-4">
                        <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                          What’s included
                        </h4>
                        <div className="h-px flex-auto bg-gray-100" />
                      </div>
                      <ul
                        role="list"
                        className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                      >
                        {includedFeatures.map((feature) => (
                          <li key={feature} className="flex gap-x-3">
                            <CheckIcon
                              className="h-6 w-5 flex-none text-indigo-600"
                              aria-hidden="true"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                      <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                        <div className="mx-auto max-w-xs px-8">
                          <p className="text-base font-semibold text-gray-600">
                            MIN AMOUNT
                          </p>
                          <p className="mt-6 flex items-baseline justify-center gap-x-2">
                            <span className="text-5xl font-bold tracking-tight text-gray-900">
                              $500
                            </span>
                            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                              USD
                            </span>
                          </p>

                          <div style={{ padding: "30px" }}></div>

                          <p className="text-base font-semibold text-gray-600">
                            MAX AMOUNT
                          </p>
                          <p className="mt-6 flex items-baseline justify-center gap-x-2">
                            <span className="text-5xl font-bold tracking-tight text-gray-900">
                              $999
                            </span>
                            <span className="text-sm font-semibold leading-6 tracking-wide text-blue-100">
                              USD
                            </span>
                          </p>
                          <a
                            href="#"
                            className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            style={{ backgroundColor: "#1e3a8a" }}
                            onClick={() => {
                              handlePlanSelect("Gold", 500, 999);
                            }}
                          >
                            Get access
                          </a>
                          <p className="mt-6 text-xs leading-5 text-gray-600">
                            Invoices and receipts available for easy company
                            reimbursement
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platinum */}
              <div
                className="bg-white py-2 sm:py-2"
                data-aos="zoom-in-up"
                data-aos-duration="2000"
              >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <div className="mx-auto max-w-2xl sm:text-center"></div>
                  <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="p-8 sm:p-10 lg:flex-auto">
                      <h3
                        className="text-2xl font-bold tracking-tight text-gray-900"
                        style={{ color: "dark-grey" }}
                      >
                        Platinum
                      </h3>
                      <p className="mt-6 text-base leading-7 text-gray-600">
                        Get 700% your investment after 24 hours.
                      </p>
                      <div className="mt-10 flex items-center gap-x-4">
                        <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                          What’s included
                        </h4>
                        <div className="h-px flex-auto bg-gray-100" />
                      </div>
                      <ul
                        role="list"
                        className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                      >
                        {includedFeatures.map((feature) => (
                          <li key={feature} className="flex gap-x-3">
                            <CheckIcon
                              className="h-6 w-5 flex-none text-indigo-600"
                              aria-hidden="true"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                      <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                        <div className="mx-auto max-w-xs px-8">
                          <p className="text-base font-semibold text-gray-600">
                            MIN AMOUNT
                          </p>
                          <p className="mt-6 flex items-baseline justify-center gap-x-2">
                            <span className="text-5xl font-bold tracking-tight text-gray-900">
                              $1000 or more
                            </span>
                            <span className="text-sm font-semibold leading-6 tracking-wide  text-blue-100">
                              USD
                            </span>
                          </p>

                          <div style={{ padding: "30px" }}></div>

                          <a
                            href="#"
                            className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            style={{ backgroundColor: "#1e3a8a" }}
                            onClick={() => {
                              handlePlanSelect("Platinum", 1000, 0);
                            }}
                          >
                            Get access
                          </a>
                          <p className="mt-6 text-xs leading-5 text-blue-100">
                            Invoices and receipts available for easy company
                            reimbursement
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="payment-container">
              {errorMessage && (
                <div className="form-error-container">
                  <p className="error">
                    <i class="fa-solid fa-circle-exclamation"></i>{" "}
                    {errorMessage}
                  </p>
                </div>
              )}
              <div>
                <p>Selected Plan:</p>
                <h1 className="selected-plan">{selectedPlan}</h1>
              </div>

              <div>
                <label className="section-label">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
                <p className="little-description">
                  ${minpayment} - ${maxpayment}
                </p>
              </div>

              <div>
                <p className="section-label">Payment Method</p>

                <div>
                  <div className="payment-icons">
                    <div
                      className={
                        paymentMethod == "bank" ? "selected-plan-payment" : ""
                      }
                      onClick={() => {
                        handlePaySelect("bank");
                      }}
                    >
                      <i class="fa-solid fa-building-columns"></i>
                      <p className="little-description">
                        {paymentMethod == "bank" ? "Bank" : ""}
                      </p>
                    </div>
                    <div
                      className={
                        paymentMethod == "paypal" ? "selected-plan-payment" : ""
                      }
                      onClick={() => {
                        handlePaySelect("paypal");
                      }}
                    >
                      <i class="fa-brands fa-paypal"></i>
                      <p className="little-description">
                        {paymentMethod == "paypal" ? "Paypal" : ""}
                      </p>
                    </div>
                    <div
                      className={
                        paymentMethod == "crypto" ? "selected-plan-payment" : ""
                      }
                      onClick={() => {
                        handlePaySelect("crypto");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="35"
                        height="35"
                        viewBox="0 0 48 48"
                      >
                        <circle cx="24" cy="24" r="20" fill="#1e3a8a"></circle>
                        <rect
                          width="18"
                          height="5"
                          x="15"
                          y="13"
                          fill="#fff"
                        ></rect>
                        <path
                          fill="#fff"
                          d="M24,21c-4.457,0-12,0.737-12,3.5S19.543,28,24,28s12-0.737,12-3.5S28.457,21,24,21z M24,26 c-5.523,0-10-0.895-10-2c0-1.105,4.477-2,10-2s10,0.895,10,2C34,25.105,29.523,26,24,26z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M24,24c1.095,0,2.093-0.037,3-0.098V13h-6v10.902C21.907,23.963,22.905,24,24,24z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M25.723,25.968c-0.111,0.004-0.223,0.007-0.336,0.01C24.932,25.991,24.472,26,24,26 s-0.932-0.009-1.387-0.021c-0.113-0.003-0.225-0.006-0.336-0.01c-0.435-0.015-0.863-0.034-1.277-0.06V36h6V25.908 C26.586,25.934,26.158,25.953,25.723,25.968z"
                        ></path>
                      </svg>
                      <p className="little-description">
                        {paymentMethod == "crypto" ? "Crypto" : ""}
                      </p>
                    </div>
                  </div>

                  {paymentMethod == "crypto" ? (
                    <div className="qrContainer">
                      <QRCode value={walletAddress} fgColor="#1e3a8a" />
                      <h1>
                        <b>USDT (TRC-20)</b>
                      </h1>
                      <p>{walletAddress}</p>
                      <div
                        onClick={() => {
                          CopyToClipboard(walletAddress);
                        }}
                        className="copy-address-button"
                      >
                        <i
                          class="fa-regular fa-copy "
                          style={{ fontSize: "30px", active: "blue" }}
                        ></i>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div>
                <button
                  style={{ width: "100%" }}
                  onClick={() => {
                    if (!loadingPayment) {
                     if (paymentMethod=="crypto"){
                     
                       if (amount == 0) {
                        setErrorMessage("Invalid amount for the selected plan");
                        return;
                      } else if (amount < minpayment) {
                        setErrorMessage(`You must pay atleast ${minpayment} for this plan.`);
                        return;
                      } else if (selectedPlan !== "Platinum" && amount > maxpayment) {
                        setErrorMessage(`Maximum payment for this plan is ${maxpayment}.`);
                        return;
                      } else if (!paymentMethod || paymentMethod == "") {
                        setErrorMessage(`Please select a payment method`);
                        return;
                      } else {
                        setErrorMessage(``);
                        setPlanRegistered(true);
                        setshowcryptoscreenshot(true)}
                     }
                     else{
                      handleProceed()
                     }
                    }
                  }}
                >
                  {loadingPayment ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : paymentMethod === "crypto" ? (
                    "I have paid"
                  ) : (
                    "Proceed"
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="Investment-confirmed">
          {paymentMethod === "crypto" ? (
            <div>
              {showcryptoscreenshot ? (
                <div style={{display:"flex", flexDirection:"column", gap:'14px'}}>
                 
                    <lable>Send Screenshot</lable>
                  
                    <input type="file" onChange={handleFileChange} />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                  <button onClick={()=>{handleFileSubmit()}}>{loadingPayment ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : "Upload Screenshot"}</button>
                </div>
              ) : (
                <>
                  <i class="fa-solid fa-circle-info"></i>
                  <p>Request Recieved</p>
                  <p>We'll review your payment and credit your account.</p>
                </>
              )}
            </div>
          ) : (
            <>
              <i class="fa-solid fa-circle-info"></i>
              <p>Request Confirmed</p>
              <p>Please contact support for activation and payment details</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Plans;
