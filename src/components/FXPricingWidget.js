import React from 'react';

const FXPricingWidget = ({id}) => {
  return (
    <div>
      <iframe src= {`https://fxpricing.com/fx-widget/single-ticker-widget.php?id=${id}`}
    
               width="100%" 
               height="100" 
              style={{ display:'flex',  }}></iframe>
      {/* <div id="fx-pricing-widget-copyright">
        <span>Powered by </span>
        <a href="https://fxpricing.com/" target="_blank">FX Pricing</a>
      </div> */}
      {/* <style>
        {`
          #fx-pricing-widget-copyright {
            text-align: center;
            font-size: 13px;
            font-family: sans-serif;
            margin-top: 10px;
            margin-bottom: 10px;
            color: #9db2bd;
          }
          #fx-pricing-widget-copyright a {
            text-decoration: unset;
            color: #bb3534;
            font-weight: 600;
          }
        `}
      </style> */}

      
    </div>
  );
};

export default FXPricingWidget;
