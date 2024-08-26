import React, { useState } from 'react';
import '../styles/Login.css'; // Import CSS file for styling
import dataFetch from '../modules/dataFetch';
import { login } from "../modules/redux/userDataSlice"
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {

  const dispatch = useDispatch();




  const [email, setEmail] = useState('me.chimaobi@gmail.com');
  const [password, setPassword] = useState('chimsyboy');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [forgotPassword, showForgotPassword] = useState(false)

  const [retrivePassword, setRetrivePassword] = useState("");
  const [retrivePasswordError, setRetrivePasswordError] = useState("");
  const [retriveCodeSent, setRetriveCodeSent] = useState(false);

  const [updatePasswordCode, setUpdatePasswordCode] = useState("");
  const [updatePasswordCodeError, setUpdatePasswordCodeError] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [updatePasswordCorrect, setUpdatePasswordCorrect] = useState(false)

  const [generatedCode, setGeneratedCode] = useState("");

  const [loadingUpdateCode, setLoadingUpdateCode] = useState(false)
  const [loadingUpdatePassword, setLoadingUpdatePassword] = useState(false)
  const [loadingLogin, setLoadingLogin] = useState(false)


  const [loginError, setLoginError] = useState("")
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const generateRandomCode = () => {
    // Generate a random 6-character validation code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };



  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = 'Email or Username is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    }
    else if (password.trim().length < 6) {
      errors.password = 'Password should be 6 or more characters';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };


  function getWalletBalance(data) {

    function calculateDaysElapsed(givenDateStr) {
      const givenDate = new Date(givenDateStr);
      const currentDate = new Date();
      const timeDifference = currentDate.getTime() - givenDate.getTime();
      const daysElapsed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return daysElapsed;
    }

   

    let walletBalance = 0
    const dailypercentage = 0
    let daysElapsed = calculateDaysElapsed(data.DateOfCurrentInvestment)
    const membership = data.CurrentPlan
    switch (membership) {
      case 'Basic':
        dailypercentage = data.AmountInvested * (10 / 100)
        walletBalance = data.AmountInvested + (dailypercentage * daysElapsed)
        break;
      case 'Gold':
        dailypercentage = data.AmountInvested * (15 / 100)
        walletBalance =  data.AmountInvested + (dailypercentage * daysElapsed)
        break;
      case 'Master':
        dailypercentage = data.AmountInvested * (20 / 100)
        walletBalance =  data.AmountInvested + (dailypercentage * daysElapsed)
        break;
      case 'Premium':
        dailypercentage = data.AmountInvested * (25 / 100)
        walletBalance =  data.AmountInvested + (dailypercentage * daysElapsed)
        break;
      default:
        console.log('Invalid membership type');
        break;
    }

    return walletBalance
  }





  const handleLogin = (e) => {
    e.preventDefault();
    setLoadingLogin(true)
    setLoginError("");
    if (!loadingLogin) {
      if (validateForm()) {
        const requestData = {
          email: email,
          password: password
        }
        const url = 'http://localhost:4000/login';
        dataFetch(url, requestData)
          .then((result) => {
            if (result.message === "email-not-registered") {
              setLoginError("Email not registered");
              setLoadingLogin(false)
            }
            else if (result.message === "incorrect-password") {
              setLoginError("Email or password is incorrect")
              setLoadingLogin(false)
            }
            else if (result.message === "login-successfull") {
              const userData = result.data;
              const token = result.token;
              localStorage.setItem("token", token)
              console.log(userData)
              const walletBalance= getWalletBalance(userData)
              dispatch(
                login(
                  {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    CurrentPlan: userData.CurrentPlan,
                    AmountInvested: userData.AmountInvested,
                    DateOfCurrentInvestment: userData.DateOfCurrentInvestment
                  }
                )
              )

              window.location.assign("/user")
            }
            else {
              setLoginError(result.message)
              setLoadingLogin(false)
            }

          })




        // Reset form
        // setEmail('');
        // setPassword('');
        // setRememberMe(false);
        // setErrors({});
      }
      else {
        alert("invalid form")
        setLoadingLogin(false)
      }
    }

  };

  return (
    <div>
      {forgotPassword ? (
        <div>
          {!retriveCodeSent ? (
            <div className='login'>
              <h2 className='page-head'>Forgot Password</h2>
              <form onSubmit={(e) => { e.preventDefault() }} className='form-container'>
                {retrivePasswordError && <div className='form-error-container'><p className='error'>{retrivePasswordError}</p></div>}
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  value={retrivePassword}
                  onChange={(e) => setRetrivePassword(e.target.value)}
                  required
                />
                <button type="button" onClick={
                  () => {
                    setLoadingUpdateCode(true)
                    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                    if ((retrivePassword.trim().length < 1) || (!emailPattern.test(retrivePassword))) {
                      setRetrivePasswordError("Invalid email");
                      setLoadingUpdateCode(false)

                    }//HEEREE
                    else {
                      setRetrivePasswordError("");
                      // CHECK IF USER EXIST
                      const requestData = {
                        email: retrivePassword
                      }
                      const url = 'http://localhost:4000/finduser';
                      dataFetch(url, requestData)
                        .then((result) => {
                          if (result.message === "found") {
                            //GENERATE/ SEND CODE
                            const randomCode = generateRandomCode()
                            setGeneratedCode(randomCode);
                            const requestData = {
                              recieverEmail: retrivePassword,
                              code: randomCode
                            }
                            const url = 'http://localhost:4000/sendUpdatePasswordCode';
                            dataFetch(url, requestData)
                              .then((result) => {
                                if (result.message === "email-sent") {
                                  //switch

                                  setRetriveCodeSent(true)
                                  setLoadingUpdateCode(false)
                                }
                                else {
                                  setLoadingUpdateCode(false)
                                  setRetrivePasswordError("We couldnt send code to this email")
                                }

                              })
                              .catch(error => { setRetrivePasswordError("An error occured while sending verification email"); setLoadingUpdateCode(false) })



                          }
                          else if (result.message === "not-found") {
                            setRetrivePasswordError("This email is not registered");
                            setLoadingUpdateCode(false)
                          }
                          else {
                            setRetrivePasswordError("An error occured. Check your internet connection");
                            setLoadingUpdateCode(false)
                          }

                        })
                        .catch(error => {
                          setRetrivePasswordError("An error occured while sending verification email")
                          setLoadingUpdateCode(false)

                        })

                    }
                  }
                }>{loadingUpdateCode ? <i className="fa-solid fa-spinner fa-spin spinner"></i> : <p> Submit</p>}</button>

                <p onClick={() => {
                  showForgotPassword(false)
                  setRetrivePasswordError("");
                }}>Login</p>
              </form>
            </div>
          ) : (
            <div>
              {updatePasswordCodeError && <div className='form-error-container'><p className='error'>{updatePasswordCodeError}</p></div>}
              <div>
                {updatePasswordCorrect ? (
                  <div className='form-container' style={{ margin: "auto" }}>
                    <h2 className='page-head'>Update Password</h2>
                    {newPasswordError && <div className='form-error-container'><p className='error'>{newPasswordError}</p></div>}
                    <label>New password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <label>Confirm new password</label>
                    <input
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <button onClick={() => {
                      setLoadingUpdatePassword(true)
                      if (!loadingUpdatePassword) {// this line make the button unclickable when loading
                        if (newPassword.trim().length === 0 || confirmNewPassword.trim().length === 0) {
                          setNewPasswordError("some feilds are empty")
                          setLoadingUpdatePassword(false)
                          return
                        }
                        else if (newPassword !== confirmNewPassword) {
                          setNewPasswordError('Passwords do not match!');
                          setLoadingUpdatePassword(false)
                          return

                        }
                        else if (newPassword.trim().length < 6 || confirmNewPassword.trim().length < 6) {
                          setNewPasswordError('Invalid password\nPassword should be 6 or or more characters');
                          setLoadingUpdatePassword(false)
                          return
                        }

                        else {
                          setNewPasswordError('');
                          const requestData = {
                            recieverEmail: retrivePassword,
                            password: newPassword
                          }
                          const url = 'http://localhost:4000/updatePassword';
                          dataFetch(url, requestData)
                            .then((result) => {
                              if (result.message == "updated") {
                                setNewPasswordError("")
                                alert("Password updated")
                                showForgotPassword(false)
                                setLoadingUpdatePassword(false)

                                window.location.assign("/login")
                              }
                              else {
                                setNewPasswordError('An error occured');
                                setLoadingUpdatePassword(false)
                                return
                              }
                            })
                            .catch((error) => {
                              setNewPasswordError('An error occured');
                              setLoadingUpdatePassword(false)
                              return
                            })
                        }
                      }

                    }}>{loadingUpdatePassword ? <i className="fa-solid fa-spinner fa-spin spinner"></i> : <p> Update Password</p>}</button>
                  </div>
                ) : (
                  <div className='form-container' style={{ margin: "auto" }}>
                    <h2 className='page-head'>We sent you a verification code</h2>

                    {updatePasswordCode && <div className='form-error-container'><p className='error'>{updatePasswordCode}</p></div>}
                    <input
                      type="text"
                      value={updatePasswordCode}
                      onChange={(e) => setUpdatePasswordCode(e.target.value)}
                    />
                    <button type="button" onClick={() => {
                      if (generatedCode === updatePasswordCode) {
                        setUpdatePasswordCodeError("")
                        setUpdatePasswordCorrect(true)
                      }
                      else {
                        setUpdatePasswordCodeError("Wrong code")
                      }
                    }}>Confirm</button>

                  </div>
                )}


              </div>


            </div>
          )}



        </div>
      ) :

        (<div className="login">
          <h2 className='page-head'>Login</h2>
          <form onSubmit={handleLogin} className='form-container'>

            {loginError && <div className='form-error-container'><p className='error'>{loginError}</p></div>}
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <div className="remember-forgot">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember Me
              </label >

              <p onClick={() => {
                showForgotPassword(true)
              }}> Forgot Password?</p>
            </div>

            <button type="submit" onClick={() => {










            }}>{loadingLogin ? <i className="fa-solid fa-spinner fa-spin spinner"></i> : <p> Login</p>}</button>
          </form>
        </div>)}
    </div>

  );
};

export default Login;
