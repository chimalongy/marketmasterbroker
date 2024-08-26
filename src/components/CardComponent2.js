import React from 'react'
import "../styles/CardComponent2.css"
import { NavLink, useNavigate } from 'react-router-dom'

export default function CardComponent2(props) {
  const navmove = useNavigate()
  return (
    <div className='cardComponent2'>
      <div className='top'>
        <h1 className='card-header'>{props.accountType}</h1>
        <div className='tag-container'>Account</div>
        <p><span className='percentage'>{props.percentage}</span> MONTHLY INTEREST</p>
      </div>
      <div className='butttom'>
        <ul className='card-details'>
            <li>
                <div>
                    <i class="fa-regular fa-circle-check"></i>
                     <p>Minimum amount</p>
                    </div>
                <p>USD {props.minimumAmount}</p>
            </li>
            <li>
                <div>
                    <i class="fa-regular fa-circle-check"></i>
                     <p>Interval Type</p>
                    </div>
                <p>{props.intervalType}</p>
            </li>
            <li>
                <div>
                    <i class="fa-regular fa-circle-check"></i>
                     <p>Get Interest every</p>
                    </div>
                <p>30 Days</p>
            </li>
        </ul>

        <div className='link-button' onClick={()=>{navmove("/register")}}> Get Started</div>
        
      </div>
    </div>
  )
}
