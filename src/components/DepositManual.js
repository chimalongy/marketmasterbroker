import React from "react";
import "../styles/DepositManual.css";
import bitcoinIcon from "../images/bitcoin.png";
import ethereumIcon from "../images/ethereum.png";
import tetherIcon from "../images/tether.png";
import litecoinIcon from "../images/litecoin.png";
import coinImage from "../images/coindeposit.png";
import { useState } from "react";
import QRCode from "react-qr-code";

export default function DepositManual({setpaymentsent,setPaymentCurrency}) {
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [selectedWalletAddress, setSelectedWalletAddress] = useState("");
  


  const cryptoData = [
    {
      icon: bitcoinIcon,
      name: "Bitcoin",
      symbol: "BTC",
      walletAddress: "bc1qxjrxfqkys5z6vzpkygpl8tpmgjfrpkgwhya0ut",
    },
    {
      icon: ethereumIcon,
      name: "Ethereum",
      symbol: "ETH",
      walletAddress: "0xa596E3Ff46E568634102Fc5F1a9090bD6601Ab45",
    },
    {
      icon: tetherIcon,
      name: "Tether US",
      symbol: "USDT",
      walletAddress: "TJYMkxeiUoAfvuyW4kNhnsLeGoLD3deou8",
    },
    {
      icon: litecoinIcon,
      name: "Litecoin",
      symbol: "LTC",
      walletAddress: "ltc1q7synfdzp4427yafu7a4sd30zaw8pz7avs22d9n",
    },
  ];

  const handleCheckboxChange = (name, walletAddress) => {
    setSelectedCrypto(name);
    setSelectedWalletAddress(walletAddress);
    setPaymentCurrency(name)

    console.log(name);
    console.log(walletAddress);
  };

  return (
    <div className="DepositManual">
      <p className="dash-header">Manual Deposit</p>

      <img src alt="" />

      <div>
        <div className="crypto-list">
          {cryptoData.map((crypto, index) => (
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
              <input
                type="checkbox"
                className="crypto-checkbox"
                checked={selectedCrypto === crypto.name}
                onChange={() =>
                  
                handleCheckboxChange(crypto.name, crypto.walletAddress)
                }
              />
            </div>
          ))}
        </div>

        {selectedCrypto && (
          <div className="qrContainer">
            <p>{selectedCrypto}</p>
            <QRCode value={selectedWalletAddress} fgColor="#74431b" />
            <p>{selectedWalletAddress}</p>
            <i class="fa-solid fa-copy address-copy" onClick= {async()=>{
              await navigator.clipboard.writeText(selectedWalletAddress);
            }}></i>

          </div>
        )}

        {selectedCrypto && (
          <div className="payment-made">
            <div className="dashboardbutton" onClick={()=>{setpaymentsent(true)}}>I have made payment</div>
          </div>
        )}
      </div>
    </div>
  );
}
