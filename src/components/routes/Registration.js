import React, { useState, useRef, useEffect } from "react";
//import countriesData from './countriesData'; // Import the dataset for countries, states, and cities
import "../../styles/Registration.css";
import axios from "axios";
import registerbkg from "../../images/register.jpg";
import { baseurl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { countryData } from "../../utils/CountryData";

const RegistrationPage = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryCurrency, setSelectedCountryCurrency] = useState("");
  const navmove = useNavigate();
  const userName = useRef(null);
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
  const [validationCodeError, setValidationCodeError] = useState("");
  const [loadingRegEmail, setLoadingRegEmail] = useState(false);
  const [loadingRegUser, setLoadingRegUser] = useState(false);

  const [generatedCode, setGeneratedCode] = useState("");

  const [regCodetime, setRegCodeTime] = useState(0); // 5 seconds
  const [isRunning, setIsRunning] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  function handleCountrySelect(e) {
    try {
      const countryIndex = countryData.findIndex(
        (obj) => obj.name === e.target.value
      );

      setSelectedCountryCurrency(countryData[countryIndex].currency.symbol);
      setSelectedCountry(e.target.value);
      console.log("Selected Country", e.target.value);
      console.log(
        "Selected Country Currency",
        countryData[countryIndex].currency.symbol
      );
    } catch (error) {
      setSelectedCountry("");
      setSelectedCountryCurrency("");
    }
  }

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
    firstName: "",
    lastName: "",
    address: "",
    mobilenumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    referer:"",
  });
  // const [validationCode, setValidationCode] = useState('');
  let validationCode = "";
  const [emailValidationCode, setEmailValidationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.trim(), // Trim the value to remove leading/trailing spaces
    }));
  };

  function verifyInputs() {
    let emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.firstName.trim() || formData.firstName.trim().length < 2) {
      setFormError("Invalid First Name");
      return false;
    } else if (
      !formData.username.trim() ||
      formData.username.trim().length < 2
    ) {
      setFormError("Invalid User Name");
      return false;
    } else if (
      !formData.lastName.trim() ||
      formData.lastName.trim().length < 2
    ) {
      setFormError("Invalid Last Name");
      return false;
    } else if (
      !formData.mobilenumber.trim() ||
      formData.mobilenumber.trim().length < 10
    ) {
      setFormError("Invalid Phone Number");
      return false;
    } else if (!formData.address.trim()) {
      setFormError("Address is Required");
      return false;
    } else if (!selectedCountry.trim()) {
      setFormError("Please select your Nationality");
      return false;
    } else if (!formData.email.trim() || !emailpattern.test(formData.email)) {
      setFormError("Invalid email");
      return false;
    } else if (!formData.password.trim() || formData.password.length < 8) {
      setFormError(
        "Invalid Passowrd. Password should be atleast 8 characters long."
      );
      return false;
    } else if (
      !formData.confirmPassword.trim() ||
      formData.confirmPassword.length < 8
    ) {
      setFormError(
        "Invalid Passowrd Confirmation. Password should be atleast 8 characters long."
      );
      return false;
    } else if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return false;
    } else if (isTandCisChecked == false) {
      setFormError("Read and accept the terms and condition");
      return false;
    } else {
      setFormError("");
      return true;
    }
  }

  const handleSendCode = async () => {
    if (verifyInputs()) {
      setLoadingRegEmail(true);
      disableRegInputs();
      const randomCode = generateRandomCode();
      setGeneratedCode(randomCode);
      const requestData = {
        requestTask: "sendRegsitrationOTP",
        recipientName: formData.firstName,
        email: formData.email,
        OTP: randomCode,
      };

      const result = await axios.post(baseurl, requestData);
      console.log(result.data);

      if (result.data.trim() == "error") {
        setFormError("An error occured. Please try again.");
        setLoadingRegEmail(false);
        enableRegInputs();
      } else if (result.data.trim() == "userfound") {
        setFormError("This email is registered. Please Login");
        setLoadingRegEmail(false);
        enableRegInputs();
      } else if (result.data.trim() === "email-sent") {
        
        setLoadingRegEmail(false);
        setIsCodeSent(true);
        setFormError("");
        setValidationCodeError("");
      } else {
        setLoadingRegEmail(false);
      }
    }
  };
  function generateBankAccountNumber() {
    let accountNumber = "";
    for (let i = 0; i < 10; i++) {
      accountNumber += Math.floor(Math.random() * 10);
    }
    return accountNumber;
  }

  // ===================================REGISTER USER====================================

  async function registerNewUser() {
    setLoadingRegUser(true);

    if (emailValidationCode == generatedCode) {
      setValidationCodeError("");

      const personalreferalcode = generateReferalCode();

      const requestData = {
        requestTask: "registernewuser",
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobilenumber: formData.mobilenumber,
        address: formData.address,
        country: selectedCountry,
        email: formData.email,
        password: formData.password,
        referer:formData.referer,
        referalcode:personalreferalcode
      };

      const result = await axios.post(baseurl, requestData);

      console.log(result.data);
      if (result.data.trim() == "registration-complete") {
        alert("Registration complete");
        setLoadingRegUser(false);

        navmove("/login");
      } else {
        setLoadingRegUser(false);
      }
    } else {
      setLoadingRegUser(false);
      setValidationCodeError("Incorrect code");
    }
  }

  const generateRandomCode = () => {
    // Generate a random 6-character validation code
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };
  const generateReferalCode = () => {
    // Generate a random 6-character validation code
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 9; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  // ================================= ================================

  return (
    <div className="login-contatiner dark-container">
      <div className="left">
        <h1
          className="sectionheader"
          data-aos="fade-in"
          data-aos-duration="2000"
          style={{ color: "#bfdbfe", marginBottom: "20px" }}
        >
          Join Us: Start Your Investment Journey Today!
        </h1>
        <p>{isCodeSent}</p>

        {!isCodeSent ? (
          <div className="login">
            <form
              className="form-container"
              onSubmit={(event) => {
                event.preventDefault();
              }}
              data-aos="slide-up-right"
              data-aos-duration="2000"
            >
              <div className="user-details">
                {formError && (
                  <div className="form-error-container">
                    <p className="error">
                      <i class="fa-solid fa-circle-exclamation"></i> {formError}
                    </p>
                  </div>
                )}

                <div className="user-details-container">
                  <div>
                    <label htmlFor="username" style={{ color: "#bfdbfe" }}>
                      User Name:
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      ref={userName}
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="firstName" style={{ color: "#bfdbfe" }}>
                      First Name:
                    </label>
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
                    <label htmlFor="lastName" style={{ color: "#bfdbfe" }}>
                      Last Name:
                    </label>
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
                    <label htmlFor="phone" style={{ color: "#bfdbfe" }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="mobilenumber"
                      name="mobilenumber"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      value={formData.mobilenumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="address" style={{ color: "#bfdbfe" }}>
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <h2 style={{ color: "#bfdbfe" }}>Country:</h2>
                    <select
                      value={selectedCountry}
                      onChange={handleCountrySelect}
                    >
                      <option value="">Select a country</option>
                      {countryData.map((country, index) => (
                        <option key={index} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="email" style={{ color: "#bfdbfe" }}>
                      Email:
                    </label>
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
                    <label htmlFor="password" style={{ color: "#bfdbfe" }}>
                      Password:
                    </label>
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
                    <label
                      htmlFor="confirmPassword"
                      style={{ color: "#bfdbfe" }}
                    >
                      Confirm Password:
                    </label>
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
                  <div>
                    <label
                      htmlFor="referer"
                      style={{ color: "#bfdbfe" }}
                    >
                      Refer (if any):
                    </label>
                    <input
                      type="text"
                      id="referer"
                      name="referer"
                      ref={confirmPassword}
                      value={formData.refer}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="confrim-buttons">
                    <div className="confirmation-checkbox">
                      <input
                        type="checkbox"
                        name="terms"
                        checked={isTandCisChecked}
                        onChange={() => {
                          setTandC(!isTandCisChecked);
                        }}
                      />
                      <p style={{ color: "#bfdbfe" }}>
                        {" "}
                        I have read the Terms and Condition{" "}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (!loadingRegEmail) {
                          handleSendCode();
                        }
                      }}
                    >
                      {loadingRegEmail ? (
                        <i className="fa-solid fa-spinner fa-spin spinner"></i>
                      ) : (
                        <p>Next</p>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="user-details login">
              {validationCodeError && (
                <div className="form-error-container">
                  <p className="error">
                    <i class="fa-solid fa-circle-exclamation"></i>{" "}
                    {validationCodeError}
                  </p>
                </div>
              )}

              <div>
                <label htmlFor="validationCode" style={{ color: "#bfdbfe" }}>
                  Validation Code :
                </label>
                <input
                  type="text"
                  value={emailValidationCode}
                  onChange={(e) => setEmailValidationCode(e.target.value)}
                />
                <p>Please check your email</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!loadingRegUser) {
                    registerNewUser();
                  }
                }}
              >
                {loadingRegUser ? (
                  <i className="fa-solid fa-spinner fa-spin spinner"></i>
                ) : (
                  <p> Complete Registration</p>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="right"></div>
    </div>
  );
};

export default RegistrationPage;
