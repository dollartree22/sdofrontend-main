import React, { useState } from 'react';
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForget = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/user/forgetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
      
      const json = await response.json();
      if (json.success) {
        toast.success("Password reset link sent to your email!");
      } else {
        toast.error(json.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="login">
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h4 className="mb-4 pb-3">Forgot Password</h4>
                <form onSubmit={handleForget}>
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
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;