import React from "react";
import defaultUserImge from "../images/defaultuser.png";
import bitcoinIcon from "../images/bitcoin.png";
import ethereumIcon from "../images/ethereum.png";
import tetherIcon from "../images/tether.png";
import litecoinIcon from "../images/litecoin.png";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  baseurl,
  setCookie, 
  getCookie,
  getInvestmentDetails,
} from "../utils/constants";

import "../styles/WalletsEditor.css";

export default function WalletsEditor ({cryptoData, userdata}) {
  const [cryptoWithdrwalMethod, setCryptoWithdrwalMethod] = useState(true);
  const [savingWallet, setSavingWallet]= useState(false)

  // const initialData = [
  //   { coinType: "Bitcoin (BTC)", address: "xxxxxxxxxxxxxxxxxxxx", icon: bitcoinIcon },
  //   { coinType: "Ethereum (ETH)", address: "xxxxxxxxxxxxxxxxxxxx", icon: ethereumIcon },
  //   { coinType: "Tether (USDT)", address: "xxxxxxxxxxxxxxxxxxxx", icon: tetherIcon },
  //   { coinType: "Litecoin (LTC)", address: "xxxxxxxxxxxxxxxxxxxx", icon: litecoinIcon },
  // ];

  useEffect(() => {
    if (cryptoData && cryptoData.length > 0) {
      // Filter out items where name is "USD" and set the data
      const filteredData = cryptoData.filter(item => item.name !== "USD");
      setData(filteredData);
    }
  }, [cryptoData]);

  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditValue(data[index].address);
  };

  const handleSaveClick = async(index) => {
    if (validateAddress(editValue)) {
      // const newData = [...data];
      // newData[index].address = editValue;
      // setData(newData);
      // setEditIndex(-1);
      // setEditValue("");

      

      setSavingWallet(true)
      const requestData = {
        requestTask: "registerWallet",
        email:userdata.email,
        firstName:userdata.firstName,
        type: data[index].symbol,
        address: editValue,
        id:data[index].id
      };

      const result = await axios.post(baseurl, requestData)

      if (result.data=="walletsaved"){
        alert("Wallet saved")
        
      }
      else if(result.data=="walletupdated"){
        alert("Wallet Updated")
      }
      console.log(result.data)
      setSavingWallet(false)
      console.log(requestData)

    } else {
      alert("Invalid address format.");
    }
  };

  const handleCancelClick = () => {
    setEditIndex(-1);
    setEditValue("");
  };

  const validateAddress = (address) => {
    // Add your address validation logic here
    // For example, you can check if the address has the correct length and format
    return address.length > 10; // Example validation rule
  };











  // ====================================================================================================================

  const [formData, setFormData] = useState({
    bankName: '',
    accountName: '',
    accountNumber: '',
    swiftCode: '',
    bankAddress: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClear = () => {
    setFormData({
      bankName: '',
      accountName: '',
      accountNumber: '',
      swiftCode: '',
      bankAddress: '',
    });
  };

  const handleAddBankInfo = () => {
    // Add bank info logic here
    console.log('Bank Info Added:', formData);
  };

  const handleRequestOTP = () => {
    // Request OTP logic here
    console.log('OTP Requested');
  };


  return (
    <div className="WalletsEditor">
      
      <p>Edit Wallets</p>
      <div
        className="dashboardbutton"
        style={{ width: "200px" }}
        onClick={()=>{(setCryptoWithdrwalMethod (!cryptoWithdrwalMethod))}}
      >
        <i class="fa-solid fa-building-columns"></i> 
        
        {
          cryptoWithdrwalMethod ?("Add Bank Account"):(" Crypto Wallets")
        }
      </div>

      <div className="first-inner wallets-container">
       {cryptoWithdrwalMethod&& <div className="second-inner alertInfo warninig">
       
          <p>
            We won't be held
            accountable for any losses incurred as a result wrong input of
            wallet address. please make sure your wallet is correct</p>
        
        </div>}

        {
         cryptoWithdrwalMethod? (
          
          <div className="second-inner tablediv">
          <table className="crypto-table">
            <thead>
              <tr>
                <th>Coin Type</th>
                <th>Wallet Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img className="icon" src={item.icon} alt={item.coinType} /> {item.name}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                    ) : (
                      item.address
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <div className=" ">
                        <button
                          className="dashboardbutton"
                          onClick={() => {
                            if (!savingWallet){
                              handleSaveClick(index)
                            }
                          }}
                        >
                         {savingWallet ? <i class="fa-solid fa-spinner fa-spin"></i>: "Save"}
                        </button>
                        <button
                          className="dashboardbutton"
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="dashboardbutton"
                        onClick={() => handleEditClick(index)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      ):
        (

          <div className="bank-form">
          <div className="form-group">
            <label>Bank Name:</label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="Enter bank name"
            />
          </div>
          <div className="form-group">
            <label>Account Name:</label>
            <input
              type="text"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              placeholder="Enter account name"
            />
          </div>
          <div className="form-group">
            <label>Bank Account Number:</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              placeholder="Enter bank account number"
            />
          </div>
          <div className="form-group">
            <label>SWIFT or BIC Code:</label>
            <input
              type="text"
              name="swiftCode"
              value={formData.swiftCode}
              onChange={handleChange}
              placeholder="Enter SWIFT or BIC code"
            />
          </div>
          <div className="form-group">
            <label>Bank Address:</label>
            <input
              type="text"
              name="bankAddress"
              value={formData.bankAddress}
              onChange={handleChange}
              placeholder="Enter bank address"
            />
          </div>
          <button className="request-otp" onClick={handleRequestOTP}>
            Request OTP
          </button>
          
          <div className="form-actions">
            <button className="clear-button" onClick={handleClear}>
              Clear field
            </button>
            <button className="add-button" onClick={handleAddBankInfo}>
              Add bank info
            </button>
          </div></div>


        )
      }
      </div>
    </div>
  );
}
