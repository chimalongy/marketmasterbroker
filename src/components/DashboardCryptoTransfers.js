import React, { useState, useEffect } from "react";
import "../styles/DashboardBankTransfers.css";
import { baseurl, setCookie, getCookie } from "../utils/constants";
import axios from "axios";
import OTPVerification from "./OTPVerification";
import AMLIMFVerification from "./AMLIMFVerification";
import tether from "../images/tether.png"
export default function DashboardCryptoTransfers() {
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [laodingBillingFromat, setLoadBillingFromat] = useState(false);
  const [showBillingFormat, setShowBillingFormat] = useState(false);
  const [billinformatIcon, setLoadBillingFromatIcon] = useState();
  const [billinformatHeader, setLoadBillingFromatHeader] = useState("");
  const [billinformatDescription, setLoadBillingFromatDescription] =
    useState("");
  const [billingPoint, setBillingPoint] = useState("");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setLoadingUserData(true);

    async function fetchData() {
      try {
        const user = getCookie("usersession");
        const requestData = {
          requestTask: "getLoginData",
          email: user,
        };
        const result = await axios.post(baseurl, requestData);
        if (result && result.data) {
          setUserData(result.data);
          console.log("User Data is", result.data);
        }
      } catch (error) {
        alert("Poor internet connection!!!");
        // Handle errors here, e.g., log them or set an error state.
        console.error("Error fetching user data:", error);
      } finally {
        setLoadingUserData(false);
      }
    }

    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    walletaddress: "",
    network: "",
    amount: "",
    transactionPin: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setLoadBillingFromat(true);

      setTimeout(() => {
        setLoadBillingFromat(false);
        billingFormat();
        setShowBillingFormat(true);
      }, 2500);
    } else {
      console.log("Form contains errors");
    }
  };

  function billingFormat() {
    console.log(
      `
        OTP: ${userData.OTP}
        Linking: ${userData.AccountLinking}
        AMLIMF:${userData.AMLIMF}
        OTPVERFIED:${userData.OTPVerified}


        
        `
    );
    if (
      (userData.OTP == "NULL" &&
        userData.AccountVerification == "NOT VERIFIED" &&
        userData.AccountLinking == "NOT LINKED" &&
        userData.AMLIMF == "NULL" &&
        (userData.OTPVerified == "FALSE" || userData.OTPVerified == "")) ||
      (userData.OTP !== "NULL" &&
        userData.AccountVerification == "NOT VERIFIED" &&
        userData.AccountLinking == "NOT LINKED" &&
        userData.AMLIMF == "NULL" &&
        (userData.OTPVerified == "FALSE" || userData.OTPVerified == ""))
    ) {
      setBillingPoint("OTP");
    } else if (
      userData.OTP !== "NULL" &&
      userData.AccountVerification == "NOT VERIFIED" &&
      userData.AccountLinking == "NOT LINKED" &&
      userData.AMLIMF == "NULL" &&
      userData.OTPVerified == "TRUE"
    ) {
      setLoadBillingFromatHeader("Account Not Verified");
      setLoadBillingFromatIcon(<i class="fa-solid fa-user-shield"></i>);
      setLoadBillingFromatDescription(
        "if you are having problems with this please contact support"
      );

      setBillingPoint("Account Verification");
    } else if (
      userData.OTP !== "NULL" &&
      userData.AccountVerification == "VERIFIED" &&
      userData.AccountLinking == "NOT LINKED" &&
      userData.AMLIMF == "NULL" &&
      userData.OTPVerified == "TRUE"
    ) {
      setBillingPoint("Account Linking");
      setLoadBillingFromatHeader("Account Linking Required");
      setLoadBillingFromatIcon(<i class="fa-solid fa-link-slash"></i>);
      setLoadBillingFromatDescription(
        "if you are having problems with this please contact support"
      );
    } else if (
      userData.OTP !== "NULL" &&
      userData.AccountVerification == "VERIFIED" &&
      userData.AccountLinking == "LINKED" &&
      userData.AMLIMF == "NULL" &&
      userData.OTPVerified == "TRUE"
    ) {
      setBillingPoint("AML");
    }
  }
  const validateForm = () => {
    const newErrors = {};
    // Simple validation, checking if fields are empty
    if (!formData.walletaddress.trim()) {
      newErrors.bankName = "Wallet address is required";
    }

    if (!formData.amount.trim()) {
      newErrors.amount = "Amount is required";
    }
    if (!formData.network.trim()) {
      newErrors.amount = "Network is required";
    }
    if (Number(formData.amount.trim()) > 500000) {
      newErrors.amount =
        "Withdrawal limit exceeded. Contact support to increase limit.";
    }
    if (Number(formData.amount.trim()) > Number(userData.Balance)) {
      newErrors.amount = "insufficient funds";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function BillingInfoComponent() {
    return (
      <div className="billingInfoComponent">
        <p className="billingformaticon">{billinformatIcon}</p>
        <h1>{billinformatHeader}</h1>
        <p>{billinformatDescription}</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{
                      display:"flex",
                      padding:"60px 0",
                      justifyContent:"center",
                      alignItems:'center'
                    }}>
                      <img src={tether} alt="tether"/>
                    </div>
      {loadingUserData ? (
        <i class="fa-solid fa-spinner fa-spin dashboardTabLoading"></i>
      ) : (
        <div className="DashboardBankTransfers">
          {userData.Balance == 0 ? (
            <div className="empty-balance">
              <h2>Please deposite funds into your account.</h2>
            </div>
          ) : (
            <div>
              {showBillingFormat ? (
                <div className="billinformat">
                  <div className="withdrawal-wrapper">
                    <div className="widrawal-header">
                      <i class="fa-solid fa-circle-exclamation fa-fade"></i>
                      <h1>Processing Withdrawals</h1>
                    </div>

                    <div className="withdral-detail-container">
                      <p className="withdrawalDetail">
                        <span className="withdrawalDetailTittle">From: </span>
                        {userData.AccountNumber}
                      </p>
                      <p className="withdrawalDetail">
                        <span className="withdrawalDetailTittle">To: </span>
                        {formData.walletaddress}
                      </p>
                      <p className="withdrawalDetail">
                        <span className="withdrawalDetailTittle">
                          Network:{formData.network}
                        </span>
                        {formData.bankName}
                      </p>
                      <p className="withdrawalDetail">
                        <span className="withdrawalDetailTittle">Amount: </span>
                        {formData.amount}
                      </p>
                      <p className="withdrawalDetail">
                        <span className="withdrawalDetailTittle">
                          Currency: 
                        </span>
                        {` USDT `}
                      </p>
                      <div className="Deduction-Summary">
                        <p>Total:</p>
                        <h1> - {formData.amount}</h1>
                      </div>
                    </div>
                  </div>

                  {billingPoint == "OTP" ? (
                    <OTPVerification userData={userData} />
                  ) : billingPoint == "Account Verification" ? (
                    <BillingInfoComponent />
                  ) : billingPoint == "Account Linking" ? (
                    <BillingInfoComponent />
                  ) : (
                    <AMLIMFVerification  userData={userData}/>
                  )}
                </div>
              ) : (
                <div>
                  {Object.keys(errors).length > 0 && (
                    <div className="error-container">
                      <p className="error-lable">
                        Please fix the following errors:
                      </p>
                      <ul>
                        {Object.values(errors).map((error, index) => (
                          <li className="error-item" key={index}>
                            - {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div>
                    
                  <form onSubmit={handleSubmit}>
                    <div className="form-field">
                      <label htmlFor="walletaddress">Wallet Address*</label>
                      <input
                        type="text"
                        id="walletaddress"
                        name="walletaddress"
                        value={formData.walletaddress}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="network">Network</label>
                      <select
                        id="network"
                        name="network"
                        value={formData.network}
                        onChange={handleChange}
                      >
                        <option value="">Select Network</option>
                        <option value="TRC20">TRC20</option>
                        <option value="ERC20">ERC20</option>
                        <option value="BEP20">BEP20</option>
                        <option value="EOS">EOS</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label htmlFor="amount">Amount*</label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                      />
                    </div>

                    <button type="submit">
                      {laodingBillingFromat ? (
                        <i class="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </form>
                  </div>


                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
