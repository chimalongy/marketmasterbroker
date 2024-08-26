import React from "react";
import "../styles/InvestmentCard.css";
import {
  baseurl,
  getElapsedHours,
  getInvestmentProfits,
} from "../utils/constants";

export default function InvestmentCard({ investmentData }) {
  return (
    <div className="investmentCard ">
      <div className="left">
        <p>{investmentData.investmentLabel}</p>
        <h1 className="assetHeader">{investmentData.asset.toUpperCase()}</h1>
        <p>
          ${investmentData.usdamount} ({investmentData.convertedAmount})
        </p>

        <p>
          {investmentData.investmentROI}% /{investmentData.returnCycle}
        </p>
        <p>{investmentData.investmentDuration} DAYS</p>
        <p>{investmentData.date}</p>
        <p>{investmentData.time}</p>
        <p>{investmentData.STATUS}</p>
      </div>
      <div className="right second-inner">
        <div>
          <p>{Math.floor(getElapsedHours(investmentData))}HRS</p>

          <p className="assetHeader">
            +${Math.floor(getInvestmentProfits(investmentData))}
          </p>
        </div>
      </div>
    </div>
  );
}
