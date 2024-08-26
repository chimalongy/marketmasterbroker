import React, { useState } from 'react';
import '../styles/SendBitcoin.css';

const SendBitcoin = () => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendBitcoin = () => {
    // Validation and error handling
    if (!recipientAddress || !amount) {
      setError('Please enter the recipient address and amount.');
      return;
    }

    // Perform the Bitcoin transaction logic here

    // Reset form fields
    setRecipientAddress('');
    setAmount('');
    setMessage('');

    // Show success message or navigate to a confirmation page
    alert('Bitcoin sent successfully!');
  };

  return (
    <div className="send-bitcoin">
      <h1>Send Bitcoin</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Recipient Address</label>
        <input
          type="text"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          placeholder="Enter recipient address"
        />

        <label>Amount</label>
        <input
          type="number"
          step="0.00000001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />

        <label>Message (optional)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter optional message"
        />

        {error && <div className="error">{error}</div>}

        <button onClick={handleSendBitcoin}>Send Bitcoin</button>
      </form>
    </div>
  );
};

export default SendBitcoin;
