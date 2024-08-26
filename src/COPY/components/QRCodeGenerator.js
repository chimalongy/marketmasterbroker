import React, { useState } from 'react';
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";


function QRCodeGenerator(props) {
  
  return (
    <div style={{maxWidth:"100%", maxHeight:"100%"}}>
      
      <QRCode value={props.text} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
    </div>
  );
}

export default QRCodeGenerator;
