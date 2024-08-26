import React, { useEffect, useRef } from 'react';

const TradingViewChart = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          container_id: containerRef.current.id,
          width: '100%',
          height: 500,
          symbol: 'BINANCE:BTCUSDT',
          interval: '1',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          hideideas: true,
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div id="tradingview_chart" ref={containerRef} style={{ width: '100%', height: '500px' }}>
      Loading chart...
    </div>
  );
};

export default TradingViewChart;
