import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Dashboard.css'
import DashboardHome from '../DashboardHome';
import DashboardBankTransfers from '../DashboardBankTransfers';
import DashboardCryptoTransfers from '../DashboardCryptoTransfers';
import DashboardTransactions from '../DashboardTransactions';
import DashboardLoans from '../DashboardLoans';
import DashboardProfileSetting from '../DashboardProfileSetting';
import DashboardInvestments from '../DashboardInvestments';
import { baseurl, setCookie, getCookie, getAccountBalance } from "../../utils/constants";
import DashboardWithdrawals from '../DashboardWithdrawals';
import FundDeposit from '../FundDeposit';
import { useSelector, useDispatch } from "react-redux";
import { setAccountBalance } from '../../redux/userUtilsSlice';

import AOS from 'aos';

import 'aos/dist/aos.css'; // Import AOS CSS
import Overview from '../Overview';
import DashboardWallets from '../DashboardWallets';

function Dashboard() {
  const dispatch =useDispatch()
  const loggedUserdata = useSelector((state) => state.userdata);
  const accountBalance = useSelector((state) => state.userUtils.accountBalance);


  const fundWalletRef=useRef();
  const withdrawalRef = useRef();
  const profileSettingsRef= useRef();



  useEffect(() => {
    AOS.init(); // Initialize AOS library
  }, []);
 
  const [selectedTab, setSelectedTab] = useState('Dashboard');
  const [showMenuText, setShowMenuText] = useState(true);
  const [showMobileMenu, setShowMobileMenu]=useState(false)
  const [tabLabel, setTabLabel]=useState("");
  const [userData, setUserData]= useState({});
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [loadingAccountBalance, setLoadingAccountBalance]= useState(false)
  // const [accountBalance, setAccoutBalance]= useState(false)

  // Function to handle tab click
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
    setTabLabel(tabName);
    if (deviceWidth<768){
        setShowMobileMenu(!showMobileMenu)
        setShowMenuText(true)
     
    }
  };

  function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth); 
  useEffect(() => {
      const handleResize = () => {
        setDeviceWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(() => {
      setLoadingUserData(true)
      // Function to check if the cookie exists
      const checkCookie = () => {
        if (document.cookie.indexOf('usersession') !== -1) {
          let uData = getCookie('userData');

          setUserData(JSON.parse(uData));
          setLoadingUserData(false)
         
        } else {
          window.location.assign("/login")
        }
      };
  
      // Initial check when component mounts
      checkCookie();
  
     
      
    }, []);




  // Function to render tab content based on selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Dashboard':
        return <DashboardHome fundWalletRef={fundWalletRef} withdrawalRef={withdrawalRef} setShowMobileMenu={  setShowMobileMenu } profileSettingsRef={profileSettingsRef} />;
      case 'Overview':
        return <Overview/>;
      case 'FundDeposit':
        
        return <FundDeposit/>;
      case 'Investments':
      
        return <DashboardInvestments/>;
      case 'Withdrawals':
       
        return <DashboardWithdrawals/>;
      case 'Transactions':
       
        return <DashboardTransactions/> ;
      case 'Wallets':
       
        return <DashboardWallets fundWalletRef={fundWalletRef} withdrawalRef={withdrawalRef} setShowMobileMenu={  setShowMobileMenu } />;
      case 'Loans':
       
        return <DashboardLoans/>;
      case 'Profile Settings':
      
        return <DashboardProfileSetting/>;
      default:
        return null;
    }
  };


  const [showModal, setShowModal] = useState(false);

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
    <div className='Dashboard'>
    
      <div className={deviceWidth>768?"DashboardMenu": showMobileMenu ? "MobileMenu":"DashboardMenu"}>
        <p>Menu</p>
        <div className='menu-balance'>
          <p>Account Balance</p>
          <h3>{loadingAccountBalance ? <i class="fa-solid fa-spinner fa-spin"></i>:`$ ${accountBalance}`}</h3>
        </div>
        <ul>
          <li className={selectedTab === 'Dashboard' ? 'selected' : ''} onClick={() => handleTabClick('Dashboard')}>
            <i className="fa-solid fa-house"></i>
            <p>{showMenuText ? "Dashboard" : ''}</p>
          </li>
          <li className={selectedTab === 'Overview' ? 'selected' : ''} onClick={() => handleTabClick('Overview')}>
          <i class="fa-solid fa-square-poll-vertical"></i>
            <p>{showMenuText ? "Overview" : ''}</p>
          </li>
          <li ref = {fundWalletRef} className={selectedTab === 'FundDeposit' ? 'selected' : ''} onClick={() => handleTabClick('FundDeposit')}>
          <i class="fa-solid fa-money-check-dollar"></i>
            <p>{showMenuText ? "Deposit Funds" : ''}</p>
          </li>
          <li className={selectedTab === 'Investments' ? 'selected' : ''} onClick={() => handleTabClick('Investments')}>
          <i class="fa-solid fa-money-bill-trend-up"></i>
            <p> {showMenuText ? "Investments" : ''}</p>
          </li>
          <li ref={withdrawalRef} className={selectedTab === 'Withdrawals' ? 'selected' : ''} onClick={() => handleTabClick('Withdrawals')}>
          <i class="fa-solid fa-money-bill-transfer"></i>
            <p>{showMenuText ? "Widthdrawals" : ''}</p>
          </li>
          <li className={selectedTab === 'Wallets' ? 'selected' : ''} onClick={() => handleTabClick('Wallets')}>
          <i class="fa-solid fa-wallet"></i>
            <p>{showMenuText ? "Wallets" : ''}</p>
          </li>
          <li className={selectedTab === 'Transactions' ? 'selected' : ''} onClick={() => handleTabClick('Transactions')}>
            <i className="fa-regular fa-rectangle-list"></i>
            <p>  {showMenuText ? "Transactions" : ''}</p>
          </li>
         
          <li ref={profileSettingsRef} className={selectedTab === 'Profile Settings' ? 'selected' : ''} onClick={() => handleTabClick('Profile Settings')}>
          <i class="fa-solid fa-user-gear"></i>
            <p> {showMenuText ? "Settings" : ''}</p>
          </li>
        </ul>

        <div className='logout-button' onClick={()=>{
          deleteCookie("usersession");
          deleteCookie("userData");
          window.location.assign("/")
        }} style={{fontSize:"30px", display:'flex', justifyContent:"center"}}>
        <p ></p>
        <i class="fa-solid fa-power-off"></i>
        </div> 
        
      </div>
      <div className='DashboardMenu-Tab'>
        <div className='menu-toggle' onClick={() => { deviceWidth>768?setShowMenuText(!showMenuText): setShowMobileMenu(!showMobileMenu)&& setShowMenuText(true) }}>
          <i className="fa-solid fa-bars"></i>    <p>{tabLabel}</p>
         
        </div>
     
        
        
        {
          loadingUserData ? (<i class="fa-solid fa-spinner fa-spin dashboardTabLoading"></i>): (<>{renderTabContent()}</>)
        }


        
      </div>
    </div>
  );
}

export default Dashboard;
