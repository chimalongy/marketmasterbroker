
import "../styles/PlanCard.css"
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addPlan } from "../modules/redux/newPlanSlice";

const PlanCard = (props) => {

    const [showAmount, setShowAmount] = useState(false)
    const [paymentAmount, setPaymentAmount] = useState()
    const [amountError, setAmountError] = useState()

    const dispatch = useDispatch();

    return (
        <div className="Card">

            <div className="card-top">
                <div className="first-segment"></div>
                <div className="second-segment"></div>
                <div className="plan-name">
                    <i className="fa-solid fa-hand-holding-droplet"></i>
                    <p>{props.plantitle}</p>
                </div>
                <div className="third-segment">
                    <h1>{props.planpercentage}</h1>

                    <p>AFTER 7 DAYS</p>
                </div>

            </div>

            <div className="card-buttom">
                <div className="multi-detail border-buttomed">
                    <p>Minimum: </p>
                    <p>{props.mincash}</p>
                </div>

                <div className="multi-detail border-buttomed">
                    <p>Maximum: </p>
                    <p>{props.maxcash}</p>
                </div>

                {/* <p className="Ref-commison">Ref Commission:</p>
                <p>{props.refcommision}</p> */}
                <p className="border-buttomed">PRINCIPAL RETURN</p>
                {/* we want to display the button only when clicked */}
                {!showAmount ? (
                    <button className="plan-button" onClick={() => {
                        const issUserLoggedin = !!localStorage.getItem("token");

                        if (issUserLoggedin || props.realParent=="yes") { setShowAmount(true) }
                        else if (issUserLoggedin || props.realParent !=="yes") { window.location.assign('/user')  }
                        else {
                            window.location.assign('/login')
                        }

                    }}>INVEST NOW</button>
                ) : (<></>)}

                {
                    showAmount ? (
                        <div className="showPay">
                            <input
                                type="number"
                                value={paymentAmount}
                                onChange={(e) => { setPaymentAmount(e.target.value); setAmountError("") }}
                                min={props.mincash}
                                max={props.maxcash}
                                placeholder={`amount ${props.mincash} - ${props.maxcash} `}
                                required
                            />
                            {amountError && <p className="error">{amountError}</p>}

                            <button onClick={() => {
                                if ((!paymentAmount) || (paymentAmount < props.mincash || paymentAmount > props.maxcash)) {
                                    setAmountError("invalid amount")
                                }
                                else {
                                    setAmountError("")
                                    const Plan = {
                                        planType: props.plantitle,
                                        minimum: props.mincash,
                                        maximum: props.maxcash,
                                        percentage: props.planpercentage,
                                        duration: 7,
                                        Amount: paymentAmount
                                    }

                                    dispatch(addPlan(Plan))
                                    props.pay()
                                }
                            }}>Pay</button>
                            <button onClick={() => { setShowAmount(false) }}>Cancel</button>

                        </div>
                    ) : (<></>)
                }


            </div>


        </div>

    );
}

export default PlanCard;