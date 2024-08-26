import React, { useState } from 'react'
import "../styles/CardComponent1.css"

function CardComponent1(props) {
  const [moredetails, setMoreDetatils]= useState(false);

  
  return (
    <div className='card-component-wrapper'  data-aos="fade-in" data-aos-duration="2000" onClick={()=>{setMoreDetatils(!moredetails)}} >
       <img  src={props.image}alt=''/>
       <div className='card-content-container'>
       <h2>{props.header}</h2>
       <p>{props.description}</p>

       {
        moredetails ? (
        <div>
        {props.moredetails}
        </div>):(<></>)
       }
       </div>

       
    </div>
  )
}

export default CardComponent1