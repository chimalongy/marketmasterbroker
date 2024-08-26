import React, { useState, useEffect } from 'react';

import '../styles/Dashboard.css'; // Import CSS file for styling



const Dashboard = () => {
  const [showSendDiv, setShowSendDiv] = useState(false);
  const [showReceiveDiv, setShowReceiveDiv] = useState(false);
  const bitcoinAddress = 'RandomBitcoinAddress'; // Replace with the actual Bitcoin address

  const handleSendButtonClick = () => {
    setShowSendDiv(!showSendDiv);
    setShowReceiveDiv(false);
  };

  const handleReceiveButtonClick = () => {
    setShowReceiveDiv(!showReceiveDiv);
    setShowSendDiv(false);
  };

  return (
    <div className="dashboard">
      <div className="user-provide">
        <h1>Welcome to your dashboard, Chima</h1>
      </div>

      <div className="shadowed-container">
        <h2>Wallet Balance:</h2>
        <p>{Math.random() * 10} BTC</p>
        <div className="wallet-buttons">
          <button onClick={handleSendButtonClick}>Send BTC</button>
          <button onClick={handleReceiveButtonClick}>Receive BTC</button>
        </div>
        {showSendDiv && (
          <div className="send-div">
            <input type="text" placeholder="Receiving Address" />
            <button>Send</button>
          </div>
        )}
        {showReceiveDiv && (
          <div className="receive-div">
            <p>Your Bitcoin Address:</p>
            <div className="bitcoin-address">
              {bitcoinAddress}
              <button>Copy</button>
            </div>
          </div>
        )}
      </div>

      <div className="shadowed-container">
        <h2>Transaction History</h2>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Amount (BTC)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Incoming</td>
              <td>0.5</td>
              <td>2023-06-20</td>
            </tr>
            <tr>
              <td>Outgoing</td>
              <td>0.2</td>
              <td>2023-06-18</td>
            </tr>
            <tr>
              <td>Incoming</td>
              <td>1.0</td>
              <td>2023-06-17</td>
            </tr>
            <tr>
              <td>Outgoing</td>
              <td>0.8</td>
              <td>2023-06-15</td>
            </tr>
            <tr>
              <td>Incoming</td>
              <td>0.3</td>
              <td>2023-06-14</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
