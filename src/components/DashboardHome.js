import React, { useEffect } from "react";
import "../styles/DashboardHome.css";
import homebkg from "../images/desk.png";
// import DashboardCard from "./DashboardHomeCard";
import {
  baseurl,
  setCookie,
  getCookie,
  getInvestmentDetails,
  getAccountBalance,
} from "../utils/constants";

import axios from "axios";
import { useState } from "react";

import Markets from "./Markets";
import CryptoMarket from "./CryptoMarket";
import FXPricingWidget from "./FXPricingWidget";
import PreciousMetalWidget from "./PreciousMetalWidget";
import StockMarketWidget from "./StockMarketWidget";

import welcomeimage from "../images/welcomeimage.jpg";
import kycImage from "../images/kyc.jpg";
import supportImage from "../images/support.jpg";
import referImage from "../images/refer.jpg";

import { useDispatch, useSelector } from "react-redux";
import { setAccountBalance, setTotalProfits } from '../redux/userUtilsSlice';

function DashboardHome({fundWalletRef,withdrawalRef, setShowMobileMenu, profileSettingsRef}) {
  const dispatch = useDispatch()
  const loggedUserdata = useSelector((state) => state.userdata);
  const accountBalance = useSelector((state) => state.userUtils.accountBalance);
  const loggedUserTransactions = useSelector((state) => state.userTransactions);
  const loggedUserInvestments = useSelector((state) => state.userInvestments);
  const loggedUserWallet = useSelector((state) => state.userWallets);

  const [loadingUserData, setLoadingUserData] = useState(false);
  const [userData, setUserData] = useState({});
  const [userTransactions, setUserTransactions] = useState([]);
  const [userInvestments, setuserInvestments] = useState([]);

  const [userAccountBalance, setUserAccountBalance] = useState(0);
  const [Investments, setInvestments] = useState(0);
  const [Profits, setProfits] = useState(0);
  const [Withdrawalable, setWithdrawalable] = useState(0);

  const [loadingAccountBalance, setLoadingAccountBalance]= useState(false)
  // const [accountBalance, setAccoutBalance]= useState(false)

  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth); 
 

  useEffect(() => {
    //   setLoadingUserData(true);
    //   async function fetchData() {
    //     try {
    //       const user = getCookie("usersession");
    //       const requestData = {
    //         requestTask: "getLoginData",
    //         email: user,
    //       };
    //       const result = await axios.post(baseurl, requestData);
    //       if (result && result.data) {
    //         setUserData(result.data);
    //         console.log("User Data is", result.data);
    //       }
    //     } catch (error) {
    //       // Handle errors here, e.g., log them or set an error state.
    //       console.error("Error fetching user data:", error);
    //       alert("Poor internet connection!!!");
    //     } finally {
    //       const user = getCookie("usersession");
    //       const requestData = {
    //         requestTask: "getUserTransactions",
    //         email: user,
    //       };
    //       const result = await axios.post(baseurl, requestData);
    //       console.log("User transactions is", result.data);
    //       setUserTransactions(result.data);
    //       const requestData2 = {
    //         requestTask: "getuserinvestments",
    //         email: user,
    //       };
    //       const result2 = await axios.post(baseurl, requestData2);
    //       console.log("User investments is", result2.data);
    // if (result2.data && Array.isArray(result2.data)) {
    //   let accountbalance = 0;
    //   let totalInvestments = 0;
    //   let totalProfits = 0;
    //   let WithdrawalableFunds = 0;
    //   let userInvestments = result2.data;
    //  for (let i = 0; i < userInvestments.length; i++) {
    //      let investment = userInvestments[i];
    //        let completeUserInvestment = getInvestmentDetails(investment);
    //                 if (completeUserInvestment.status == "RUNNING") {
    //                   accountbalance +=
    //                     Number(completeUserInvestment.amount) +
    //                     Number(completeUserInvestment.accumulatedEarnings);
    //                   totalInvestments += Number(completeUserInvestment.amount);
    //                   totalProfits += Number(
    //                     completeUserInvestment.accumulatedEarnings
    //                   );
    //                 }
    //                 else if (completeUserInvestment.status == "COMPLETED"){
    //                   accountbalance +=
    //                   Number(completeUserInvestment.amount) +
    //                   Number(completeUserInvestment.accumulatedEarnings);
    //                   totalInvestments += Number(completeUserInvestment.amount);
    //                   totalProfits += Number(
    //                     completeUserInvestment.accumulatedEarnings
    //                   );
    //                   WithdrawalableFunds +=Number(completeUserInvestment.amount)+
    //                   Number(completeUserInvestment.accumulatedEarnings);
    //                 }
    //                 else if (completeUserInvestment.status == "BIT"){
    //                   accountbalance +=
    //                   Number(completeUserInvestment.accumulatedEarnings);
    //                   totalInvestments += 0;
    //                   totalProfits += 0;
    //                   WithdrawalableFunds += Number(completeUserInvestment.accumulatedEarnings);
    //                 }
    //     }
    //   setWithdrawalable(WithdrawalableFunds);
    //   setProfits(totalProfits);
    //   setInvestments(totalInvestments);
    //   setuserInvestments(userInvestments);
    //   setUserAccountBalance(accountbalance);
    //   //HERE
    // }
    //       setLoadingUserData(false);
    //     }
    //   }
    //   fetchData();
  }, []);

  // useEffect(() => {
  //   console.log("USER DATA", loggedUserdata);
  //   console.log("USER TRANSACTIONS", loggedUserTransactions);
  //   console.log("USER INVESTMENTS", loggedUserInvestments);

  //   setUserData(loggedUserdata);
  //   setUserTransactions(loggedUserTransactions);

  //   let accountbalance = 0;
  //   let totalInvestments = 0;
  //   let totalProfits = 0;
  //   let WithdrawalableFunds = 0;

  //   let userInvestments = loggedUserInvestments;

  //   for (let i = 0; i < userInvestments.length; i++) {
  //     let investment = userInvestments[i];

  //     let completeUserInvestment = getInvestmentDetails(investment);
  //     if (completeUserInvestment.status == "RUNNING") {
  //       accountbalance +=
  //         Number(completeUserInvestment.amount) +
  //         Number(completeUserInvestment.accumulatedEarnings);
  //       totalInvestments += Number(completeUserInvestment.amount);
  //       totalProfits += Number(completeUserInvestment.accumulatedEarnings);
  //     } else if (completeUserInvestment.status == "COMPLETED") {
  //       accountbalance +=
  //         Number(completeUserInvestment.amount) +
  //         Number(completeUserInvestment.accumulatedEarnings);
  //       totalInvestments += Number(completeUserInvestment.amount);
  //       totalProfits += Number(completeUserInvestment.accumulatedEarnings);
  //       WithdrawalableFunds +=
  //         Number(completeUserInvestment.amount) +
  //         Number(completeUserInvestment.accumulatedEarnings);
  //     } else if (completeUserInvestment.status == "BIT") {
  //       accountbalance += Number(completeUserInvestment.accumulatedEarnings);
  //       totalInvestments += 0;
  //       totalProfits += 0;
  //       WithdrawalableFunds += Number(
  //         completeUserInvestment.accumulatedEarnings
  //       );
  //     }
  //   }
  //   setWithdrawalable(WithdrawalableFunds);
  //   setProfits(totalProfits);
  //   setInvestments(totalInvestments);
  //   setuserInvestments(userInvestments);
  //   setUserAccountBalance(accountbalance);
  // });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.livecoinwatch.com/static/lcw-widget.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

