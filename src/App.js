import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Terms from './pages/terms';
import Deposit from './pages/Deposit';
import Account from './pages/Account.jsx';
import History from './pages/History';
import Refferals from './pages/Refferals.jsx';


const App = () => {
  const [loggedin, setLoggedin] = useState(false);
  const { decodedToken } = useJwt(localStorage.getItem('login-Dollar-tree-token'));

  useEffect(() => {
    if (decodedToken?.id) {
      setLoggedin(true)
    }
    // const isHttp = window.location.protocol === "http:";
    // if(isHttp){window.location=`https://${window.location.host}${window.location.pathname}`}
  }, [decodedToken]);

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

