import React from 'react'
import "../styles/CardComponent3.css"

export default function CardComponent3(props) {
  return (
    <div className='card-component3'data-aos="zoom-in" data-aos-duration="2000">
       
        <div className="top" >
        <div className='step-number' data-aos="zoom-out-down" data-aos-duration="2000" data-aos-delay="1000">{props.number}</div>
        <div className='card-icon'>{props.icon}</div>
        </div>
        <h1 className='card-header'>{props.header}</h1>
        <p className='card-description'>{props.description}</p>
    </div>
  )
}
