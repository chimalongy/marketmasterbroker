import React, { useState } from 'react'
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { baseurl, setCookie, getCookie } from "../utils/constants";
import axios from 'axios';
export default function AdminMain() {
      
      const [adminLogged, setAdminLogged] = useState(false);
     

    
  return (
    <div>
        {adminLogged?(<AdminDashboard />):(<AdminLogin logAdmin ={setAdminLogged} />)}
    </div>
  )
}
