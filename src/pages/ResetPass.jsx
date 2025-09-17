import React, { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const Resetpass = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND;
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // from reset link

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const res = await axios.post(`${BASE_URL}/resetpassword`, { token, password });
      if (res.data.success) {
        toast.success("Password reset successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    }
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
                  <button type='submit' className="btn mt-4">Submit</button>
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
