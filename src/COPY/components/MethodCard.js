import "../styles/MethodCard.css";

const MethodCard = (props) => {
    return (
      <div className="MethodCard">
        <div className="MethodCard-logo">
          {props.mlogo} 
        </div>
        <div className="MethodCard-heading">
          <h3>{props.mheading}</h3>
        </div>
      </div>
    );
  };
  
  export default MethodCard;