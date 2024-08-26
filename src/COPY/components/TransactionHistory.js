import React from 'react';
import '../styles/TransactionHistory.css';

const TransactionHistory = () => {
  // Dummy transaction data for demonstration
  const transactionData = [
    { id: 1, type: 'Incoming', amount: 0.5, date: '2023-06-10', recipient: 'John Doe' },
    { id: 2, type: 'Outgoing', amount: 0.7, date: '2023-06-12', recipient: 'Jane Smith' },
    { id: 3, type: 'Incoming', amount: 0.3, date: '2023-06-15', recipient: 'Mike Johnson' },
    { id: 4, type: 'Outgoing', amount: 0.9, date: '2023-06-18', recipient: 'Emily Davis' },
    { id: 5, type: 'Incoming', amount: 0.6, date: '2023-06-20', recipient: 'Robert Brown' },
  ];

  return (
    <div className="transaction-history">
      <h1>Transaction History</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Recipient/Sender</th>
          </tr>
        </thead>
        <tbody>
          {transactionData.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.date}</td>
              <td>{transaction.recipient}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
