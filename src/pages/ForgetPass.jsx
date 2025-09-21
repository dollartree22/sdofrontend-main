import React, { useState } from 'react';
import { toast } from "react-toastify";
import ResetPass from './ResetPass';

const ForgetPass = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [resetToken, setResetToken] = useState("");

  const handleEmailVerify = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/user/verifyemail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
      
      const json = await response.json();
      if (json.success) {
        toast.success("Email verified successfully");
        setEmailVerified(true);
        setResetToken(json.token); // Store token for password reset
      } else {
        toast.error(json.message || "Email not found");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
    setLoading(false);
  };

  // If email is verified, show password reset form
  if (emailVerified) {
    return <ResetPass email={email} token={resetToken} />;
  }

  return (
    <div className="login">
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h4 className="mb-4 pb-3">Verify Your Email</h4>
                <form onSubmit={handleEmailVerify}>
                  <div className="form-group mt-2">
                    <input 
                      type="email" 
                      className="form-style" 
                      placeholder="Enter your email" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                    <i className="input-icon uil uil-at"></i>
                  </div>
                  
                  <button type="submit" className="btn mt-4" disabled={loading}>
                    {loading ? "Verifying..." : "Verify Email"}
                  </button>
                </form>
                
                <p className="mt-3">
                  <a href="/login" className="link">Back to Login</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;