import React, { useEffect } from 'react';

const CryptoPrices = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.async = true;

    // Set the script's inner HTML to the widget's configuration
    script.innerHTML = JSON.stringify({
      "width": "100%",
      "height": 550,
      "defaultColumn": "overview",
      "screener_type": "crypto_mkt",
      "displayCurrency": "USD",
      "colorTheme": "dark",
      "locale": "en"
    });

    // Get the container div
    const container = document.getElementById('tradingview-widget-container');
    if (container) {
      container.appendChild(script);
    }

    // Clean up the script when the component unmounts
    return () => {
      if (container && script.parentNode) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" id="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
         
        </a>
      </div>
    </div>
  );
};

export default CryptoPrices;
