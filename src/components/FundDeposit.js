import React, { useEffect, useState } from "react";
import "../styles/FundDeposits.css";
import DepositBank from "./DepositBank";
import DepositCard from "./DepositCard";
import DepositManual from "./DepositManual";
import {
  baseurl,
  setCookie,
  getCookie,
  getUserTransactions,
  getUserWallets,
  getuserInvestments,
  getBitcoinPrice,
  getEthereumPrice,
  getLitecoinPrice
} from "../utils/constants";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

export default function FundDeposit() {
  const loggedUserdata = useSelector((state) => state.userdata);
  const loggedUserWallets = useSelector((state) => state.userWallets);

  const [amountToFund, setAmountToFund] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [walletToFund, setWalletToFund] = useState("");
  const [walletTofundCurrency, setWalletToFundCurrency]= useState("")
  const [paymentCurrency, setPaymentCurrency] = useState("");
  const [transactionID, setTransactionID] = useState("");

  const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
  const [paymentscreenshot, setpaymentscreenshot] = useState(null);
  const [uplaodError, setUploadError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [walletToFundError, setwallettofundError] = useState("");
 

  const [paymentmentsent, setpaymentsent] = useState(false);

  const [uploadingTransaction, setUploadingTransaction] = useState(false);

  const generateTransactionID = () => {
    // Generate a random 6-character validation code
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 11; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64 part
      reader.onerror = (error) => reject(error);
    });
  }

  async function uploadTransactions() {
  
    if (!amountToFund || amountToFund==0){
      setUploadError("Please add Amount")
      return;
    }
    else if (!selectedPaymentMethod){
      setUploadError("Please add a payment method"); return}
    else if (!walletToFund){setUploadError("Please choose a wallet to fund"); return;}
    else if (!paymentscreenshot){setUploadError("Please add a screen shot"); 
      return;}
    else{

      let  walletdetails= loggedUserWallets.filter(wallet=>wallet.id==walletToFund)
      console.log(walletdetails);
      let walletType= walletdetails[0].type


      let newAmount = amountToFund;

      if (walletType=="BTC"){
        let btcprice = await getBitcoinPrice();
        console.log("Bitcoin Price is "+ btcprice)
       let amountvalue =  Number (newAmount)/Number (btcprice);
       console.log("amount value", amountvalue)
       newAmount = amountvalue.toFixed(5)
      }
      if (walletType=="ETH"){
        let ethprice =await getEthereumPrice();
        console.log("ETH Price is "+ ethprice)
       let amountvalue = Number (newAmount)/ Number(ethprice);
       console.log("amount value", amountvalue)
      newAmount = amountvalue.toFixed(5)
      }
      if (walletType=="LTC"){
        let ltcprice = await getEthereumPrice();
        console.log("LTC Price is "+ ltcprice )
       let amountvalue = Number(newAmount)/Number (ltcprice);
       console.log("amount value", amountvalue)
       newAmount = amountvalue.toFixed(5)
      }
      if (walletType=="USD" || walletType=="USDT"){
       
       let amountvalue = Number(newAmount).toFixed(2)
      
       newAmount = Number(amountvalue)
      }

      
      console.log("newAmount", newAmount)


      setUploadingTransaction(true)
      const base64File = await toBase64(paymentscreenshot); 
      const requestData = {
        requestTask: "registertransaction",
        firstName: loggedUserdata.firstName,
        email: loggedUserdata.email,
        amount: newAmount,
        type:"DEPOSIT",
        transactionID: transactionID,
        walletToFund:walletToFund,
        file: base64File, // base64 encoded file
        paymentCurrency:walletType,
      };

  
       console.log(requestData)
      const result = await axios.post(baseurl, requestData);
      console.log(result.data)
      setUploadingTransaction(false)
      
    if (result.data.trim()=="transaction-registered"){
      alert("Deposit recieved, you'd recieve an email shortly.")
      setpaymentsent(false)
    }
    }

  }

  function SwitchDepositeOptin() {
    switch (selectedPaymentMethod) {
      case "Manual":
        return (
          <DepositManual
            setpaymentsent={setpaymentsent}
            setPaymentCurrency={setPaymentCurrency}
            

          />
        );
      case "Card":
        return <DepositCard />;
      case "Bank":
        return <DepositBank setpaymentsent={setpaymentsent} />;
      default:
        return null;
    }
  }

  return (
    <div className="funddeposit">
      <div className="deposit-container">
        <div className="left">
          <div className="first-inner" data-aos="fade-up"data-aos-duration="2000">
            <div className="amount-container" data-aos="fade-up"data-aos-duration="1500">
              <p>Amount</p>
              <input
                type="number"
                value={amountToFund}
                onChange={(e) => {
                  setAmountToFund(e.target.value);
                  setAmountError("");
                }}
              />
            </div>

            <div className="second-inner" data-aos="fade-up"data-aos-duration="1500">
              {paymentmentsent ? (
                <div className="upload-container">
                  {uplaodError && (
                    <div className="form-error-container ">
                      <i class="fa-solid fa-circle-info"></i>
                      <p>{uplaodError}</p>
                    </div>
                  )}
                  <p className="dash-header">Upload Screenshot</p>

                  <input
                    type="file"
                    onChange={(e) => {
                      const selectedFile = e.target.files[0];
                      if (
                        selectedFile &&
                        allowedFileTypes.includes(selectedFile.type)
                      ) {
                        setpaymentscreenshot(selectedFile);
                        setUploadError("");
                      } else {
                        setpaymentscreenshot(null);
                        setUploadError(
                          "Please select a valid image file (JPEG, PNG, GIF)."
                        );
                      }
                    }}
                  />

                  <div className="upload-controls">
                    <div
                      className="dashboardbutton"
                      onClick={() => {
                        setpaymentsent(false);
                      }}
                    >
                      Cancel
                    </div>
                    <div
                      className="dashboardbutton"
                      onClick={() => {
                        if (!uploadingTransaction) {
                          uploadTransactions();
                        }
                      }}
                    >
                      {" "}
                      {uploadingTransaction ? (
                        <i class="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        <p>
                          <i class="fa-solid fa-cloud-arrow-up"></i> Upload
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="deposit-select-container">
                  <div className="left">
                    <p className="dash-header">Choose Wallet to Fund</p>

                    <select className="wallettofundselect"
                      value={walletToFund}
                      onChange={(e) => {
                        setWalletToFund(e.target.value);
                        const TransactionID = generateTransactionID();
                        setTransactionID(TransactionID);
                        setwallettofundError("");
                       

                        if (amountToFund == 0) {
                          setAmountError("Please add Amount to fund");
                        }
                      }}
                    >
                      <option value="">Select wallet</option>
                      {loggedUserWallets.map((wallet) => (
                        <option key={wallet.id} value={wallet.id} >
                          {wallet.type}
                        </option>
                      ))}
                    </select>

                    <p className="dash-header">Choose Payment Method</p>
                    <ul>
                      <li
                        className="dashboardbutton"
                        onClick={() => {
                          if (walletToFund == "") {
                            setwallettofundError("Please select a wallet");
                          } else {
                            setSelectedPaymentMethod("Manual");
                          }
                        }}
                      >
                        {" "}
                        Manual Payment
                      </li>
                      <li
                        className="dashboardbutton"
                        onClick={() => {
                          if (walletToFund == "") {
                            setwallettofundError("Please select a wallet");
                          } else {
                            setSelectedPaymentMethod("Card");
                          }
                        }}
                      >
                        Card Payment
                      </li>
                      <li
                        className="dashboardbutton"
                        onClick={() => {
                          if (walletToFund == "") {
                            setwallettofundError("Please select a wallet");
                          } else {
                            setSelectedPaymentMethod("Bank");
                          }
                        }}
                      >
                        Bank Transfer
                      </li>
                    </ul>
                  </div>
                  <div className="right">
                    {amountError && (
                      <div className="form-error-container ">
                        <i class="fa-solid fa-circle-info"></i>
                        <p>{amountError}</p>
                      </div>
                    )}

                    {walletToFundError && (
                      <div className="form-error-container ">
                        <i class="fa-solid fa-circle-info"></i>
                        <p>{walletToFundError}</p>
                      </div>
                    )}
                    <div>{SwitchDepositeOptin()}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="first-inner" data-aos="fade-up"data-aos-duration="1500">
            <p className="dash-header">Transaction Details</p>

            <div className="second-inner padded-div">
              <h3>Amount</h3>
              <p>${amountToFund}</p>
            </div>

            <div className="second-inner padded-div">
              <h3>Transaction ID</h3>
              <p>#{transactionID}</p>
            </div>

            <div className="second-inner padded-div">
              <h3>Payment Method</h3>
              <p>{paymentCurrency}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
