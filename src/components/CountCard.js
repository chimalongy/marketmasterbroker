import React from 'react'
import "../styles/CountCard.css"
import CountUp from 'react-countup';

export default function CountCard(props) {
  return (
    <div className='count-card'data-aos="zoom-in-up" data-aos-duration="2000" data-aos-delay="1000">
            <p className='counticon'>{props.icon}</p>
           
           <div className='couterup'> <CountUp end={props.number} /></div>
            <p className='counter-description'>{props.description}</p>
    </div>
  )
}
