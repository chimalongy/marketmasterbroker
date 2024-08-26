
import "../styles/PlanCard.css"
import { useState } from "react";
import { checkCookie } from '../utils/constants';

const PlanCard = ({plantitle,planpercentage,days, mincash,maxcash}) => {

    const [showAmount, setShowAmount] = useState(false)
    const [paymentAmount, setPaymentAmount] = useState()
    const [amountError, setAmountError] = useState()
    

    

    return (
        <div className="Plan-Card">

            <div className="card-top">
                <div className="first-segment"></div>
                <div className="second-segment"></div>
                <div className="plan-name">
                    <i className="fa-solid fa-hand-holding-droplet"></i>
                    <p>{plantitle}</p>
                </div>
                <div className="third-segment">
                    <h1>{planpercentage}</h1>

                    <p>{days}</p>
                </div>

            </div>

            <div className="card-buttom">
                <div className="multi-detail border-buttomed">
                    <p>Minimum: </p>
                    <p>{mincash}</p>
                </div>

                <div className="multi-detail border-buttomed">
                    <p>Maximum: </p>
                    <p>{maxcash}</p>
                </div>

                <div className="multi-detail border-buttomed ">
                    <p className="investment-details"><i class="fa-regular fa-circle-check"></i>FX </p>
                    <p className="investment-details"><i class="fa-regular fa-circle-check"></i>Gold </p>
                    <p className="investment-details"><i class="fa-regular fa-circle-check"></i>Bitcoin </p>
                    
                </div>

                
                {!showAmount ? (
                    <button className="button-div" 
                    onClick={()=>{
                        if (checkCookie("usersession")){
                            setShowAmount(true)
                        }
                    }}

                >INVEST NOW</button>
                ) : (<></>)}

                {
                    showAmount ? (
                        <div className="showPay">
                            <input
                                type="number"
                                value={paymentAmount}
                                onChange={(e) => { setPaymentAmount(e.target.value); setAmountError("") }}
                                min={mincash}
                                max={maxcash}
                                placeholder={`amount ${mincash} - ${maxcash} `}
                                required
                            />
                            {amountError && <p className="error">{amountError}</p>}

                            <button 

                               className="planpaybutton"    >Pay</button>
                            <button  className="planpaybutton"  onClick={() => { setShowAmount(false) }}>Cancel</button>

                        </div>
                    ) : (<></>)
                }


            </div>


        </div>

    );
}

export default PlanCard;