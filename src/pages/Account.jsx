import React, { useContext, useEffect, useState } from 'react'
import "./profile.css"
import context from '../context/context'
import { toast } from 'react-toastify';
import Loading from '../components/loading';

const Account = () => {
    const a = useContext(context);
    const { getme, updatepassword, updateme, loading, me } = a;
    const [email, setemail] = useState("");
    const [name, setname] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [cpassword, setcpassword] = useState("");
    const [oldpassword, setoldpassword] = useState("");
    const [wallet_address, setwallet_address] = useState("");
    const [fpassword, setfpassword] = useState('')
    const [cfpassword, setcfpassword] = useState('')
    
    // ✅ Fixed useEffect - runs only once on component mount
    useEffect(() => {
        getme()
    }, [getme]); // Empty dependency array

    // ✅ Update form fields when me data changes
    useEffect(() => {
    if (me) {
        setemail(me.email || "");
        setname(me.name || "");
        if (me.wallet_address) {
            setwallet_address(me.wallet_address);
        }
    }
}, [me]);


    const handlechangepass = async () => {
        if (cpassword !== newpassword) {
            toast.error("Confirm Password Does not match", {
                position: "top-center",
            });
            return
        }
        if (newpassword.length < 6) {
            toast.error("Password Length Should be at least 6", {
                position: "top-center",
            });
            return
        }
        
        const result = await updatepassword({ 
            oldpassword: oldpassword, 
            newpassword: newpassword 
        });
        
        if (result) {
            setnewpassword("")
            setoldpassword("")
            setcpassword("")
        }
    }

    const handlechangepass2 = async () => {
        if (fpassword !== cfpassword) {
            toast.error("Funding Password Do not match", {
                position: "top-center"
            });
            return
        }
        
        const result = await updatepassword({ 
            oldpassword: oldpassword, 
            fpassword: fpassword 
        });
        
        if (result) {
            setoldpassword("")
            setfpassword('')
            setcfpassword('')
        }
    }

    const handleupdateprofile = () => {
        updateme({ name, email, wallet_address });
    }
    
    return (
        <div className='container accountback' style={{ marginTop: "100px", minHeight: "80vh" }}>
            {loading ? <Loading /> : (
                <div className="row">
                    <div className="col-12">
                        <div className="my-5">
                            <h3>My Profile</h3>
                            <hr />
                        </div>
                        
                        {/* Profile Update Section */}
                        <div className="file-upload">
                            <form>
                                <div className="row mb-3 gx-5">
                                    <div className="col-xxl-8 mb-5 mb-xxl-0">
                                        <div className="bg-secondary-soft px-4 py-5 rounded">
                                            <div className="row g-3">
                                                <h4 className="mb-4 mt-0">Contact detail</h4>
                                                <div className="col-md-6">
                                                    <label className="form-label">Name *</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="John Doe"
                                                        value={name}
                                                        onChange={(e) => setname(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label">Email *</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        value={email}
                                                        onChange={(e) => setemail(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label className="form-label">Wallet Address *</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="USDT(BEP20)"
                                                        value={wallet_address}
                                                        onChange={(e) => setwallet_address(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row mb-2 gx-5">
                                    <div className="gap-3 d-md-flex justify-content-md-end text-center">
                                        <button onClick={handleupdateprofile} type="button" className="btn btn-primary">
                                            Update profile
                                        </button>
                                    </div>
                                </div>
                            </form>
                            
                            {/* Change Login Password */}
                            <div className="col-xxl-6 mt-4">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="my-4">Change Password</h4>
                                        <div className="col-md-6">
                                            <label className="form-label">Old password *</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={oldpassword}
                                                onChange={(e) => setoldpassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">New password *</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={newpassword}
                                                onChange={(e) => setnewpassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Confirm Password *</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={cpassword}
                                                onChange={(e) => setcpassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="gap-3 d-md-flex justify-content-md-end text-center mt-3">
                                    <button type="button" onClick={handlechangepass} className="btn btn-primary">
                                        Change Password
                                    </button>
                                </div>
                            </div>
                            
                            {/* Change Funding Password */}
                            <div className="col-xxl-6 mt-4">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="my-4">Change Funding Password</h4>
                                        <div className="col-md-6">
                                            <label className="form-label">Login password *</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={oldpassword}
                                                onChange={(e) => setoldpassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">New Funding password *</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={fpassword}
                                                onChange={(e) => setfpassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Confirm Funding Password *</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={cfpassword}
                                                onChange={(e) => setcfpassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="gap-3 d-md-flex justify-content-md-end text-center mt-3">
                                    <button type="button" onClick={handlechangepass2} className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Account