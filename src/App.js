
import { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/routes/Home';
import RegistrationPage from './components/routes/Registration';
import Login from './components/routes/Login';
import Plans from "./components/Plans"

import TextCarousel from './components/TextCarousel';
import Dashboard from './components/routes/Dashboard';
import Footer from './components/Footer';
import Contact from './components/routes/Contact';
import FrequentlyAskedQuestions from './components/routes/FrequentlyAskedQuestions';
import { Route, Routes } from 'react-router-dom';
import PlansPage from './components/routes/PlansPage';
import Privacypolicy from "./components/Privacypolicy"
import TOS from "./components/TOS";
import RefundPolicy from "./components/Refundpolicy";
import { checkCookie } from './utils/constants';
import AdminMain from './components/AdminMain';

import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS
import About from './components/routes/About';
import Services from './components/routes/Services';

function App() {
  // useEffect(() => {
  //   // Load the LiveCoinWatch script
  //   const script = document.createElement('script');
  //   script.src = 'https://www.livecoinwatch.com/static/lcw-widget.js';
  //   script.defer = true;
  //   document.body.appendChild(script);

    

  //   return () => {
  //     // Clean up on unmount
  //     document.body.removeChild(script);
  //   };
  // }, []);
  
  useEffect(() => {
    AOS.init(); // Initialize AOS library
  }, []);

  // useEffect(() => {
  //   // Load the TradingView script
  //   const script = document.createElement('script');
  //   script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
  //   script.async = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     // Clean up on unmount
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <div className="App">
      {checkCookie("usersession") ? (
        <>
          <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
          </Routes>
         
        </>
      ) : (
        <>
           <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About/>} />
        <Route path="/services" element= {<Services/>} />
        <Route path="/register" element={< RegistrationPage />} />
        <Route path="/login" element={< Login />} />
        <Route path="/plans" element={<PlansPage/>} />
        <Route path="/privacypolicy" element={<Privacypolicy/>} />
        <Route path="/termsofservice" element={<TOS/>} />
        <Route path="/refundpolicy" element={<RefundPolicy/>} />
        <Route path="/admin" element={<AdminMain />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer/>
        </>
      )}

      
    
    </div>
  );
}

export default App;
