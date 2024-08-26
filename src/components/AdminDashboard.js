import React, { useEffect, useState } from "react";
import "../styles/AdminDashboard.css";
import axios from "axios";
import {
  baseurl,
  setCookie,
  getCookie,
  getUserTransactions,
  getuserInvestments,
} from "../utils/constants";
import Modal from "./Modal";
import { json } from "react-router-dom";
import { setUserdata } from "../redux/userdataSlice";

import AdminCollapsible from "./AdminCollapsible";
function AdminDashboard() {
  const [searchValue, setSearchValue] = useState("");
  const [allusers, setAllusers] = useState([]);
  const [allInvestments, setAllInvestments] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);

  const [searchedusers, setSearchUsers] = useState([]);
  const [showsearchresults, setshowsearchresults] = useState(false);
  const [addingfunds, setAddingFunds] = useState(false);
  const [userInputs, setUserInputs] = useState([]);
  const [sendingOTP, setSendingOTP] = useState(false);
  const [verifyingAccounnt, setVerifyingAccount] = useState(false);
  const [linkingAccounnt, setLinkingAccount] = useState(false);
  const [loadingingInvestment, setLoadingInvestments] = useState(false);
  const [approvingWithdrawl, setApprovingWithdrawal] = useState(false);
  const [approvingDeposit, setApprovingDeposit] = useState(false);
  const [disablingAccount, setDisablingAccount] = useState(false);

  const [confirmingKYC, setConfirmingKYC] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [loadingIRS, setLoadingIrs] = useState(false);

  function fromBase64(base64, filename) {
    return new Promise((resolve, reject) => {
      try {
        // Determine the MIME type from the base64 string
        const mimeType = base64.startsWith("/9j/") ? "image/jpeg" : "image/png";

        // Convert the base64 string to a binary string
        const binaryString = atob(base64);

        // Create a Uint8Array from the binary string
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Create a Blob from the Uint8Array
        const blob = new Blob([bytes], { type: mimeType });

        // Adjust the filename extension based on the MIME type
        const extension = mimeType.split("/")[1];
        const fullFilename = `${filename}.${extension}`;

        // Create a File from the Blob
        const file = new File([blob], fullFilename, { type: mimeType });

        resolve(file);
      } catch (error) {
        reject(error);
      }
    });
  }

  const handleOpenModal = async (imageSrc) => {
    const base64String = imageSrc;
    const filename = "Payment Screenshot";
    let file = await fromBase64(imageSrc, filename);
    console.log(file);

    setModalImage(
      <img
        src={`data:image/png;base64,${imageSrc}`}
        alt={`Screenshot`}
        style={{ width: "80%", height: "80%" }}
      />
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage("");
  };

  const handleInputChange = (index, event) => {
    const values = [...userInputs];
    values[index] = event.target.value;
    setUserInputs(values);
  };

  // useEffect(() => {
  //   async function getAllUsers() {
  //     const requestData = {
  //       requestTask: "getallUserData",
  //     };

  //     let Users = await axios.post(baseurl, requestData);
  //     console.log(Users.data)
  //     if ( Users && Array.isArray(Users.data)){
  //       setAllusers(Users.data);

  //       const requestData1 = {
  //         requestTask: "getAllInvestments",
  //       };

  //       let Investments = await axios.post(baseurl, requestData1);
  //       if (Array.isArray(Investments.data)){
  //         setAllInvestments(Investments.data);
  //         console.log(Investments.data)

  //       }

  //       const requestData2 = {
  //         requestTask: "getAllTransactions",
  //       };
  //       let Transactions = await axios.post(baseurl, requestData2);
  //       console.log("user tansactions",Transactions.data)
  //       if (Array.isArray(Transactions.data)){
  //         setAllTransactions(Transactions.data);}

  //     }
  //     else{
  //       alert("Could not retrive Data. Please check internet connection")
  //     }
  //   }

  //   getAllUsers();
  // }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const requestData = {
          requestTask: "getallUserData",
        };

        const requestData1 = {
          requestTask: "getAllInvestments",
        };

        const requestData2 = {
          requestTask: "getAllTransactions",
        };

        const [UsersResponse, InvestmentsResponse, TransactionsResponse] =
          await Promise.all([
            axios.post(baseurl, requestData),
            axios.post(baseurl, requestData1),
            axios.post(baseurl, requestData2),
          ]);

        if (UsersResponse && Array.isArray(UsersResponse.data)) {
          setAllusers(UsersResponse.data);
          console.log(UsersResponse.data);
        } else {
          throw new Error(
            "Could not retrieve Users data. Please check internet connection."
          );
        }

        if (Array.isArray(InvestmentsResponse.data)) {
          setAllInvestments(InvestmentsResponse.data);
          console.log(InvestmentsResponse.data);
        } else {
          throw new Error(
            "Could not retrieve Investments data. Please check internet connection."
          );
        }

        if (Array.isArray(TransactionsResponse.data)) {
          setAllTransactions(TransactionsResponse.data);
          console.log("user transactions", TransactionsResponse.data);
        } else {
          throw new Error(
            "Could not retrieve Transactions data. Please check internet connection."
          );
        }
      } catch (error) {
        alert(error.message);
      }
    }

    fetchData();
  }, []);

  function handleSearch() {
    let searchresult = allusers.filter((user) =>
      user.email.includes(searchValue)
    );
    setSearchUsers(searchresult);
    setshowsearchresults(true);
  }
  function generateOTP() {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var OTP = "";
    for (var i = 0; i < 8; i++) {
      OTP += chars[Math.floor(Math.random() * chars.length)];
    }
    return OTP;
  }

  async function addFunds(email, amount, username) {
    setAddingFunds(true);
    const requestData = {
      requestTask: "addfunds",
      email: email,
      amount: amount,
      firstName: username,
    };

    let result = await axios.post(baseurl, requestData);
    console.log(result.data);
    if (result.data !== "error" && Array.isArray(result.data)) {
      setAllusers(result.data);
      setAddingFunds(false);
    } else {
      console.log(result.data);
      alert("An error occured");
      setAddingFunds(false);
    }
  }

  async function sendOTP(email, username) {
    setSendingOTP(true);
    let OTP = generateOTP();
    const requestData = {
      requestTask: "sendBillingOTP",
      email: email,
      firstName: username,
      OTP: OTP,
    };

    let result = await axios.post(baseurl, requestData);
    console.log(result.data);

    if (result.data !== "error" && Array.isArray(result.data)) {
      setAllusers(result.data);
      setSendingOTP(false);
    } else {
      console.log(result.data);
      alert("An error occured");
      setSendingOTP(false);
    }
  }

  async function verifyAccount(email, username) {
    setVerifyingAccount(true);
    const requestData = {
      requestTask: "verifyAccount",
      email: email,
      firstName: username,
    };
    let result = await axios.post(baseurl, requestData);
    console.log(result.data);
    if (result.data !== "error" && Array.isArray(result.data)) {
      setAllusers(result.data);
      setVerifyingAccount(false);
    } else {
      console.log(result.data);
      alert("An error occured");
      setVerifyingAccount(false);
    }
  }
  async function LinkAccount(email, username) {
    setLinkingAccount(true);
    const requestData = {
      requestTask: "linkAccount",
      email: email,
      firstName: username,
    };
    let result = await axios.post(baseurl, requestData);
    console.log(result.data);
    if (result.data !== "error" && Array.isArray(result.data)) {
      setAllusers(result.data);
      setLinkingAccount(false);
    } else {
      console.log(result.data);
      alert("An error occured");
      setLinkingAccount(false);
    }
  }

  async function approveinvestment(investment, user) {
    setLoadingInvestments(true);
    const requestData = {
      requestTask: "approveInvestment",
      investmentID: investment.investmentID,
      investmentPlan: investment.plan,
      investmentAmount: investment.amount,
      firstName: user.firstName,
      investmentAmount: investment.amount,
      email: user.email,
    };
    console.log(requestData);

    let result = await axios.post(baseurl, requestData);
    console.log(result.data);
    if (Array.isArray(requestData.data)) {
      setAllInvestments(result.data[0]);
      setAllTransactions(result.data[1]);
      setLoadingInvestments(false);
      alert("Investment Approved Please refresh page");
    } else {
      console.log(result.data);
      //alert('An error occured. Please check internet connection')
      setLoadingInvestments(false);
    }
  }

  async function approveWithdrawal(transaction, user) {
    setApprovingWithdrawal(true);
    const requestData = {
      requestTask: "approvewithdrawal",
      transactionID: transaction.transactionID,
      firstName: user.firstName,
      email: user.email,
      amount: transaction.amount,
    };
    console.log(requestData);

    let result = await axios.post(baseurl, requestData);
    console.log(result.data);
    if (Array.isArray(result.data)) {
      setAllTransactions(result.data);
      setApprovingWithdrawal(false);
      alert("Withdrawal Approved Please refresh page");
    } else {
      console.log(result.data);
      //alert('An error occured. Please check internet connection')
      setApprovingWithdrawal(false);
    }
  }
  async function approveDeposit(transaction, user) {
    setApprovingDeposit(true);
    const requestData = {
      requestTask: "approvedeposit",
      tID: transaction.id,
      firstName: user.firstName,
      email: user.email,
      amount: transaction.Amount,
      wallet: transaction.wallet,
    };
    console.log(requestData);

    let result = await axios.post(baseurl, requestData);

    if (Array.isArray(result.data)) {
      const newRequest = {
        requestTask: "getAllTransactions",
      };

      let newtransactionslist = await axios.post(baseurl, newRequest);
      if (Array.isArray(newtransactionslist.data)) {
        setAllTransactions(result.data);
        setApprovingDeposit(false);
        alert("Transaction approved please refresh page");
      }
    } else {
      console.log(result.data);

      //alert('An error occured. Please check internet connection')
      setApprovingDeposit(false);
    }
  }

  async function confirmKYC(user) {
    setConfirmingKYC(true);

    let requestData = {
      requestTask: "confirmKYC",
      email: user.email,
      firstName: user.firstName,
    };

    const result = await axios.post(baseurl, requestData);
    console.log(result.data);
    if (result.data.trim() === "kycConfirmed") {
      const requestData = {
        requestTask: "getallUserData",
      };

      let Users = await axios.post(baseurl, requestData);
      console.log(Users.data);
      if (Users && Array.isArray(Users.data)) {
        setAllusers(Users.data);
      }
      setConfirmingKYC(false);
    }
  }
  async function confirmKYC(user) {
    setConfirmingKYC(true);

    let requestData = {
      requestTask: "confirmKYC",
      email: user.email,
      firstName: user.firstName,
    };

    const result = await axios.post(baseurl, requestData);
    console.log(result.data);
    if (result.data.trim() === "kycConfirmed") {
      const requestData = {
        requestTask: "getallUserData",
      };

      let Users = await axios.post(baseurl, requestData);
      console.log(Users.data);
      if (Users && Array.isArray(Users.data)) {
        setAllusers(Users.data);
      }
      setConfirmingKYC(false);
    }
  }

  async function confirmIRS(user) {
    setLoadingIrs(true);
    let requestData = {
      requestTask: "confirmIRS",
      email: user.email,
      firstName: user.firstName,
    };

    const result = await axios.post(baseurl, requestData);
    console.log(result.data);
    if (result.data.trim() === "irsConfirmed") {
      const requestData = {
        requestTask: "getallUserData",
      };

      let Users = await axios.post(baseurl, requestData);
      console.log(Users.data);
      if (Users && Array.isArray(Users.data)) {
        setAllusers(Users.data);
      }
      setLoadingIrs(false);
      alert("IRS Confirmed for this user");
    }
  }

  async function disableAccount(user) {
    setDisablingAccount(true);
    let requestData = {
      requestTask: "disableaccount",
      email: user.email,
    };

    const result = await axios.post(baseurl, requestData);
    console.log(result.data);
    if (result.data.trim() === "accountdisabled") {
      const requestData = {
        requestTask: "getallUserData",
      };

      let Users = await axios.post(baseurl, requestData);
      console.log(Users.data);
      if (Users && Array.isArray(Users.data)) {
        setAllusers(Users.data);
      }
      setDisablingAccount(false);
      alert("Account Disabled.");
    }
  }

  // function UserComponent({user, index}){

  //   return(
  //     <div className="funds-container">
  //       <h1 style={{fontSize:"20px"}}>{user.email}</h1>
  //       <button style={{backgroundColor:`${user.AccountStatus=="ACTIVE"? "blue":"grey"}`}}
  //       onClick={()=>{if(user.AccountStatus=="ACTIVE"){
  //         disableAccount(user);
  //       }
  //       }}>{disablingAccount? <i class="fa-solid fa-spinner fa-spin"></i>:"Disable User"}</button>
  //                     <details>
  //                       <summary>Controls</summary>

  //                       <div>
  //                         {user.KycStatus==2 && <button onClick={()=>{confirmKYC(user)}}>{confirmingKYC ? <i class="fa-solid fa-spinner fa-spin"></i> : "Confirm Kyc Status"}</button>}
  //                         {user.IRSACTIVATED=="FALSE" && <button onClick={()=>{confirmIRS(user)}}>{loadingIRS ? <i class="fa-solid fa-spinner fa-spin"></i> :"Activate IRS"}</button>}

  //                       </div>

  //                     </details>

  //                      {/* <details>
  //                       <summary>Investments</summary>
  //                       <div>
  //                         {
  //                         allInvestments.filter((investment)=>(investment.email == user.email)).map((investment)=>(
  //                           <div className="investment-card">
  //                             <p>Plan: {investment.plan}</p>
  //                             <p>Amount: {investment.amount}</p>
  //                            <div>
  //                            <p>Status: {investment.status}</p>
  //                            <p>Screenshot</p><button onClick={()=>{ handleOpenModal(investment.screenshot)}}>open</button>
  //                            </div>
  //                             <p>Payment Method: {investment.paymentmethod}</p>

  //                             {
  //                               investment.status=="PENDING"? (<button style={{width:"100%"}}
  //                               onClick={()=>{
  //                                     approveinvestment(investment, user)
  //                               }}
  //                               >{loadingingInvestment?(<i class="fa-solid fa-spinner fa-spin"></i>):("Approve Investment")}</button>):("")
  //                             }

  //                           </div>
  //                         ))
  //                         }
  //                       </div>
  //                      </details> */}

  //                      <details>
  //                       <summary>Transactions</summary>
  //                       <div>
  //                         {
  //                         allTransactions.filter((transaction)=>(transaction.email == user.email)).map((transaction)=>(
  //                           <div className="investment-card">
  //                             <p>ID: {transaction.transactionID}</p>
  //                             <p>Amount: ${transaction.Amount}</p>
  //                             <p>Type: {transaction.type}</p>
  //                             <p>Date:  {transaction.date}</p>
  //                             <p>Status: {transaction.status}</p>
  //                             <p>Screenshot</p><button onClick={()=>{ handleOpenModal(transaction.screenshot)}}>open</button>

  //                             {
  //                               transaction.type=="DEPOSIT"&&transaction.status=="PENDING"? (<button style={{width:"100%"}}
  //                               onClick={()=>{
  //                                      approveDeposit(transaction, user)
  //                               }}
  //                               >
  //                                 {approvingDeposit?(<i class="fa-solid fa-spinner fa-spin"></i>):("Approve Deposit")}
  //                               </button>):("")
  //                             }
  //                             {
  //                               transaction.transactiontype=="WITHDRAWAL"&&transaction.status=="PENDING"? (<button style={{width:"100%"}}
  //                               onClick={()=>{
  //                                     approveWithdrawal(transaction, user)
  //                               }}
  //                               >
  //                                 {approvingWithdrawl?(<i class="fa-solid fa-spinner fa-spin"></i>):("Approve Withdrawal")}
  //                               </button>):("")
  //                             }

  //                           </div>
  //                         ))
  //                         }
  //                       </div>
  //                      </details>

  //                       <details>
  //                         <summary>More Details</summary>
  //                         <div className="details-container">
  //                           <p>
  //                             <b>First Name: </b>
  //                             {user.firstName}
  //                           </p>
  //                           <p>
  //                             <b>Last Name: </b>
  //                             {user.lastName}
  //                           </p>
  //                           <p>
  //                             <b>Status: </b>
  //                             {user.AccountStatus}
  //                           </p>

  //                           <p>
  //                             <b>Address: </b>
  //                             {user.useraddress}
  //                           </p>
  //                           <p>
  //                             <b>Country: </b>
  //                             {user.country}
  //                           </p>
  //                           <p>
  //                             <b>LicenseActivated: </b>
  //                             {user.LicenseActivated}
  //                           </p>
  //                           <p>
  //                             <b>IRSACTIVATED </b>
  //                             {user.IRSACTIVATED}
  //                           </p>

  //                         </div>
  //                       </details>
  //                     </div>
  //   )

  // }

  function UserComponent({ user, index }) {
    const [showUserTransactions, setShowUserTransactions] = useState(false);
    return (
      <div className="funds-container">
        <h1 style={{ fontSize: "20px" }}>{user.email}</h1>
        <button
          style={{
            backgroundColor: user.AccountStatus === "ACTIVE" ? "blue" : "grey",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "5px",
            cursor: user.AccountStatus === "ACTIVE" ? "pointer" : "not-allowed",
          }}
          onClick={() => {
            if (user.AccountStatus === "ACTIVE") {
              disableAccount(user);
            }
          }}
          disabled={user.AccountStatus !== "ACTIVE" || disablingAccount}
        >
          {disablingAccount ? (
            <i class="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Disable User"
          )}
        </button>

        <AdminCollapsible title="Controls">
          {user.KycStatus === 2 && (
            <button
              onClick={() => confirmKYC(user)}
              disabled={confirmingKYC}
              style={{ marginRight: "1rem", padding: "0.5rem 1rem" }}
            >
              {confirmingKYC ? (
                <i class="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Confirm KYC Status"
              )}
            </button>
          )}
          {user.IRSACTIVATED === "FALSE" && (
            <button
              onClick={() => confirmIRS(user)}
              disabled={loadingIRS}
              style={{ padding: "0.5rem 1rem" }}
            >
              {loadingIRS ? (
                <i class="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Activate IRS"
              )}
            </button>
          )}
        </AdminCollapsible>

        <button
          onClick={() => {
            setShowUserTransactions(!showUserTransactions);
          }}
        >
          Show Transactions
        </button>
        {showUserTransactions && (
          <div className="userTransationList">
            {allTransactions
              .filter((transaction) => transaction.email === user.email)
              .map((transaction) => (
                <div
                  className="investment-card"
                  key={transaction.transactionID}
                >
                  <p>
                    <strong>ID:</strong> {transaction.transactionID}
                  </p>
                  <p>
                    <strong>Amount:</strong> ${transaction.Amount}
                  </p>
                  <p>
                    <strong>Type:</strong> {transaction.type}
                  </p>
                  <p>
                    <strong>Date:</strong> {transaction.date}
                  </p>
                  <p>
                    <strong>Status:</strong> {transaction.status}
                  </p>
                  <p>
                    <strong>Screenshot:</strong>
                  </p>
                  <button
                    onClick={() => handleOpenModal(transaction.screenshot)}
                  >
                    Open
                  </button>

                  {transaction.type === "DEPOSIT" &&
                    transaction.status === "PENDING" && (
                      <button
                        style={{ width: "100%", marginTop: "0.5rem" }}
                        onClick={() => approveDeposit(transaction, user)}
                        disabled={approvingDeposit}
                      >
                        {approvingDeposit ? (
                          <i class="fa-solid fa-spinner fa-spin"></i>
                        ) : (
                          "Approve Deposit"
                        )}
                      </button>
                    )}
                  {/* {transaction.type === 'WITHDRAWAL' && transaction.status === 'PENDING' && (
                  <button
                    style={{ width: '100%', marginTop: '0.5rem' }}
                    onClick={() => approveWithdrawal(transaction, user)}
                    disabled={approvingWithdrawal}
                  >
                    {approvingWithdrawal ? <i class="fa-solid fa-spinner fa-spin"></i> : 'Approve Withdrawal'}
                  </button> 
                )} */}
                </div>
              ))}
          </div>
        )}

        <AdminCollapsible title="More Details">
          <div className="details-container">
            <p>
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p>
              <strong>Status:</strong> {user.AccountStatus}
            </p>
            <p>
              <strong>Address:</strong> {user.useraddress}
            </p>
            <p>
              <strong>Country:</strong> {user.country}
            </p>
            <p>
              <strong>License Activated:</strong> {user.LicenseActivated}
            </p>
            <p>
              <strong>IRS Activated:</strong> {user.IRSACTIVATED}
            </p>
          </div>
        </AdminCollapsible>
      </div>
    );
  }

  // return (
  //   <div className="admin-dashboard">
  //     <div className="admin-dashboard-wrapper">
  //       <div className="search-div">
  //         <input
  //           type="text"
  //           placeholder="search-email"
  //           value={searchValue}
  //           onChange={(e) => {
  //             setSearchValue(e.target.value);
  //           }}
  //           style={{ color: "green" }}
  //         />
  //         {showsearchresults ? (
  //           <i
  //             class="fa-solid fa-xmark search-button"
  //             onClick={() => {
  //               setSearchValue("");
  //               setshowsearchresults(false);
  //             }}
  //           ></i>
  //         ) : (
  //           <i
  //             class="fa-solid fa-magnifying-glass search-button"
  //             onClick={() => {
  //               handleSearch();
  //             }}
  //           ></i>
  //         )}
  //       </div>

  //       {allusers.length > 0 ? (
  //         <div>
  //           {showsearchresults ? (
  //             searchedusers.map((user, index) => (
  //               <div className="user-container">
  //                 <div key={index}>
  //                   <UserComponent user={user} index={index} />
  //                 </div>
  //               </div>
  //             ))
  //           ) : (
  //             <div className="user-container">
  //               {allusers.length > 0 ? (
  //                 allusers.map((user) => (
  //                   <div key={user.id}>
  //                     {" "}
  //                     {/* Use unique user ID */}
  //                     <UserComponent user={user} />
  //                   </div>
  //                 ))
  //               ) : (
  //                 <div>Loading...</div>
  //               )}
  //             </div>
  //           )}
  //         </div>
  //       ) : (
  //         <div>Loading...</div>
  //       )}
  //     </div>
  //     <Modal
  //       show={showModal}
  //       onClose={handleCloseModal}
  //       imageSrc={modalImage}
  //     />
  //   </div>
  // );

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-wrapper">
        <div className="search-div">
          <input
            type="text"
            placeholder="search-email"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ color: "green" }}
          />
          {showsearchresults ? (
            <i
              className="fa-solid fa-xmark search-button"
              onClick={() => {
                setSearchValue("");
                setshowsearchresults(false);
              }}
            ></i>
          ) : (
            <i
              className="fa-solid fa-magnifying-glass search-button"
              onClick={handleSearch}
            ></i>
          )}
        </div>

        {allusers.length > 0 ? (
          <div>
            {showsearchresults ? (
              <div className="user-container">
                {searchedusers.map((user) => (
                  <UserComponent key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <div className="user-container">
                {allusers.map((user) => (
                  <UserComponent key={user.id} user={user} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <i
              class="fa-solid fa-spinner fa-spin"
              style={{ fontSize: "30px" }}
            ></i>
            <p>Loading Data</p>
          </div>
        )}
      </div>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        imageSrc={modalImage}
      />
    </div>
  );
}

export default AdminDashboard;
