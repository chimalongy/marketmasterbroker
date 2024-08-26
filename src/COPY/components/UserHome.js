import React from 'react'
import TradingViewWidget from 'react-tradingview-widget';
import "../styles/UserHome.css"
import { useDispatch, useSelector } from 'react-redux';

function UserHome() {
    const user = useSelector((state) => state.user.userData);
    let profits =0;  let dailypercentage = 0; let walletBalance = 0; let daysElapsed=false;
    function test(){
        console.log(user.CurrentPlan)
        console.log(user.firstName)
        console.log(user.lastName)
    }
    function calculateDaysElapsed(givenDateStr) {
        const givenDate = new Date(givenDateStr);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - givenDate.getTime();
        const daysElapsed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      
        return daysElapsed; 
      }
    function getWalletBalance(data) {

       
    
       let daysElapsed = calculateDaysElapsed(data.DateOfCurrentInvestment)
       if (daysElapsed>7){
        daysElapsed=7
       }
    
        
       
        
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
      getWalletBalance(user);
    return (
        <div className='user-home'>
            <div className='top-dash'>

                <div className='top-dash-item'>
                    <div className='top-dash-item-header' >
                        <div>
                            <p>Wallet Balance</p>
                            <h3>${getWalletBalance(user)}</h3>
                        </div>
                        <i class="fa-solid fa-wallet dashboard-header-icon"></i>
                    </div>
                    {/* <div className='top-dash-item-body'>
                        <div>
                            <p><b></b></p>
                            <p className="top-dash-item-body-tittle">none</p>
                        </div>
                        <div>
                            <p><b>title</b></p>
                            <p className="top-dash-item-body-tittle">value</p>
                        </div>
                    </div> */}
                </div>
                <div className='top-dash-item'>
                    <div className='top-dash-item-header' >
                        <div>
                            <p>Investments</p>
                            <h3>${user.AmountInvested}</h3>
                        </div>
                        <i class="fa-solid fa-money-bills dashboard-header-icon"></i>
                    </div>
                    <div className='top-dash-item-body'>
                        <div>
                            <p><b>Current Plan</b></p>
                            <p className="top-dash-item-body-tittle">{user.CurrentPlan}</p>
                        </div>
                        <div>
                            <p><b>Date</b></p>
                            <p className="top-dash-item-body-tittle">{user.DateOfCurrentInvestment}</p>
                        </div>
                    </div>
                </div>
                <div className='top-dash-item'>
                    <div className='top-dash-item-header' >
                        <div>
                            <p>Withdrawals</p>
                            <h3>0</h3>
                        </div>
                        <i class="fa-solid fa-money-bill-transfer dashboard-header-icon"></i>
                        
                    </div>
                    <div className='top-dash-item-body'>
                        
                        <div>
                            <p><b>Can Withdraw</b></p>
                            <p className="top-dash-item-body-tittle">value</p>
                        </div>
                        <div>
                            <button>Withdraw</button>
                        </div>
                    </div>
                </div>
                <div className='top-dash-item'>
                    <div className='top-dash-item-header' >
                        <div>
                            <p>Profits</p>
                            <h3>{ profits  =()=>{
                               return getWalletBalance(user)- user.AmountInvested
                             }}</h3>
                        </div>
                        <i class="fa-solid fa-chart-simple dashboard-header-icon"></i>
                        
                    </div>
                    <div className='top-dash-item-body'>
                        <div>
                            <p><b>Yesterday</b></p>
                            <p className="top-dash-item-body-tittle">value</p>
                        </div>
                        <div>
                            <p><b>This week</b></p>
                            <p className="top-dash-item-body-tittle">value</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className='dash-section-2'>
                <div className='dash-section-2-wide'>

                    {/* <TradingViewWidget
                        symbol="BINANCE:BTCUSDT" // Example: Bitcoin (BTC) to USDT on Binance
                        locale="fr"
                        autosize
                    /> */}


                </div>
                <div className='dash-section-2-slim'>
                    <table className="transaction-table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Amount (BTC)</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Incoming</td>
                                <td>0.5</td>
                                <td>2023-06-20</td>
                            </tr>
                            <tr>
                                <td>Outgoing</td>
                                <td>0.2</td>
                                <td>2023-06-18</td>
                            </tr>
                            <tr>
                                <td>Incoming</td>
                                <td>1.0</td>
                                <td>2023-06-17</td>
                            </tr>
                            <tr>
                                <td>Outgoing</td>
                                <td>0.8</td>
                                <td>2023-06-15</td>
                            </tr>
                            <tr>
                                <td>Incoming</td>
                                <td>0.3</td>
                                <td>2023-06-14</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserHome