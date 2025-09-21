import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Login from './pages/login.jsx';
import NotFound from './components/NotFound.jsx';
import State from './context/state.js';
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
// import { useJwt } from "react-jwt"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ForgetPass from './pages/ForgetPass';
import Resetpass from './pages/ResetPass';
import Footer from './components/Footer';
import Policy from './pages/policy.jsx';
import Terms from './pages/terms.jsx';
import Deposit from './pages/Deposit.jsx';
import Account from './pages/Account.jsx';
import History from './pages/History.jsx'; 
import Refferals from './pages/Refferals.jsx';
 
const App = () => {
  const [loggedin, setLoggedin] = useState(false);
  
  // Safe token retrieval with null check
  const token = localStorage.getItem('login-Dollar-tree-token');
 
  useEffect(() => {
    console.log("Token check:", token);
    // Simple check - if token exists, consider user logged in
    if (token) {
      console.log("Token exists, user logged in");
      setLoggedin(true);
    } else {
      console.log("No token, user not logged in");
      setLoggedin(false);
    }
  }, [token]);

  return (
    <div className="appbody">
      <State>
        <Router>
          {!loggedin ? (
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/forgetpass" element={<ForgetPass />} />
              <Route path="/resetpass" element={<Resetpass />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          ) : (
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/resetpass" element={<Resetpass />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/policy" element={<Policy />} />
                <Route path="/record" element={<History />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/account" element={<Account />} />
                <Route path="/refferals" element={<Refferals />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer/>
            </>
          )}

          <ToastContainer />
        </Router>
      </State>
    </div>
  );
};

export default App;