import React from 'react';
import "../styles/StepsCard.css"

const StepsCard = (props) => {
  return (
    <div className="StepsCard">
      <div className="left">
        <div>
        {props.icon}
        </div>
      </div>
      <div className="right">
        <h2 className="header">{props.header}</h2>
        <p className="description">{props.description}</p>
      </div>
    </div>
  );
};

export default StepsCard;
