import React, { useState, useRef, useEffect } from 'react';
//import countriesData from './countriesData'; // Import the dataset for countries, states, and cities
import '../styles/Registration.css';
import Dashboard from './Dashboard';
import dataFetch from '../modules/dataFetch';

const RegistrationPage = () => {

  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const regButton = useRef(null);
  const regConfirmDiv = useRef(null);
  const [isTandCisChecked, setTandC] = useState(false);
  const [isFrelancer, setFreelancer] = useState(false);

  const [formError, setFormError] = useState("");
  const [validationCodeError, setValidationCodeError] = useState("")
  const [loadingRegEmail, setLoadingRegEmail] = useState(false)
  const [loadingRegUser, setLoadingRegUser] = useState(false)

  const [generatedCode, setGeneratedCode] = useState("");

  const [regCodetime, setRegCodeTime] = useState(0); // 5 seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      timerInterval = setInterval(() => {
        if (regCodetime > 0) {
          setRegCodeTime((prevTime) => prevTime - 1);
        } else {
          clearInterval(timerInterval);
          setIsRunning(false);
        }
      }, 1000);
    } else {
      clearInterval(timerInterval);
      setIsCodeSent(false)
      setLoadingRegEmail(false)
      setEmailValidationCode("")

    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning, regCodetime]);


  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleStartTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handleStopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };




  function disableRegInputs() {
    firstName.current.disabled = true;
    lastName.current.disabled = true;
    email.current.disabled = true;
    password.current.disabled = true;
    confirmPassword.current.disabled = true;

  }
  function enableRegInputs() {
    firstName.current.disabled = false;
    lastName.current.disabled = false;
    email.current.disabled = false;
    password.current.disabled = false;
    confirmPassword.current.disabled = false;

  }












  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  // const [validationCode, setValidationCode] = useState('');
  let validationCode = "";
  const [emailValidationCode, setEmailValidationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);






  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.trim() // Trim the value to remove leading/trailing spaces
    }));
  };

  const handleSendCode = async () => {

    if (formData.firstName.trim().length === 0 || formData.lastName.trim().length === 0) {
      setFormError('First name and last name cannot be empty!');
      return;
    }
    else if ((formData.password !== formData.confirmPassword) || (formData.password.trim().length < 6 || formData.confirmPassword.trim().length <6)) {
      setFormError('Invalid password!\nPassword should be 6 or more characters');
      return;
    }
    else if (isFrelancer == false) {
      setFormError('Confirm that you want invest with us');
      return;
    }
    else if (isTandCisChecked == false) {
      setFormError('Read and accept the terms and condition');
      return;
    }
    else {
      setLoadingRegEmail(true);
     disableRegInputs()

      const requestData = {
        email: formData.email,
      };
      const url = 'http://localhost:4000/finduser';
      await dataFetch(url, requestData)
        .then((result) => {
          if (result.message == "found") {

            setFormError('This email is registered. Please Login');
            setLoadingRegEmail(false);
            enableRegInputs()
          }
          else {

            const randomCode = generateRandomCode()
            setGeneratedCode(randomCode);

            // console.log('Validation Code:', randomCode);
            // console.log(formData.firstName);
            // console.log(formData.email);

            //send code
            const requestData = {
              reciverName: formData.firstName,
              recieverEmail: formData.email,
              code: randomCode
            }


            setRegCodeTime(1800)
            const url = "http://localhost:4000/sendRegisterationCode"

            dataFetch(url, requestData)
              .then((result) => {

                if (result.message === "email-sent") {
                  setLoadingRegEmail(false);
                  setIsCodeSent(true)
                  setFormError("")
                  setValidationCodeError("")
                  validationCode = ""
                  handleStartTimer()
                }
                else {
                  setLoadingRegEmail(false);
                  //setFormError("An error occured while sending verification email")
                  setFormError(result.message)
                }

              })
              .catch(error => {
                setFormError("An error occured while sending verification email")
                
              })


          }
        })
        .catch(error => { })




    }
  };

  // ===================================REGISTER USER====================================




  async function registerNewUser() {
    setLoadingRegUser(true);
    if (emailValidationCode == generatedCode) {
      setValidationCodeError("")
      const requestData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      };
      const url = 'http://localhost:4000/registeruser';
      const result = await dataFetch(url, requestData)
      if (result.message == "registration-complete") {
        setLoadingRegUser(false)
        alert("Regstration Complete")
        window.location.assign("/login")
      }


    }
    else {
      setLoadingRegUser(false)
      setValidationCodeError("Incorrect code")
    }
  }

  const generateRandomCode = () => {
    // Generate a random 6-character validation code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };
  // =================================================================




  return (
    <div className='Section'>
      <div className='section-container'>
        <div className='section-container-left'>
          <h1>
            Join us today!
          </h1>
          <p>
            Own great domain names? Think they would sell? Then start earning! Appeal to potential customers with the right tools. And sell at a worthy price.
          </p>



        </div>
        <div className='section-container-right'>
          <form className='form-container' onSubmit={(event) => { event.preventDefault(); }}>
            {!isCodeSent ? (
              <div>
                {/* <div>{formError && <p className='error'>{formError}</p>}</div> */}

                {formError && <div className='form-error-container'><p className='error'><i class="fa-solid fa-circle-exclamation"></i> {formError}</p></div>}

                <div>
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    ref={firstName}
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    ref={lastName}
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    ref={email}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    ref={password}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    ref={confirmPassword}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='confrim-buttons'   >
                 

                  <label htmlFor='freelancer' className='checkbox-label'>
                    <input
                      type='checkbox'
                      name="freelancer"
                      checked={isFrelancer}
                      onChange={
                        () => {

                          setFreelancer(!isFrelancer);

                        }
                      }

                    />
                    I want to invest and I understand that investment is a risk.
                  </label>

                  <label>
                    <input type='checkbox'
                      name="terms"
                      checked={isTandCisChecked}
                      onChange={
                        () => {

                          setTandC(!isTandCisChecked);

                        }
                      }


                    />I have read the <a href='/#'>Terms and Conditions</a>
                  </label>

                  <button type="button" onClick={()=>{
                  if (!loadingRegEmail){handleSendCode()}
                }}>
                  {loadingRegEmail ? <i className="fa-solid fa-spinner fa-spin spinner"></i> : <p>Next</p>}</button>

                </div>
                
              </div>
            ) : (
              <div>
                
                {validationCodeError && <div className='form-error-container'><p className='error'><i class="fa-solid fa-circle-exclamation"></i> {validationCodeError}</p></div>}

                <label htmlFor="validationCode">Validation Code :</label>
                <input
                  type="text"
                  value={emailValidationCode}
                  onChange={(e) => setEmailValidationCode(e.target.value)}
                />
                <p>Please check your email</p>
                <h2><i className="fa-regular fa-bell fa-shake"></i> {formatTime(regCodetime)}</h2>
                <button type="button" onClick={() => {
                  if (!loadingRegUser){registerNewUser()}
                }} >
                  {loadingRegUser ? <i className="fa-solid fa-spinner fa-spin spinner"></i> : <p> Complete Registration</p>}</button>

              </div>
            )}


          </form>
        </div>
      </div >

    </div >
  );
};




export default RegistrationPage;
