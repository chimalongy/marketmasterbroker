import React,{useEffect} from "react";

function CryptoMarket({ lcwcoin,lcwbase,lcwsecondary }) {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.livecoinwatch.com/static/lcw-widget.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    
      
      <div
       
        class="livecoinwatch-widget-6"
        lcw-coin={lcwcoin}
        lcw-base={lcwbase}
        lcw-secondary={lcwsecondary}
        lcw-period="m"
        lcw-color-tx="#B68756"
        lcw-color-pr="#B68756"
        lcw-color-bg="#fffff"
        lcw-border-w="1"
        lcw-w="200"
      
      ></div>
    
  );
}

export default CryptoMarket;