//   useEffect(()=>{
//     setLoadingAccountBalance(true)
//     async function getUserBalance(){
//       console.log(loggedUserdata.email)
//       let balance = await getAccountBalance(loggedUserdata.email);
//       setAccoutBalance((Number (balance.toFixed(2))).toLocaleString())
//       setLoadingAccountBalance(false)
//     }

//     getUserBalance();
// },[])


useEffect(()=>{
  setLoadingAccountBalance(true)
  async function getUserBalance(){
    console.log(loggedUserdata.email)
    let balance = await getAccountBalance(loggedUserdata.email);
   // setAccoutBalance((Number (balance.toFixed(2))).toLocaleString())
    dispatch(setAccountBalance((Number (balance.toFixed(2))).toLocaleString()));
    setLoadingAccountBalance(false)
  }

  getUserBalance();
},[])

  return (
    <div>
      {loadingUserData ? (
        <i class="fa-solid fa-spinner fa-spin dashboardTabLoading"></i>
      ) : (
        <div className="dashboard-home">
          <div className="dashboard-intro">
            <div className="welcome-div">
              <p data-aos="fade-in-up"data-aos-duration="2200" >
                Welcome to your trading dashboard <br /> {loggedUserdata.firstName}
              </p>
              <img src={welcomeimage} alt="" />
            </div>
          </div>

          <div className="first-inner"  data-aos="fade-in"data-aos-duration="1500" >
            <div className="welcome-balance" data-aos="fade-in-up"data-aos-duration="2400" >
              <div>
                <p>Total Balance:</p>
                <i class="fa-solid fa-eye"></i>
              </div>
              <p>{loadingAccountBalance ? <i class="fa-solid fa-spinner fa-spin"></i>:`$ ${accountBalance}`}</p>
           
            </div>

            <div className="welcome-withdrawal-button">
              <div
                className=" dashboardbutton "
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
                onClick={()=>{
                  fundWalletRef.current.click();
                  if (deviceWidth<800){
                    setShowMobileMenu(false)
                  }
                 }}
                 data-aos="fade-in-out"data-aos-duration="2600" 
              >
                <i class="fa-solid fa-money-bill"></i>
                Deposit
              </div>
              <div
                className=" dashboardbutton "
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
               onClick={()=>{
                withdrawalRef.current.click()
                if (deviceWidth<800){
                  setShowMobileMenu(false)
                }
               }}
               data-aos="fade-in-out"data-aos-duration="2600" 
               >
                <i class="fa-solid fa-file-invoice-dollar"></i>
                Withdraw
              </div>
            </div>
          </div>

          <div className="first-inner" data-aos="fade-in"data-aos-duration="1500">
            <div className="second-inner">
              <div className="dash-home-controls">
                <div>
                  <img src={supportImage} alt="" />
                  <p className="dash-header">
                    Encountering challenges? Reach out for support.
                  </p>
                  <p className="dash-description">
                    Open a ticket and receive a response in just a few minutes.
                  </p>
                  <div
                    className=" dashboardbutton "
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    onClick={() => { 
                      
                      profileSettingsRef.current.click() 
                      if (deviceWidth<800){
                        setShowMobileMenu(false)
                      }
                    }}
                  >
                   <i class="fa-solid fa-headset"></i>
                    Contact support
                  </div>
                </div>

                <div>
                  <img src={referImage} alt="" />
                  <p className="dash-header">Refer & Earn</p>
                  <p className="dash-description">
                    Invite your friends and earn 5% of every customer who
                    completes at least one deposit on the platform.
                  </p>
                  <div
                    className=" dashboardbutton "
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}

                   
                   onClick={() => { 
                    profileSettingsRef.current.click() 
                    if (deviceWidth<800){
                      setShowMobileMenu(false)
                    }
                  
                  }}
                  >
                    <i class="fa-solid fa-people-arrows"></i>
                    Share Your Link
                  </div>
                </div>

                

                {
                  loggedUserdata.KycStatus==0?(
                    
                     <div>
                  <img src={kycImage} alt="" />
                  <p className="dash-header">Complete KYC</p>
                  <p className="dash-description">
                    We kindly request you to submit the required form. If you
                    have any questions, feel free to contact our support team.
                  </p>
                  <div
                    className=" dashboardbutton "
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    onClick={() => { 
                      profileSettingsRef.current.click() 
                      if (deviceWidth<800){
                        setShowMobileMenu(false)
                      }
                    
                    }}
                  >
                    <i class="fa-solid fa-money-bill"></i>
                    Complete KYC
                  </div>
                </div> 
                  ):(<></>)
                }


              </div>
            </div>
          </div>

          <div className="first-inner" data-aos="fade-in"data-aos-duration="1500">
            <div
              className="livecoinwatch-widget-5"
              lcw-base="USD"
              lcw-color-tx="#999999"
              lcw-marquee-1="coins"
              lcw-marquee-2="movers"
              lcw-marquee-items="10"
              // data-aos="slide-right" data-aos-duration="6000" data-aos-delay="6000"
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardHome;
