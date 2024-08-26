import React from 'react'
import cardImage from "../images/bankdeposit.png"
import "../styles/CardPayment.css"

function DepositBank({setpaymentsent}) {
  return (
    <div className='depositCard'>
    <p className="dash-header">Bank Deposit</p>

 

  <img src={cardImage}/>
  <p className="dash-header">Details</p>

  <div >
  <p>BANK NAME: </p>
  <p>First National Bank  <i class="fa-regular fa-copy dashboardbutton"></i></p>
  </div>

  <div >
  <p>ACCOUNT NAME: </p>
  <p>XXXXXXXXX <i class="fa-regular fa-copy dashboardbutton"></i></p>
  </div>
  
  <div >
  <p>BANK ACCOUNT NUMBER: </p>
  <p>XXXXXXXXX <i class="fa-regular fa-copy dashboardbutton"></i></p>
  </div>

  <div >
  <p>Branch, SWIFT or BIC Code: </p>
  <p>XXXXXXXXX <i class="fa-regular fa-copy dashboardbutton"></i></p>
  </div>
<p>Please contact support for bank details.</p>

  <div className="payment-made">
  <div className="dashboardbutton"
  onClick={()=>{
        setpaymentsent(true)
  }}
  
  >I have made payment</div></div>
  
</div>
  )
}

export default DepositBank