import React from 'react'

export default function StockMarketWidget() {
  return (
    <div>
        <iframe
referrerPolicy="origin"
width="100%"
height="179"
style={{background: "#FFFFFF", padding: "10px", border: "none", borderRadius: "5px", boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)"}}
src="https://jika.io/embed/fundamentals-table?symbols=AAPL,AMZN,META&keys=Market Cap,Net Income&reportingPeriod=quarter&from=2019&to=2024&sortMethod=years&boxShadow=true&textColor=161c2d&backgroundColor=FFFFFF&fontFamily=Nunito"
/>
    </div>
  )
}
