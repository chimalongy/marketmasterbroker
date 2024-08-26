import React from 'react'
import "../styles/CardComponent4.css"

export default function CardComponent4(props) {
  return (
    <div className='component4'data-aos="zoom-in-up" data-aos-duration="2000" data-aos-delay={props.delay}>
        <p>{props.review}</p>

        <div className='reviewer-details'>
          
           <img src={props.image} alt=""/>
          
           <div>
            <p><b>{props.name}</b></p>
            <p>Customer</p>
           </div>
        </div>

    </div>
  )
}
