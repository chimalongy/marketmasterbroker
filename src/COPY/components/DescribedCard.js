import React from 'react';
import "../styles/DescribedCard.css";
 function DescribedCard (props) {
  return (
    <div>
    <h2>{props.head}</h2>
    <p>{props.description}</p>
    </div>
  )
}
export default DescribedCard;