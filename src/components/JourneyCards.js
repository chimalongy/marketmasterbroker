import React from 'react'
import "../styles/JourneyCard.css"

function JourneyCards({image, header}) {
  return (
    <div className='journey-card'>
        <img src ={image} alt=''/>
        <h2>{header}</h2>
    </div>
  )
}

export default JourneyCards