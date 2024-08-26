import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "../styles/Payment.css"
import CreditCardForm from './CreditCardForm';
import QRCodeGenerator from './QRCodeGenerator';
import dataFetch from '../modules/dataFetch';

function Payment(props) {
    const user = useSelector((state) => state.user.userData);
    const plan = useSelector((state) => state.newPlan.newPlan);
    const [cardPayment, setCardPayment] = useState(false)
    const [crytoPayment, setCryptoPayment] = useState(false)
    const [confirmDetails, setconfirmDetails] = useState(false)
    const [cryptoPaid, setCryptoPaid] = useState(false);
    const [paymentMethodSelect, setPaymentMethodSelect] = useState(true);
    const [uploadingPayment, setUploadingPayment] = useState(false);
    const [uploadingComplete, setUploadingComplete] = useState(false);
    const cryptoScreenShotInputRef = useRef(null);
    let cryptoWalletAddress = "Hello, World! This is a QR code with a string."; // Your string data
    function copyCryptoAddress() {
        navigator.clipboard.writeText(cryptoWalletAddress);
    }

    const handleCryptoPaymentCheckbox = () => {
        setCryptoPaid(!cryptoPaid);

    };

    const handleCryptoUploadButton = () => {
        cryptoScreenShotInputRef.current.click();
    };

    const handleCryptoScreenShotUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            // Handle the selected file here, for example, upload it to a server.
            console.log('Selected file:', selectedFile);
            //RegisterPayment(selectedFile, "crypto");

            let requestData={
                ownerAccount:user.email,
                paymentMethod:"crypto",
                plan:plan.planType,
                percentage:plan.percentage,
                duration: plan.duration,
                Amount: plan.Amount
            }
             console.log (requestData)
            const url = 'http://localhost:4000/registerPay';
            dataFetch(url, requestData)
            .then((result) => {
                if (result.message=="registration-complete"){
                         setUploadingPayment(true)
                       
                        setTimeout(()=>{
                            setUploadingComplete(true)
                            setTimeout(()=>{
                                props.closePay()
                            },2000)
                        },3000)
                }
                else{
                    console.log(result.message)
                }
            })
            .catch(err=>console.log(err))

        }
    };
    return (
        <div className='payment'>
            <div className='payment-details'>
                <h3>Payer Details:</h3>
                <div>
                    <p><b>Payer Name:</b> {user.firstName + " " + user.lastName}</p>
                    <p><b>Email Address:</b> {user.email}</p>
                    <p><b>Payment for: </b>{plan.planType}</p>
                    <p><b>Amount: </b> ${plan.Amount}</p>
                </div>
                <div className='payment-controls'>
                    <button onClick={() => {
                        setconfirmDetails(true)
                    }}>Confirm</button>
                    <button>Cancel Payment</button>
                </div>
            </div>

            {confirmDetails ? (<div className='payment-sector'>
                <h3>Select Payment Method:</h3>
                <div className='pay-container'>
                    { paymentMethodSelect?(
                        <div className='pay-options'>
                        <div className='pay-opt' onClick={() => {
                            setCryptoPayment(false)
                            setCardPayment(true)
                           setPaymentMethodSelect(false)
                        }}><i class="fa-regular fa-credit-card payicon"></i> </div>
                        <div className='pay-opt' onClick={() => {
                            setCryptoPayment(true)
                            setCardPayment(false)
                            setPaymentMethodSelect(false)
                        }} ><i class="fa-brands fa-bitcoin payicon" ></i></div>
                    </div>
                    ):(<></>)}
                    <div>
                        {cardPayment ? (
                            <div className='pay-opt-container'><CreditCardForm /></div>
                        ) : (<></>)}
                        {crytoPayment ? (
                            <div className='pay-opt-container'>
                                <div className='crypto-addres-detail'>
                                    <p>{cryptoWalletAddress}</p>
                                    <button onClick={copyCryptoAddress}> <i className="fa-solid fa-copy payicon"></i> Copy</button>

                                </div>
                                <div className='qr-code-cointainer'>
                                    <QRCodeGenerator text={cryptoWalletAddress} />
                                </div>

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={cryptoPaid}
                                        onChange={handleCryptoPaymentCheckbox}
                                    />
                                    I have made payment
                                </label>

                                {cryptoPaid ? (
                                    <div className='uploadcontrols'>
                                       {uploadingPayment ? (
                                       <>
                                         {uploadingComplete?(<div className='payment-confirmation-container'>
                                            <i class="fa-regular fa-circle-check payment-confirmation-icon"></i>
                                            <p>Uploaded</p>
                                         </div>):(<div className='payment-confirmation-container'>
                                            <i class="fa-solid fa-circle-notch fa-spin payment-confirmation-icon"></i>
                                            <p>Uploading</p>
                                         </div>)}
                                       </>):(<>
                                        <button onClick={handleCryptoUploadButton} className='uploadbutton'>Upload Reciept</button>
                                        <input
                                            type="file"
                                            ref={cryptoScreenShotInputRef}
                                            accept=".jpg, .jpeg, .png, .gif"
                                            style={{ display: 'none' }}
                                            onChange={handleCryptoScreenShotUpload}
                                        />
                                       </>)}
                                    </div>) :
                                    (<></>)}
                            </div>
                        ) : (<></>)}

                    </div>
                </div>
            </div>) :

                (<>

                </>)}


        </div>
    )
}

export default Payment