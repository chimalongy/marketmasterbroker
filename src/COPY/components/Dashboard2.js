import React, { useState, useEffect, useRef } from 'react'
import "../styles/Dashboard2.css"
import dataFetch from '../modules/dataFetch';
import axios from "axios"
import UserHome from './UserHome';
import UserInvest from './UserInvest';
import UserWithdraw from './UserWithdraw';
import UserTransaction from './UserTransaction';
import UserSettings from './UserSettings';



function Dashboard2() {
    const [brightTheme, setBrightTheme] = useState(true)
    const [tabContent, setTabContent] = useState()
    const [tabTittle, setTabTittle] = useState("")
    const [tabDescription, setTabDescription] = useState("")
    

    function  removeActive(){
            UHome.current.classList.remove("active")
            UInvestments.current.classList.remove("active")
            UWithdrawals.current.classList.remove("active")
            UTransactions.current.classList.remove("active")
            USettings.current.classList.remove("active")
    }

    const UHome= useRef();
    const UInvestments= useRef();
    const UWithdrawals= useRef();
    const UTransactions= useRef();
    const USettings= useRef();
    
    

    

    function switchTheme() {
        setBrightTheme(!brightTheme)
    }
    return (
        <div className='dashboard-tab'>
            <div className='dashboard-left'>
                    <ul>
                        <li ref={UHome} onClick={()=>{
                            setTabContent( <UserHome/>)
                            setTabTittle("Dashboard")
                            setTabDescription("Welcome to your dashboard")
                            removeActive();
                            UHome.current.classList.add("active")

                        }}>
                            Dashboard
                        </li>
                        <li ref={UInvestments} onClick={()=>{
                            setTabContent(<UserInvest/>)
                            setTabTittle("Investmentss")
                            setTabDescription("See all your investments in one page")
                            removeActive();
                            UInvestments.current.classList.add("active")
                        }}>
                            Investments
                        </li>
                        <li ref={UWithdrawals} onClick={()=>{
                            setTabContent(<UserWithdraw/>)
                            setTabTittle("Withdrawls")
                            removeActive();
                            UWithdrawals.current.classList.add("active")
                        }}>
                            Widthrawls

                        </li>
                        <li ref={UTransactions} onClick={()=>{
                            setTabContent(<UserTransaction/>)
                            setTabTittle("Transactions")
                            setTabDescription("See all your past and pending transcations")
                            removeActive();
                            UTransactions.current.classList.add("active")
                        }}>
                           Transactions
                        </li>
                        <li ref={USettings} onClick={()=>{
                            setTabContent(<UserSettings/>)
                            setTabTittle("Settings")
                            setTabDescription("Make changes to your accont here")
                            removeActive();
                            USettings.current.classList.add("active")
                        }}>
                            
                            Settings
                        </li>
                    </ul>


            </div>
            <div className='dashboard-right'>
                <div className='dashboard-controls'>
                    <div className='theme-selector'>
                        {brightTheme ? (<i class="fa-solid fa-sun dashboard-small-icon" onClick={() => { switchTheme() }}></i>) : (<i className="fa-solid fa-moon dashboard-small-icon" onClick={() => { switchTheme() }}></i>)}
                    </div>
                    <i class="fa-solid fa-bell dashboard-small-icon"></i>
                    <i class="fa-solid fa-gear dashboard-small-icon"></i>
                    <i class="fa-solid fa-user dashboard-small-icon"></i>
                </div>

                <div className='dashboard-title'>
                    <h1>{tabTittle}</h1>
                    <p>{tabDescription}</p>
                </div>

                <div className='dashboard-content'>
                  
                 {tabContent}

                </div>
            </div>



        </div>
    )
}

export default Dashboard2