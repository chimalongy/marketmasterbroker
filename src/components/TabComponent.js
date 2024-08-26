import React, { useState } from 'react';
import '../styles/TabComponent.css'

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div>
      <div className="tabs">
        <div
          className={`tab ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => handleTabClick(0)}
        >
        Our Mission
        </div>
        <div
          className={`tab ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => handleTabClick(1)}
        >
         Our Vision
        </div>
      </div>
      <div className="tab-content">
        {activeTab === 0 && 
        <div>The goal of Swift-bruss is to provide its users a unique, safe and secured platform for transactions in the field of finance and fintech. This is why we have used cutting-edge platform with extensive infrastructure intended to make things more convenient for our users.</div>}



        {activeTab === 1 && 
        <div>
          <p>We always try to expand our technical capabilities and financial prowess with the help of latest and advanced fintech technologies to facilitate transactions.</p>
         <br></br>
          <p>EliteOnlineBanking envisions to widen our customer reach to people of different races, countries and continents.</p>
          </div>}
      </div>
    </div>
  );
};

export default TabComponent;
