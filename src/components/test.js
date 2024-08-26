function UserComponent({user, index}){

    return(
      <div className="funds-container">
        <h1 style={{fontSize:"20px"}}>{user.email}</h1>
        <button style={{backgroundColor:`${user.AccountStatus=="ACTIVE"? "blue":"grey"}`}} 
        onClick={()=>{if(user.AccountStatus=="ACTIVE"){
          disableAccount(user);
        }
        }}>{disablingAccount? <i class="fa-solid fa-spinner fa-spin"></i>:"Disable User"}</button>
                      <details>
                        <summary>Controls</summary>

                        <div>
                          {user.KycStatus==2 && <button onClick={()=>{confirmKYC(user)}}>{confirmingKYC ? <i class="fa-solid fa-spinner fa-spin"></i> : "Confirm Kyc Status"}</button>}
                          {user.IRSACTIVATED=="FALSE" && <button onClick={()=>{confirmIRS(user)}}>{loadingIRS ? <i class="fa-solid fa-spinner fa-spin"></i> :"Activate IRS"}</button>}

                        </div>

                      </details>
                      
                       {/* <details>
                        <summary>Investments</summary>
                        <div>
                          {
                          allInvestments.filter((investment)=>(investment.email == user.email)).map((investment)=>(
                            <div className="investment-card">
                              <p>Plan: {investment.plan}</p>
                              <p>Amount: {investment.amount}</p>
                             <div>
                             <p>Status: {investment.status}</p>
                             <p>Screenshot</p><button onClick={()=>{ handleOpenModal(investment.screenshot)}}>open</button>
                             </div>
                              <p>Payment Method: {investment.paymentmethod}</p>
                              
                              {
                                investment.status=="PENDING"? (<button style={{width:"100%"}}
                                onClick={()=>{
                                      approveinvestment(investment, user)
                                }}  
                                >{loadingingInvestment?(<i class="fa-solid fa-spinner fa-spin"></i>):("Approve Investment")}</button>):("")
                              }

                              
                            </div>
                          ))
                          }
                        </div>
                       </details> */}

                       <details>
                        <summary>Transactions</summary>
                        <div>
                          {
                          allTransactions.filter((transaction)=>(transaction.email == user.email)).map((transaction)=>(
                            <div className="investment-card">
                              <p>ID: {transaction.transactionID}</p>
                              <p>Amount: ${transaction.Amount}</p>
                              <p>Type: {transaction.type}</p>
                              <p>Date:  {transaction.date}</p>
                              <p>Status: {transaction.status}</p>
                              <p>Screenshot</p><button onClick={()=>{ handleOpenModal(transaction.screenshot)}}>open</button>

                              {
                                transaction.type=="DEPOSIT"&&transaction.status=="PENDING"? (<button style={{width:"100%"}}
                                onClick={()=>{
                                       approveDeposit(transaction, user)
                                }}  
                                >
                                  {approvingDeposit?(<i class="fa-solid fa-spinner fa-spin"></i>):("Approve Deposit")}
                                </button>):("")
                              }
                              {
                                transaction.transactiontype=="WITHDRAWAL"&&transaction.status=="PENDING"? (<button style={{width:"100%"}}
                                onClick={()=>{
                                      approveWithdrawal(transaction, user)
                                }}  
                                >
                                  {approvingWithdrawl?(<i class="fa-solid fa-spinner fa-spin"></i>):("Approve Withdrawal")}
                                </button>):("")
                              }

                              
                            </div>
                          ))
                          }
                        </div>
                       </details>



                        <details>
                          <summary>More Details</summary>
                          <div className="details-container">
                            <p>
                              <b>First Name: </b>
                              {user.firstName}
                            </p>
                            <p>
                              <b>Last Name: </b>
                              {user.lastName}
                            </p>
                            <p>
                              <b>Status: </b>
                              {user.AccountStatus}
                            </p>
                            
                            <p>
                              <b>Address: </b>
                              {user.useraddress}
                            </p>
                            <p>
                              <b>Country: </b>
                              {user.country}
                            </p>
                            <p>
                              <b>LicenseActivated: </b>
                              {user.LicenseActivated}
                            </p>
                            <p>
                              <b>IRSACTIVATED </b>
                              {user.IRSACTIVATED}
                            </p>

                           
                          </div>
                        </details>
                      </div>
    )

  }