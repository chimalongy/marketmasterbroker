import React, { useState } from "react";
import "../../styles/Login.css"; // Import CSS file for styling
import { baseurl, setCookie, getUserTransactions, getuserInvestments, getUserWallets } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setUserTransactions } from "../../redux/userTransactionSlice";
import { setUserdata, clearUserdata } from "../../redux/userdataSlice";
import { setUserInvestments } from "../../redux/userInvestmentSlice";
import {  setUserWallets, clearUserWallets, addUserWallet, removeUserWallet  } from "../../redux/userWalletSlice";


const Login = () => {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.userdata);
  const userTransactions = useSelector((state) => state.userTransactions);
  const navmove = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [forgotPassword, showForgotPassword] = useState(false);

  const [retrivePassword, setRetrivePassword] = useState("");
  const [retrivePasswordError, setRetrivePasswordError] = useState("");
  const [retriveCodeSent, setRetriveCodeSent] = useState(false);

  const [updatePasswordCode, setUpdatePasswordCode] = useState("");
  const [updatePasswordCodeError, setUpdatePasswordCodeError] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [updatePasswordCorrect, setUpdatePasswordCorrect] = useState(false);

  const [generatedCode, setGeneratedCode] = useState("");

  const [loadingUpdateCode, setLoadingUpdateCode] = useState(false);
  const [loadingUpdatePassword, setLoadingUpdatePassword] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const [loginError, setLoginError] = useState("");
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const generateRandomCode = () => {
    // Generate a random 6-character validation code
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      setLoginError("Email or Username is required");
      return false;
    }

    if (!password) {
      setLoginError("Password is required");
      return false;
    } else if (password.trim().length < 6) {
      setLoginError("Password should be 6 or more characters");
      return false;
    }

    return true;
  };

  async function sendverificationcode() {
    setLoadingUpdateCode(true);
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (
      retrivePassword.trim().length < 1 ||
      !emailPattern.test(retrivePassword)
    ) {
      setRetrivePasswordError("Invalid email");
      setLoadingUpdateCode(false);
    } //HEEREE
    else {
      setRetrivePasswordError("");
      const randomCode = generateRandomCode();
      setGeneratedCode(randomCode);
      const requestData = {
        requestTask: "sendPasswordUpdateOTP",
        email: retrivePassword,
        OTP: randomCode,
      };
      const result = await axios.post(baseurl, requestData);
      console.log(result.data);
      if (result.data == "otp-sent") {
        setRetriveCodeSent(true);
        setLoadingUpdateCode(false);
      } else {
        setLoadingUpdateCode(false);
        setRetrivePasswordError("Email is not registered");
      }
    }
  }

  async function saveandupdatenewpassword() {
    setLoadingUpdatePassword(true);
    if (!loadingUpdatePassword) {
      // this line make the button unclickable when loading
      if (
        newPassword.trim().length === 0 ||
        confirmNewPassword.trim().length === 0
      ) {
        setNewPasswordError("Some feilds are empty");
        setLoadingUpdatePassword(false);
        return;
      } else if (newPassword !== confirmNewPassword) {
        setNewPasswordError("Passwords do not match!");
        setLoadingUpdatePassword(false);
        return;
      } else if (
        newPassword.trim().length < 6 ||
        confirmNewPassword.trim().length < 6
      ) {
        setNewPasswordError(
          "Invalid password\nPassword should be 6 or or more characters"
        );
        setLoadingUpdatePassword(false);
        return;
      } else {
        setNewPasswordError("");
        const requestData = {
          requestTask: "updatePassword",
          recieverEmail: retrivePassword,
          password: newPassword,
        };

        const result = await axios.post(baseurl, requestData);
        console.log(result.data);
        if (result.data == "password-updated") {
          setPasswordUpdated(true);
          setTimeout(() => {
            setNewPasswordError("");
            setLoadingUpdatePassword(false);
            showForgotPassword(false);
            navmove("/login");
          }, 1000);
        } else {
          setNewPasswordError("An error occured");
          setLoadingUpdatePassword(false);
          return;
        }
      }
    }
  }

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoadingLogin(true);
  //   setLoginError("");
  //   if (!loadingLogin) {
  //     if (validateForm()) {
  //       const requestData = {
  //         requestTask: "login",
  //         email: email,
  //         password: password,
  //       };

  //       const result = await axios.post(baseurl, requestData);

  //       // setLoadingLogin(false)

  //       if (result.data == "notfound") {
  //         setLoginError("Email not registered");
  //         setLoadingLogin(false);
  //       } else if (result.data === "wrongpassword") {
  //         setLoginError("Email or password is incorrect");
  //         setLoadingLogin(false);
  //       } else if (result.data == "loginsucesss") {
  //         setLoginError("");

  //         const requestData = {
  //           requestTask: "getLoginData",
  //           email: email,
  //         };
  //         const result = await axios.post(baseurl, requestData);
  //           console.log(result)
  //         let userData = result.data;
  //         console.log(userData.AccountNumber);
  //         setCookie("usersession", userData.email, 10);
  //         setCookie("userData", JSON.stringify(userData), 11);
  //         dispatch(setUserdata(userData));
          
  //         const requestData2 = {
  //           requestTask: "getUserTransactions",
  //           email: userData.email,
  //         };
  //         const usertransactions = await axios.post(baseurl, requestData2);
  //         console.log("User transactions is", usertransactions.data);
  //        // setUserTransactions(usertransactions.data);
  //        console.log("USER Transactions = ", usertransactions.data)
  //         dispatch(setUserTransactions(usertransactions.data))


  //         const requestData3 = {
  //           requestTask: "getuserinvestments",
  //           email: userData.email,
  //         };
  //         const userInvestments = await axios.post(baseurl, requestData2);
  //         console.log("USER INVESTMENTS = ", userInvestments.data)
  //         dispatch(setUserInvestments(userInvestments.data))

  //        // window.location.assign("/dashboard");

  //         setLoadingLogin(false);
  //       }
  //     } else {
  //       alert("invalid form");
  //       setLoadingLogin(false);
  //     }
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    setLoginError("");
 
    if (validateForm()) {
      console.log("form valid")
      try {
        const loginData = {
          requestTask: "login",
          email: email,
          password: password,
        };
  
        const loginResult = await axios.post(baseurl, loginData);
        console.log(loginResult.data)
  
        if (loginResult.data.trim() === "notfound") {
          setLoginError("Email not registered");
        } else if (loginResult.data.trim() === "wrongpassword") {
          setLoginError("Email or password is incorrect");
        } else if (loginResult.data.trim() =="loginsucesss") {
          setLoginError("");
          console.log(loginResult.data.trim())
  
          const loginDetails = {
            requestTask: "getLoginData",
            email: email,
          };
          const loginDetailsResult = await axios.post(baseurl, loginDetails);
          const userData = loginDetailsResult.data;

          console.log("Login Details",loginDetailsResult.data)

         
         setCookie("usersession", userData.email, 10);
         setCookie("userData", JSON.stringify(userData), 11);
         dispatch(setUserdata(userData));
  
         

          const userTransactions = await getUserTransactions(userData.email)
          dispatch(setUserTransactions(userTransactions));
          console.log("user Transactions: ", userTransactions)
  
         

          const userWallets = await getUserWallets(userData.email)
          dispatch(setUserWallets(userWallets));
          console.log("user Wallets: ", userWallets)

          
          const userInvestments = await getuserInvestments(userData.email)
          dispatch(setUserInvestments(userInvestments));

           console.log("user Investments: ", userInvestments)
  
        
           window.location.assign("/dashboard");
        
        }
      } catch (error) {
        console.error("Error during login:", error);
        setLoginError("An error occurred during login. Please try again.");
      } finally {
        setLoadingLogin(false);
      }
    } else {
      alert("Invalid form");
      setLoadingLogin(false);
    }
  };
  
  return (
    <div className="login-contatiner dark-container">
      <div className="left">

      <div >
         {forgotPassword ? (
        <div>
          {!retriveCodeSent ? (
            <div className="login ">
              <h2 className="sectionheader">Forgot Your Password?</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="form-container"
                data-aos="zoom-in-up" data-aos-duration="1000"
              >
                {retrivePasswordError && (
                  <div className="form-error-container">
                    <p className="error">
                      <i class="fa-solid fa-circle-exclamation"></i>{" "}
                      {retrivePasswordError}
                    </p>
                  </div>
                )}
                <label>Email:</label>
                <input
                  type="text"
                  value={retrivePassword}
                  onChange={(e) => setRetrivePassword(e.target.value)}
                  required
                />
                <button
                  className="site-button-thin"
                  type="button"
                  onClick={sendverificationcode}
                >
                  {loadingUpdateCode ? (
                    <i className="fa-solid fa-spinner fa-spin spinner"></i>
                  ) : (
                    <p> Submit</p>
                  )}
                </button>

                <div className="login-navigator">
                  <p
                    onClick={() => {
                      showForgotPassword(false);
                      setRetrivePasswordError("");
                    }}
                  >
                    <strong>Login</strong> instead
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div className="login">
              <div>
                {updatePasswordCorrect ? (
                  <div className="form-container" style={{ margin: "auto" }}>
                    <h2 className="sectionheader">Update Password</h2>
                    {newPasswordError && (
                      <div className="form-error-container">
                        <p className="error">
                          <i class="fa-solid fa-circle-exclamation"></i>{" "}
                          {newPasswordError}
                        </p>
                      </div>
                    )}
                    {passwordUpdated && (
                      <div className="form-error-container">
                        <p className="success">
                          <i class="fa-regular fa-circle-check reg-complete"></i>{" "}
                          Password Updated
                        </p>
                      </div>
                    )}

                    <div className="new-password-change-div">
                      <div>
                        <label>New password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>

                      <div>
                        <label>Confirm new password</label>
                        <input
                          type="password"
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                        />
                      </div>
                      <button
                        className="site-button-thin"
                        onClick={saveandupdatenewpassword}
                      >
                        {loadingUpdatePassword ? (
                          <i className="fa-solid fa-spinner fa-spin spinner"></i>
                        ) : (
                          <p> Update Password</p>
                        )}
                      </button>
                    </div>
                    <div className="login-navigator">
                      <p
                        onClick={() => {
                          window.location.reload();
                        }}
                      >
                        Cancel
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="new-password-change-div"
                    style={{ margin: "auto" }}
                  >
                    <i
                      class="fa-regular fa-circle-left"
                      onClick={() => {
                        setRetriveCodeSent(false);
                      }}
                    ></i>
                    <h2 className="sectionheader">We sent you a verification code</h2>

                    {updatePasswordCodeError && (
                      <div className="form-error-container">
                        <p className="error">
                          <i class="fa-solid fa-circle-exclamation"></i>{" "}
                          {updatePasswordCodeError}
                        </p>
                      </div>
                    )}
                    <input
                      type="text"
                      value={updatePasswordCode}
                      onChange={(e) => setUpdatePasswordCode(e.target.value)}
                    />
                    <button
                      className="site-button-thin"
                      type="button"
                      onClick={() => {
                        if (updatePasswordCode.trim().length == 6) {
                          if (generatedCode === updatePasswordCode) {
                            setUpdatePasswordCodeError("");
                            setUpdatePasswordCorrect(true);
                          } else {
                            setUpdatePasswordCodeError("Wrong code");
                          }
                        } else {
                          setUpdatePasswordCodeError(
                            "code must be 6 characters"
                          );
                        }
                      }}
                    >
                      Confirm code
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="login">
          <h2 className="sectionheader"  data-aos="fade-in" data-aos-duration="2000" >Welcome Back!</h2>
          <form onSubmit={handleLogin} className="form-container" data-aos="fade-in" data-aos-duration="2000">
            {loginError && (
              <div className="form-error-container">
                <p className="error">
                  <i class="fa-solid fa-circle-exclamation"></i> {loginError}
                </p>
              </div>
            )}

            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="remember-me" style={{display:"flex", flexDirection:"column"}}>
              <label className="choice-lable" >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <p>Remember Me</p>
              </label>
            </div>

            <button type="submit" onClick={() => {}}>
              {loadingLogin ? (
                <i className="fa-solid fa-spinner fa-spin spinner"></i>
              ) : (
                <p> Login</p>
              )}
            </button>

            <div className="login-navigator">
              <p
                onClick={() => {
                  showForgotPassword(true);
                  setLoginError("");
                }}
              >
                {" "}
                Forgot Password?
              </p>
              <p>
                {" "}
                New user?{" "}
                <strong
                  onClick={() => {
                    window.location.assign("/register");
                  }}
                >
                  Create an Account
                </strong>
              </p>
            </div>
          </form>
        </div>
      )}
      <div></div>
    </div>
      </div>

      {/* ============================================================= */}
      <div className="right">

      </div>
    </div>
  );
};

export default Login;
