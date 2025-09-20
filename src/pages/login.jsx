import React, { useState, useEffect } from 'react';
import "./login.css";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate } from 'react-router-dom';

const Login = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [referral, setReferral] = useState("");
  const [display, setDisplay] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Login API
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("login-Dollar-tree-token", json.token);
        toast.success("Login Successful");
        navigate("/");
        window.location.reload();
      } else {
        toast.error(json.message || "Login Failed");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
    setLoginLoading(false);
  };

  // Register API
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: regEmail,
          password: regPassword,
          referral
        })
      });
      
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("login-Dollar-tree-token", json.token);
        toast.success("Registration Successful");
        navigate("/");
        window.location.reload();
      } else {
        toast.error(json.message || "Registration Failed");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
    setRegisterLoading(false);
  };

  // Referral Code from URL
  useEffect(() => {
    const referralLink = searchParams.get("r");
    if (referralLink) {
      setReferral(referralLink);
    }
    setTimeout(() => setDisplay(true), 100);
  }, [searchParams]);

  return (
    <div className='login'>
      {display && (
        <div className="section">
          <div className="container">
            <div className="row full-height justify-content-center">
              <div className="col-12 text-center align-self-center py-5">
                <div className="section pb-5 pt-5 pt-sm-2 text-center">
                  <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                  <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                  <label htmlFor="reg-log"></label>
                  <div className="card-3d-wrap mx-auto">
                    <div className="card-3d-wrapper">

                      {/* Login */}
                      <div className="card-front">
                        <div className="center-wrap">
                          <form onSubmit={handleLoginSubmit} className="section text-center">
                            <h4 className="mb-4 pb-3">Log In</h4>
                            <div className="form-group">
                              <input type="email" className="form-style" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input type="password" className="form-style" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button type='submit' className="btn mt-4" disabled={loginLoading}>
                              {loginLoading ? "Logging in..." : "Login"}
                            </button>
                            <p className="m-0 text-center"><a href="/forgetpass" className="link">Forgot your password?</a></p>
                          </form>
                        </div>
                      </div>

                      {/* Register */}
                      <div className="card-back">
                        <div className="center-wrap">
                          <form onSubmit={handleRegisterSubmit} className="section text-center">
                            <h4 className="mb-3 pb-3">Sign Up</h4>
                            <div className="form-group">
                              <input type="text" className="form-style" placeholder="Full Name" required value={name} onChange={(e) => setName(e.target.value)} />
                              <i className="input-icon uil uil-user"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input type="email" className="form-style" placeholder="Email" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input type="password" className="form-style" placeholder="Password" required value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input type="text" className="form-style" placeholder="Referral Code (optional)" value={referral} onChange={(e) => setReferral(e.target.value)} />
                              <i style={{ fontWeight: "900", fontStyle: "normal" }} className="input-icon fa-users-between-lines font-family-awesome"></i>
                            </div>
                            <button type='submit' className="btn mt-4" disabled={registerLoading}>
                              {registerLoading ? "Registering..." : "Register"}
                            </button>
                          </form>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;