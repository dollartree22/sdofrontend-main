import React, { useContext, useState } from 'react'
import "./login.css"
import context from '../context/context';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
const Login = () => {
    const a = useContext(context)
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const [name, setname] = useState("")
    const [remail, setremail] = useState("");
    const [otp, setotp] = useState("")
    const [rpassword, setrpassword] = useState("")
    const [referral, setreferral] = useState()
    const [display, setdisplay] = useState(false);
    const [otploading, setotploading] = useState(false)
    const [searchParams] = useSearchParams(); // Get URL parameters
    const login = a.login
    const sendregotp = a.sendregotp
    const register = a.register
    const handleloginsubmit = (e) => {
        e.preventDefault();
        login({ email, password })
    }
    const handleregistersubmit = (e) => {
        e.preventDefault();
        register({ email: remail, password: rpassword, name, referral, otp })
    }
    useEffect(() => {
        const referralLink = searchParams.get("r"); // Extract 'r' from URL
        if (referralLink) {
            setreferral(referralLink)
        }
        setTimeout(() => {
            setdisplay(true)
        }, 100);
    }, [])
    const isOtpbtnDisabled = !remail?.trim() || otploading || !remail.includes('@') || !remail.includes('.');
    // Otp timer 

    const [otpTimer, setOtpTimer] = useState(60); // Timer starts at 60 seconds
    const [isOtpsent, setisOtpsent] = useState(false)

    // Function to start the timer and decrement the countdown
    const startOtpTimer = () => {
        setOtpTimer(60); // Reset the timer to 60 seconds
    };
    useEffect(() => {
        // If the timer is greater than 0 and the button is disabled, decrement the timer every second
        let interval;
        if (otpTimer > 0 && isOtpsent) {
            interval = setInterval(() => {
                setOtpTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [otpTimer, isOtpsent]);
    useEffect(() => {
        // When the timer reaches 0, enable the "Get Otp" button again
        if (otpTimer === 0) {
            setisOtpsent(false);
        }
    }, [otpTimer]);

    const handleGetOtp = async () => {
        setotploading(true)
        const response = await sendregotp({ email: remail })
        // Start the timer and disable the button
        console.log(response)
        setotploading(false)
        if (response) {
            startOtpTimer();
            setisOtpsent(true);
        }
    };
    return (
        <>
            <div className='login'>
                {display ?
                    <div class="section">
                        <div class="container">
                            <div class="row full-height justify-content-center">
                                <div class="col-12 text-center align-self-center py-5">
                                    <div class="section pb-5 pt-5 pt-sm-2 text-center">
                                        <h6 class="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                                        <input class="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                        <label for="reg-log"></label>
                                        <div class="card-3d-wrap mx-auto">
                                            <div class="card-3d-wrapper">
                                                <div class="card-front">
                                                    <div class="center-wrap">
                                                        <form onSubmit={handleloginsubmit} class="section text-center">
                                                            <h4 class="mb-4 pb-3">Log In</h4>
                                                            <div class="form-group">
                                                                <input type="email" class="form-style" placeholder="Email" required={true} value={email} onChange={(e) => { setemail(e.target.value) }} />
                                                                <i class="input-icon uil uil-at"></i>
                                                            </div>
                                                            <div class="form-group mt-2">
                                                                <input type="password" class="form-style" placeholder="Password" required={true} value={password} onChange={(e) => { setpassword(e.target.value) }} />
                                                                <i class="input-icon uil uil-lock-alt"></i>
                                                            </div>
                                                            <button href="#" type='submit' class="btn mt-4">Login</button>
                                                            <p class="m-0 text-center"><a href="/forgetpass" class="link">Forgot your password?</a></p>

                                                        </form>
                                                    </div>
                                                </div>
                                                <div class="card-back">
                                                    <div class="center-wrap">
                                                        <form onSubmit={handleregistersubmit} class="section text-center">
                                                            <h4 class="mb-3 pb-3">Sign Up</h4>
                                                            <div class="form-group">
                                                                <input type="text" class="form-style" required={true} placeholder="Full Name" value={name} onChange={(e) => { setname(e.target.value) }} />
                                                                <i class="input-icon uil uil-user"></i>
                                                            </div>
                                                            <div class="form-group mt-2 d-flex">
                                                                <input type="email" class="form-style" placeholder="Email" required={true} value={remail} onChange={(e) => { setremail(e.target.value) }} />
                                                                <i class="input-icon uil uil-at"></i>
                                                                <button onClick={handleGetOtp} type='button' className="btn otpBtn mx-2 " disabled={isOtpbtnDisabled || isOtpsent}>{otploading ? 'Loading...' : isOtpsent ? `Resend OTP in ${otpTimer}s` : 'Get Otp'}</button>
                                                            </div>

                                                            <div class="form-group mt-2">
                                                                <input type="text" class="form-style" placeholder="OTP" required={true} value={otp} onChange={(e) => { setotp(e.target.value) }} />
                                                                <i class="input-icon uil uil-at"></i>

                                                            </div>
                                                            <div class="form-group mt-2">
                                                                <input type="password" required={true} class="form-style" placeholder="Password" value={rpassword} onChange={(e) => { setrpassword(e.target.value) }} />
                                                                <i class="input-icon uil uil-lock-alt"></i>
                                                            </div>
                                                            <div class="form-group mt-2">
                                                                <input type="text" required={false} class="form-style" placeholder="Refferal Code(optional)" value={referral} onChange={(e) => { setreferral(e.target.value) }} />
                                                                <i style={{ fontWeight: "900", fontStyle: "normal" }} className="input-icon fa-users-between-lines font-family-awesome"></i>
                                                            </div>
                                                            <button type='submit' href="#" class="btn mt-4">Register</button>
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
                    : ""}
            </div>
        </>

    )
}

export default Login



