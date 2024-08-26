import React from 'react'

import "../styles/FeautersCard.css"

function FeauturesCard({icon, header, description}) {
  return (
    <div className='feautues-card'>
        <div className='card-top'>
            <p>{icon}</p>
            <h2>{header}</h2>

        </div>
        <p>{description}</p>
    </div>
  )
}

export default FeauturesCard