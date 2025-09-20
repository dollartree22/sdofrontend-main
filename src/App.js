import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Login from './pages/login.jsx';
import NotFound from './components/NotFound.jsx';
import State from './context/state.js';
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import { useJwt } from "react-jwt"
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
  const { decodedToken, isExpired } = useJwt(localStorage.getItem('login-Dollar-tree-token'));

  useEffect(() => {
    const token = localStorage.getItem('login-Dollar-tree-token');
    if (token && decodedToken && !isExpired) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
      localStorage.removeItem('login-Dollar-tree-token');
    }
  }, [decodedToken, isExpired]);

  return (
    <div className="appbody">
      <State>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={!loggedin ? <Login /> : <Navigate to="/" />} />
            <Route path="/forgetpass" element={!loggedin ? <ForgetPass /> : <Navigate to="/" />} />
            <Route path="/resetpass" element={!loggedin ? <Resetpass /> : <Navigate to="/" />} />
            
            {/* Protected routes */}
            <Route path="/" element={loggedin ? (
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            ) : <Navigate to="/login" />} />
            
            <Route path="/profile" element={loggedin ? (
              <>
                <Navbar />
                <Profile />
                <Footer />
              </>
            ) : <Navigate to="/login" />} />
            
            {/* Add other protected routes similarly */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ToastContainer />
        </Router>
      </State>
    </div>
  );
};

export default App;