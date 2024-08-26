import React, {useState, useEffect} from 'react'
import "../styles/Overview.css"
import TradingViewChart from '../styles/TradingViewChart'
import {
  baseurl,
  setCookie,
  getCookie,
  getInvestmentDetails,
  getAccountBalance,
  getTotalEarnings
} from "../utils/constants";
import { useSelector, useDispatch } from 'react-redux';
import { setAccountBalance, setTotalProfits } from '../redux/userUtilsSlice';


function Overview() {
  const dispatch= useDispatch()
  const loggedUserdata = useSelector((state) => state.userdata);
  const accountBalance = useSelector((state) => state.userUtils.accountBalance);
  const totalEarnings = useSelector((state) => state.userUtils.totalProfits)
 
  


  useEffect(()=>{
   
   

    async function getUserEarnings() {
     let earning=  await getTotalEarnings(loggedUserdata.email)
      
      dispatch(setTotalProfits(earning))
    }

    getUserEarnings()

   
},[])


  return (
    <div className='overview'>
         <div className="first-inner"data-aos="fade-up"data-aos-duration="1500">
        
         <div className='overview-container'>
            <div>
            <div className="welcome-balance">
              <div  data-aos="fade-up"data-aos-duration="2000" >
                <p>Regular Balance:</p>
              </div>
              {/* <p>{loadingAccountBalance ? <i class="fa-solid fa-spinner fa-spin"></i>:`$ ${accountBalance}`}</p> */}
           <p>${accountBalance}</p>
            </div>
            </div>
            <div data-aos="fade-up"data-aos-duration="2200">
            <div className="welcome-balance">
              <div>
                <p>Total Earnings:</p>
              </div>
              <p>${Number(totalEarnings).toFixed(2)}</p>
            </div>
            </div>
            <div data-aos="fade-up"data-aos-duration="2400">
            <div className="welcome-balance">
              <div >
                <p>Bonus:</p>
              </div>
              <p>$0.00</p>
            </div>
            </div>
            <div data-aos="fade-up"data-aos-duration="2600">
            <div className="welcome-balance">
              <div>
                <p>Total Withdrawal:</p>
              </div>
              <p>$0.00</p>
            </div>
            </div>
         </div>
            
          </div>

          <div className="first-inner" data-aos="fade-up"data-aos-duration="2000">
<TradingViewChart/>
          </div>



    </div>
  )
}

export default Overview