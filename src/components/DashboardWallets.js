import React, { useState, useEffect } from "react";
import "../styles/DashboardWallets.css";
import defaultUserImge from "../images/wallets.png";
import bitcoinIcon from "../images/bitcoin.png";
import ethereumIcon from "../images/ethereum.png";
import tetherIcon from "../images/tether.png";
import litecoinIcon from "../images/litecoin.png";
import usdIcon from "../images/usd.png";
import CryptoMarket from "./CryptoMarket";
import CryptoPrices from "./CryptoPrices";
import axios from "axios";


import {
  baseurl,
  getBitcoinPrice,
  getEthereumPrice,
  getLitecoinPrice,
  getUSDPrice,
  setCookie,
  getUserTransactions,
  getuserInvestments,
  getUserWallets,
} from "../utils/constants";

import { useDispatch, useSelector } from "react-redux";

import {
  setUserWallets,
  clearUserWallets,
  addUserWallet,
  removeUserWallet,
} from "../redux/userWalletSlice";
import WalletsEditor from "./WalletsEditor";

function DashboardWallets({fundWalletRef,withdrawalRef, setShowMobileMenu}) {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.userdata);
  const totalEarnings = useSelector((state) => state.userUtils.totalProfits)

  const [loadingDashboardWallets, setLoadingDashboardWallets] = useState(false);
  const accountBalance = useSelector((state) => state.userUtils.accountBalance);
  const [userWalletData, setUserWalletsData] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);

  const initialCryptoData = [
    { icon: usdIcon, name: "USD", symbol: "USD" },
    { icon: bitcoinIcon, name: "Bitcoin", symbol: "BTC" },
    { icon: ethereumIcon, name: "Ethereum", symbol: "ETH" },
    { icon: tetherIcon, name: "Tether US", symbol: "USDT" },
    { icon: litecoinIcon, name: "Litecoin", symbol: "LTC" },
  ];

  function roundToDecimalPlaces(num, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
}

  useEffect(() => {
    setLoadingDashboardWallets(true);
    const fetchUserWallets = async () => {
      try {
        const userWallets = await getUserWallets(userdata.email);
        dispatch(setUserWallets(userWallets));
        setUserWalletsData(userWallets);

        const enrichedCryptoData = initialCryptoData.map((crypto) => {
          const wallet = userWallets.find(
            (wallet) => wallet.type === crypto.symbol
          );
          return {
            ...crypto,
            id: wallet ? wallet.id : -1,
            value: wallet ? wallet.value : 0,
            address: wallet ? wallet.address : "please add address",
          };
        });

        setCryptoData(enrichedCryptoData);

        console.log("user Wallets: ", userWallets);
      } catch (error) {
        console.error("Error fetching user wallets: ", error);
      }
    };

    fetchUserWallets();
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      let btcprice = await getBitcoinPrice();
      let ethprice = await getEthereumPrice();
      let ltcprice = await getLitecoinPrice();
      console.log("BTC Price",btcprice)
      console.log("ETH Price",ethprice)
      console.log("LTC Price",ltcprice)

      setLiveBitcoinPrice(btcprice);
      setLiveEtheriumPrice(ethprice);
      setLiveLitecoinPrice(ltcprice);
    };

    const intervalId = setInterval(fetchPrices, 10000);

    // Initial fetch
    fetchPrices();

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

 

 let coinmarketcapApi ="5199f68a-c9c8-4e8c-8c54-caa856ed6bdc"

  

  
 const [deviceWidth, setDeviceWidth] = useState(window.innerWidth); 

  const [liveBitcoinPrice, setLiveBitcoinPrice] = useState(null);
  const [liveEtheriumPrice, setLiveEtheriumPrice] = useState(null);
  const [liveLitecoinPrice, setLiveLitecoinPrice] = useState(null);

  return (
    <div className="DashboardWallets">
     <div className="first-inner" data-aos="fade-up"data-aos-duration="1500"> 
        <div className="user-data-continer">
          <div className="left">
            <img src={defaultUserImge} alt="" />
          </div>
          <div className="right">
            <div>
              <p>{userdata.firstName}</p>
              <p>{userdata.email}</p>
              <p>Support Id: {userdata.referalcode}</p>
            </div>
          </div>
        </div>
        <div className="account-detail-container">
          <div className="second-inner">
            <p>Account Balance</p>
            <p className="amountLabel">$ {accountBalance}</p>
          </div>
          <div className="second-inner">
            <p>Total Profits</p>
            <p className="amountLabel">${totalEarnings.toLocaleString()}</p>
          </div>
        </div>
      </div> 

      <div className="first-inner" data-aos="fade-up"data-aos-duration="1500">
        <div className=" walletactions">
          <div className="second-inner">
            <i class="fa-solid fa-circle-dollar-to-slot"></i>
            <p> Fund wallet</p>
            <div className="dashboardbutton"  onClick={()=>{
                  fundWalletRef.current.click();
                  if (deviceWidth<800){
                    setShowMobileMenu(false)
                  }
                 }}>Proceed</div>
          </div>
          <div className="second-inner">
            <i class="fa-solid fa-money-bill-transfer"></i>
            <p> Withdraw</p>
            <div className="dashboardbutton" onClick={()=>{
                  withdrawalRef.current.click();
                  if (deviceWidth<800){
                    setShowMobileMenu(false)
                  }
                 }}>Proceed</div>
          </div>
        </div>
      </div>

      {/* <WalletsEditor cryptoData={cryptoData} userdata={userdata} /> */}

      <div className="first-inner" data-aos="fade-up"data-aos-duration="1500">
        <div className="crypto-list walletscroll">
        
          {cryptoData.map((crypto, index) => (
            <div className="second-inner walletBalances" data-aos="fade-up"data-aos-duration="2000">
              <div key={index} className="crypto-card">
                <div className="crypto-info">
                  <img
                    src={crypto.icon}
                    alt={`${crypto.name} icon`}
                    className="crypto-icon"
                  />
                  <span>
                    {crypto.name} ({crypto.symbol})
                  </span>
                </div>
              </div>
              <p>
                {crypto.value} {crypto.symbol}{" "}
              </p>
              <p> $ 
                {(() => {
                  switch (crypto.symbol) {
                    case "BTC":
                      return roundToDecimalPlaces(crypto.value * liveBitcoinPrice, 4);
                    case "ETH":
                      return  roundToDecimalPlaces(crypto.value * liveEtheriumPrice,4);
                    case "LTC":
                      return roundToDecimalPlaces(crypto.value * liveLitecoinPrice, 4);
                    default:
                      return crypto.value;
                  }
                })()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="first-inner" data-aos="fade-up"data-aos-duration="1500">{ <CryptoPrices/> }</div>
    </div>
  );
}

export default DashboardWallets;
