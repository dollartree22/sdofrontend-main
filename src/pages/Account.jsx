import React, { useContext, useEffect, useState } from 'react'
import ReactSwitch from 'react-switch'
import "./profile.css"
import context from '../context/context'
import { toast } from 'react-toastify';
import Loading from '../components/loading';

const Account = () => {
    const a = useContext(context);
    const getme = a.getme;
    const updatepassword = a.updatepassword;
    const updateme = a.updateme;
    const loading = a.dataloading;
    const me = a.me;
    const [email, setemail] = useState("");
    const [name, setname] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [cpassword, setcpassword] = useState("");
    const [oldpassword, setoldpassword] = useState("");
    const [wallet_address, setwallet_address] = useState("");
    const [fpassword, setfpassword] = useState('')
    const [cfpassword, setcfpassword] = useState('')
    useEffect(() => {
        getme()
    }, []);

    useEffect(() => {
        setemail(me.email);
        setwallet_address(me.wallet_address);
        setname(me.name);
    }, [me])

    const handlechangepass = async () => {
        if (cpassword !== newpassword) {
            toast.error("Confirm Password Does not match", {
                position: "top-center",
            });
            return
        }
        if (newpassword.length < 8) {
            toast.error("Password Length Should be at least 8", {
                position: "top-center",
            });
            return
        }
        const result = await updatepassword({ newpassword, oldpassword });
        if (result) {
            setnewpassword("")
            setoldpassword("")
            setcpassword("")
        }
    }
    const handlechangepass2 = async () => {
        if (fpassword!==cfpassword) {
            toast.error("Funding Password Do not match", {
                position: "top-center"
            });
            return
        }
        const result = await updatepassword({ oldpassword,fpassword });
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
            {
                loading ? <Loading /> : <div className="row">
                    <div className="col-12">
                        <div className="my-5">
                            <h3>My Profile</h3>
                            <hr />
                        </div>
                        <div className="file-upload">
                            <form action="">
                                <div className="row mb-3 gx-5">
                                    {/* Contact detail */}
                                    <div className="col-xxl-8 mb-5 mb-xxl-0">
                                        <div className="bg-secondary-soft px-4 py-5 rounded">
                                            <div className="row g-3">
                                                <h4 className="mb-4 mt-0">Contact detail</h4>
                                                {/* First Name */}
                                                <div className="col-md-6">
                                                    <label className="form-label">Name *</label>
                                                    <input
                                                        type="text"
                                                        name='name'
                                                        className="form-control"
                                                        placeholder="John Doe"
                                                        disabled
                                                        value={name}
                                                        required
                                                    />
                                                </div>
                                                {/* Email */}
                                                <div className="col-md-6">
                                                    <label htmlFor="inputEmail4" className="form-label">
                                                        Email *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="inputEmail4"
                                                        defaultValue="example@homerealty.com"
                                                        value={email}
                                                        disabled
                                                        required
                                                    />
                                                </div>
                                            </div>{" "}
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
                                            </div>{" "}
                                            {/* Row END */}
                                        </div>
                                    </div>
                                </div>{" "}
                                {/* Row END */}
                                {/* Social media detail */}
                                <div className="row mb-2 gx-5">
                                    <div className="gap-3 d-md-flex justify-content-md-end text-center">
                                        <button onClick={handleupdateprofile} type="button" className="btn btn-primary">
                                            Update profile
                                        </button>
                                    </div>
                                </div>
                            </form>
                            {/* change password */}
                            <div className="col-xxl-6">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="my-4">Change Password</h4>
                                        {/* Old password */}
                                        <div className="col-md-6">
                                            <label htmlFor="exampleInputPassword1" className="form-label">
                                                Old password *
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                value={oldpassword}
                                                onChange={(e) => setoldpassword(e.target.value)}
                                            />
                                        </div>
                                        {/* New password */}
                                        <div className="col-md-6">
                                            <label htmlFor="exampleInputPassword2" className="form-label">
                                                New password *
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword2"
                                                value={newpassword}
                                                onChange={(e) => setnewpassword(e.target.value)}
                                            />
                                        </div>
                                        {/* Confirm password */}
                                        <div className="col-md-6">
                                            <label htmlFor="exampleInputPassword3" className="form-label">
                                                Confirm Password *
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="exampleInputPassword3"
                                                value={cpassword}
                                                onChange={(e) => setcpassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>{" "}
                        {/* button */}
                        <div className="gap-3 d-md-flex justify-content-md-end text-center">
                            <button type="button" onClick={handlechangepass} className="btn btn-primary">
                                Change Password
                            </button>
                        </div>
                        {/*Funding pass  */}
                        <div className="col-xxl-6">
                            <div className="bg-secondary-soft px-4 py-5 rounded">
                                <div className="row g-3">
                                    <h4 className="my-4">Change Funding Password</h4>
                                    {/* Old password */}
                                    <div className="col-md-6">
                                        <label htmlFor="exampleInputPassword1" className="form-label">
                                            Login password *
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            value={oldpassword}
                                            onChange={(e) => setoldpassword(e.target.value)}
                                        />
                                    </div>
                                    {/* New password */}
                                    <div className="col-md-6">
                                        <label htmlFor="exampleInputPassword2" className="form-label">
                                            New Funding password *
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword2"
                                            value={fpassword}
                                            onChange={(e) => setfpassword(e.target.value)}
                                        />
                                    </div>
                                    {/* Confirm password */}
                                    <div className="col-md-6">
                                        <label htmlFor="exampleInputPassword3" className="form-label">
                                            Confirm Funding Password *
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword3"
                                            value={cfpassword}
                                            onChange={(e) => setcfpassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{" "}
                    {/* Form END */}
                    <div className="gap-3 d-md-flex justify-content-md-end text-center">
                        <button type="button" onClick={handlechangepass2} className="btn btn-primary">
                           Submit
                        </button>
                    </div>
                </div>
            }

        </div>

    )
}

export default Account