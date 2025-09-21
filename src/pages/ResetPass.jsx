import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPass = ({ email, token }) => {
  const BASE_URL = process.env.REACT_APP_BACKEND;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/user/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          token: token, 
          newpassword: newPassword 
        })
      });
      
      const json = await response.json();
      if (json.success) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(json.message || "Failed to reset password");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className='login'>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h4 className="mb-4 pb-3">Set New Password for {email}</h4>
                <form onSubmit={handleSubmit} className="section text-center">
                  <div className="form-group mt-2">
                    <input 
                      type="password" 
                      className="form-style" 
                      placeholder="New Password" 
                      required 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                    />
                    <i className="input-icon uil uil-lock-alt"></i>
                  </div>
                  <div className="form-group mt-2">
                    <input 
                      type="password" 
                      className="form-style" 
                      placeholder="Confirm New Password" 
                      required 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                    <i className="input-icon uil uil-lock-alt"></i>
                  </div>
                  <button type='submit' className="btn mt-4" disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPass;