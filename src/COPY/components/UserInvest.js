import React, { useState } from 'react'
import Plans from '../components/Plans';
import Payment from './Payment';

function UserInvest() {
  const [showPayment, setShowPayemnt]= useState(false)
  return (
    <div>
   { showPayment ? (<Payment closePay= {()=>{setShowPayemnt(false) }}/>):(<Plans pay = {()=>{setShowPayemnt(true) }} realParent="yes"  />)}
    </div>
  )
}

export default UserInvest