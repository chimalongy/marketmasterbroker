import React from 'react'
import "../styles/Steps.css"

function Steps({stepNumber, stepHeader, stepDescription}) {
  return (
    <div className='steps'>
            <h1>{stepNumber}</h1>
        <div>
            <h2>{stepHeader}</h2>
            <p>{stepDescription}</p>
        </div>
    </div>
  )
}

export default Steps