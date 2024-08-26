import React, { useState, useEffect, useRef } from "react";
import "../styles/DashboardProfileSetting.css";
import defaultImage from "../images/defaultuser.png";
import axios from "axios";
import {
  baseurl,
  setCookie,
  getCookie,
  getInvestmentDetails,
} from "../utils/constants";
import { useSelector } from "react-redux";

function deleteCookie(cookieName) {
  document.cookie =
    cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}








function DashboardProfileSetting() {
  const userdata = useSelector((state) => state.userdata);
  let kycFront = useRef(null);
  let kycBack = useRef(null);
  const [frontKYC, setFrontKYC] = useState(null);
  const [backKYC, setBackKYC] = useState(null);
  const [kycError, setKYCError]= useState("")
  const [sendingKYC, setSendingKYC]=useState(false);
  








  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64 part
      reader.onerror = (error) => reject(error);
    });
  }
  
  
  async function uploadKYC(){
    setSendingKYC(true)
    const kycfrontbase64 = await toBase64(frontKYC);
    const kycbackbase64 = await toBase64(backKYC)

    const requestData = {
      requestTask: "updateKYC",
      firstName:userdata.firstName,
      email: userdata.email,
      kycfront: kycfrontbase64,
      kycBack: kycbackbase64,
    };

    const result = await axios.post(baseurl, requestData)
    console.log(result.data)

    if (result.data =="submitted"){
     
    }
    setSendingKYC(false);

    
  }
  







  return (
    <div className="DashboardProfileSetting">
      <div className="first-inner">
        <div className="profile-details-container">
          <img src={defaultImage} alt="" />
          <div className="second-inner user-details-container">
            <p>
              {userdata.firstName} {userdata.lastName}
            </p>
            <p>{userdata.email}</p>
            <p>{userdata.referalcode}</p>
            <p>{userdata.country}</p>
            <p>{userdata.phone}</p>
          </div>
        </div>
      </div>

      <div className="first-inner">
        <p className="dash-header">KYC</p>
        {
          userdata.KycStatus==0?(
            <div className="second-inner kyc-content-container">

          <p className="dash-description ">
            With tier verification you stand a chance to increase your daily
            withdrawal limit. We encourage you to upload a clear and standard
            version of your preferred document.
          </p>

          <div className="kyc-uploads-container">
            <p>
              Please kindly upload a government approved identification
              document. (ID Card, Driver licenses and any other document.)
            </p>
            {kycError &&<div className="form-error-container ">{kycError}</div>}
            
            <div className="kyc-Uploads">
             
              <div className="dashboardbutton" onClick={()=>{
                setKYCError("")
                kycFront.current.click()}}>
                <i class="fa-solid fa-cloud-arrow-up"></i>
                <p>Upload the front view</p>
                <input
                  type="file"
                  ref={kycFront}
                  style={{ display: "none" }}
                  onChange={(e)=>{
                    const file = e.target.files[0];
                    if (file) {
                      // Check if the file is an image
                      const isImageFile = file.type.startsWith('image/');
                      if(isImageFile){setFrontKYC(file)}
                      else{setKYCError("Invalid format. Please select a picture.")
                        setFrontKYC(null)}
                  }}}
                />
                <p style={{overflowX:"auto"}}>{frontKYC && frontKYC.name}</p>
              </div>

              <div className="dashboardbutton" onClick={()=>{
                setKYCError("")
                kycBack.current.click()}}>
                <i class="fa-solid fa-cloud-arrow-up"></i>
                <p>Upload the back view</p>
                <input
                  type="file"
                  ref={kycBack}
                  style={{ display: "none" }}
                  onChange={(e)=>{
                    const file = e.target.files[0];
                    if (file) {
                      // Check if the file is an image
                      const isImageFile = file.type.startsWith('image/');
                      if(isImageFile){setBackKYC(file)}
                      else{setKYCError("Invalid format. Please select a picture.")
                        setBackKYC(null)}
                  }}}
                />
                
                <p style={{overflowX:"auto"}}>{backKYC && backKYC.name}</p>
              </div>
            </div>
            {(frontKYC !== null && backKYC!== null ) &&<div>
                <button  onClick={()=>{uploadKYC()}}>{sendingKYC ? <i class="fa-solid fa-spinner fa-spin"></i>:"Submit"}</button>
                </div>}
          </div>
        </div>
          ):(
          <div>
             {userdata.KycStatus==2?(
              <div className="second-inner kyc-content-container">
                <p>Your KYC is still under review. if this takes more than 24 hours, contact support.</p>
              </div>
             ):(
             <>
             KYC VERIFIED
             </>)
             
            
            }
          </div>
          
          )
        }

        
      </div>

      {/* ================================================================== */}

      <div className="first-inner">
        <p className="dash-header">Referals</p>

        <div className="second-inner kyc-content-container">
          <p>We support you every step of the way.</p>
          <p className="dash-description">
            As an affiliate, you'll receive free access to a range of marketing
            tools and resources designed to help you promote our site and drive
            sales. We offer top commissions for every successful referral you
            make, so you can earn money while helping others discover the
            benefits of Market Master Broker. To get started, simply copy your
            unique referral link below and share it with your family and
            friends. If you have any questions or need assistance, please don't
            hesitate to contact our support team.
          </p>

          <div className="referal-code">
            <p>Referal Code:</p>
            <p className="refer-code">{userdata.referalcode}</p>
          </div>

          <div className="kyc-Uploads">
            <div>
              <p>0</p>
              Total Referls
            </div>
            <div>
              <p>0</p>
              Active Referals
            </div>
            <div>
              <p>$0</p>
              Reward
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardProfileSetting;
