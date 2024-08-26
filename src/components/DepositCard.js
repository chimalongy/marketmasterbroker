import React from 'react'
import cardImage from "../images/cardpayment.gif"
import "../styles/CardPayment.css"

export default function DepositCard() {
  return (
    <div className='depositCard'>
          <p className="dash-header">Manual Deposit</p>

        <p className=''> Comming Soon!</p>
      
        <img src={cardImage}/>
        <p className='alertInfo'>We are working towards bringing you a new experience in payment.</p>

    </div>
  )
}
