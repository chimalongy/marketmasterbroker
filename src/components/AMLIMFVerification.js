import React, { useState } from 'react'
import axios from "axios";
import { baseurl, setCookie, getCookie } from "../utils/constants";




export default function AMLIMFVerification(props) {
  const [userAMLIMF, setUserAMLIMF]=useState("");
  const [AMLIMFError, setAMLIMFError]= useState("");
  const [loadingAMLIMF, setLoadingAMLIMF]= useState(false)
  const [AMLIMFSucess, setAMLIMFSuccess]= useState(false)



async  function handleVerifyAMLIMF(){
      console.log("THE USER DATA IS"  ,props.userData);
      if (userAMLIMF.trim()==""|| userAMLIMF.trim().length<8){
          setAMLIMFError("Invalid AMLIMF.")
          return false
      }
      else {

          if(props.userData.AMLIMF=="NULL"){
              setAMLIMFError("AMLIMF still Pending. Please Contact support.")
              return false;
          }
          else{
              if (userAMLIMF==props.userData.AMLIMF){
                  setAMLIMFError("");
                  
                  const requestData = {
                      requestTask: "confirmAMLIMF",
                      email:props.userData.email,
                    };
                
                    let result = await axios.post (baseurl, requestData);

                    if (result.data=="AMLIMF-verified"){
                      setAMLIMFSuccess("AMLIMF sucessfully verified.")
                          setUserAMLIMF("")
                     
                    }
                    else{
                      setAMLIMFError("Something went wrong")
                    }
                    
                    
              }
              else{
                  setAMLIMFError("AMLIMF Incorrect. Please try again.")
                  return false;
              }
          }

      }
  }


return (
  <div style={{display:'flex', flexDirection:'column',gap:'12px', maxWidth:"650px"}}>
      
      
      <h1 >Confirm AML/IMF</h1>

      {AMLIMFError &&
      <div className="form-error-container">
      <p className="error">
        <i class="fa-solid fa-circle-exclamation"></i>{" "}
        {AMLIMFError}
      </p>
    </div>
      }

      {AMLIMFSucess &&
       <div className="form-sucess-container">
       <p className="sucess">
       <i class="fa-regular fa-circle-check fa-fade"></i>
         {AMLIMFSucess}
       </p>
     </div>
      }
      
      <input
      type='text'
      placeholder='insert AMLIMF'
      value={userAMLIMF}
      onChange={(e)=>{setUserAMLIMF(e.target.value)}}
      
      />
      <button onClick={()=>{
         handleVerifyAMLIMF()

      }}>{loadingAMLIMF? <i class="fa-solid fa-spinner fa-spin"></i>:"Confirm AML/IMF code"}</button>
  </div>
)
}
