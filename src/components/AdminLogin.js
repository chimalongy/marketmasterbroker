import React, { useState } from 'react'

function AdminLogin(props) {

    let [loginError, setLogingError]= useState("")
    let [loadingLogin, setLoadingLogin]=useState(false)
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")

    function verifyInputs(){
         
        if (!email.trim()){
            setLogingError("Email is required");
            return false
        }
       else if (!password.trim()){
            setLogingError("Passowrd is required");
            return false
        }
        else{return true} 

    }
    function handleAdminLogin(){
        setLoadingLogin(true);

        if (verifyInputs){
            if (email !=="admin@MarketMasterBroker.com"){
                setLogingError("Invalid admin email")
            }
            else if (password !== "marketmaster1122"){
                setLogingError("Wrong password")
            }
            else{
                
                props.logAdmin(true)
            }
        }



    }
  return (
    <div style={{color:"darkblue"}}>
          <div className="login">
                    <h2 className='Theader'>Login</h2>
                    <form onSubmit={handleAdminLogin} className='form-container'>

                        {loginError && <div className='form-error-container'><p className='error'><i class="fa-solid fa-circle-exclamation"></i> {loginError}</p></div>}

                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{color:"darkblue"}}
                            />

                        </div>

                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{color:"darkblue"}}
                            />

                        </div>

                       

                        <button type="submit" onClick={() => {
                        }}>{loadingLogin ? <i className="fa-solid fa-spinner fa-spin spinner"></i> : <p> Login</p>}</button>

                       

                    </form>


                </div>
    </div>
  )
}

export default AdminLogin