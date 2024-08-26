import React from 'react'
import TradingViewWidget from 'react-tradingview-widget';

function Markets({symbol}) {
  return (
    <div>
        <TradingViewWidget symbol={symbol} autosize />

       
    </div>
  )
}

export default Markets