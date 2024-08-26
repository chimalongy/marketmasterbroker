import React, { useEffect, useState } from 'react'
import "../styles/DashboardTransactions.css"
import { baseurl, setCookie, getCookie } from "../utils/constants";
import axios from 'axios';

function DashboardTransactions() {
  const [userTransactions, setUserTransactions]= useState([])
  const [loadingTrasactions, setLoadingTranscations]= useState(false)
  useEffect(() => {
    setLoadingTranscations(true);

    async function fetchData() {
      try {
        const user = getCookie("usersession");
        const requestData = {
          requestTask: "getUserTransactions",
          email: user,
        };
        const result = await axios.post(baseurl, requestData);
        if (Array.isArray(result.data)) {
          setUserTransactions(result.data)
          setLoadingTranscations(false)
          console.log("TRANSACTIONS", result.data);
        }
      } catch (error) {
        alert("Poor internet connection!!!");
        // Handle errors here, e.g., log them or set an error state.
        console.error("Error fetching user data:", error);
      } finally {
        setLoadingTranscations(false);
      }
    }

    fetchData();
  }, []);
  return (
    <div className='DashboardTransactions'>
        {loadingTrasactions?(<i class="fa-solid fa-spinner fa-spin dashboardTabLoading"></i>):
        (
          <div>
              {
                userTransactions.length==0 ? (
                <div>
                  <p>No Transaction</p>
                </div>)
                :
                (
                  <div className='transaction-item'>
                    {
                      userTransactions.map((transaction, index)=>(
                        <div className='second-inner' key={index}data-aos="slide-up">
                         <div  style={{
                          display:'flex',
                          justifyContent:'space-between',
                         }}>
                         <h1 style={{  color:`${transaction.type=="DEPOSIT"?"green":"red"}`}}>{transaction.type}</h1>
                          <p style={{ fontWeight:'bold', color:"green"}}>{`${transaction.type=="DEPOSIT"? "+":"-"} ${transaction.paymentCurrency} ${Number(transaction.Amount).toFixed(3)}`}</p>
                         </div>

                         <p>{transaction.transactionID	}</p>
                          <p className='little-description'><b>{transaction.status}</b></p>
                          <p>{transaction.date}</p>
                        </div>
                      ))

                      
                    }
                  </div>
                )
              }

          </div>
        )}
    </div>
  )
}

export default DashboardTransactions