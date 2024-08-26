import React from 'react';
import "../styles/InvestmentCard.css"
const InvestmentCard = (props) => {
    return ( 
        <div className="InvestmentCard">

            <div className="top-div zoom-effect" >
               <img src={props.logo} alt="#"/>
            </div>

            <div className="content-section">
                <p><b>{props.header}</b></p>
                <p className="description">{props.description}</p>
                <button className="read-more-button">Read more</button>
            </div>

        </div>


     );
}
 
export default InvestmentCard ;