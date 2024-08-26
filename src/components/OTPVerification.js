import React, { useState } from 'react'
import axios from "axios";
import { baseurl, setCookie, getCookie } from "../utils/constants";




export default function OTPVerification(props) {
    const [userOTP, setUserOTP]=useState("");
    const [OTPError, setOTPError]= useState("");
    const [loadingOTp, setLoadingOTP]= useState(false)
    const [OTPSucess, setOTPSuccess]= useState(false)



  async  function handleVerifyOTP(){
        console.log("THE USER DATA IS"  ,props.userData);
        if (userOTP.trim()==""|| userOTP.trim().length<8){
            setOTPError("Invalid OTP.")
            return false
        }
        else {

            if(props.userData.OTP=="NULL"){
                setOTPError("OTP Pending. Please Contact support.")
                return false;
            }
            else{
                if (userOTP==props.userData.OTP){
                    setOTPError("");
                    
                    const requestData = {
                        requestTask: "confirmOTP",
                        email:props.userData.email,
                      };
                  
                      let result = await axios.post (baseurl, requestData);

                      if (result.data=="OTP-verified"){
                        setOTPSuccess("OTP sucessfully verified.")
                            setUserOTP("")
                       
                      }
                      else{
                        setOTPError("Something went wrong")
                      }
                      
                      
                }
                else{
                    setOTPError("OTP Incorrect. Please try again.")
                    return false;
                }
            }

        }
    }


  return (
    <div style={{display:'flex', flexDirection:'column',gap:'12px', maxWidth:"650px"}}>
        
        
        <h1 >Confirm OTP</h1>

        {OTPError &&
        <div className="form-error-container">
        <p className="error">
          <i class="fa-solid fa-circle-exclamation"></i>{" "}
          {OTPError}
        </p>
      </div>
        }

        {OTPSucess &&
         <div className="form-sucess-container">
         <p className="sucess">
         <i class="fa-regular fa-circle-check fa-fade"></i>
           {OTPSucess}
         </p>
       </div>
        }
        
        <input
        type='text'
        placeholder='insert OTP'
        value={userOTP}
        onChange={(e)=>{setUserOTP(e.target.value)}}
        
        />
        <button onClick={()=>{
           handleVerifyOTP()

        }}>{loadingOTp? <i class="fa-solid fa-spinner fa-spin"></i>:"Confirm OTP code"}</button>
    </div>
  )
}
