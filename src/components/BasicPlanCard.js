import React from 'react';
import '../styles/BasicPlanCard.css';

const BasicPlanCard = ({ title, subtitle, features, buttonText }) => {
  return (
    <div className="plan-card">
      <h2>{title}</h2>
      <p className="subtitle">{subtitle}</p>
      <ul className="features">
        {features.map((feature, index) => (
          <li key={index}><span>✔</span><p>{feature}</p></li>
        ))}
      </ul>
      <button className="get-started-btn">{buttonText}</button>
    </div>
  );
};

export default BasicPlanCard;
