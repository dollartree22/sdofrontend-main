import React, { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

const Resetpass = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND;
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      toast.error("Passwords do not match!");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/user/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, password })
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
                <h4 className="mb-4 pb-3">New Password</h4>
                <form onSubmit={handleSubmit} className="section text-center">
                  <div className="form-group mt-2">
                    <input type="password" className="form-style" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="form-group mt-2">
                    <input type="password" className="form-style" placeholder="Confirm Password" required value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
                  </div>
                  <button type='submit' className="btn mt-4" disabled={loading}>
                    {loading ? "Processing..." : "Submit"}
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

export default Resetpass;