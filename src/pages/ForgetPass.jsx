import React, { useContext, useState } from 'react'
import context from '../context/context'

const Otp = () => {
    const a = useContext(context);
    const sendotp = a.sendotp
    const verifyotp = a.verifyotp
    const [otp, setotp] = useState("")
    const [email, setemail] = useState("")
    const handleotpsubmit = (e) => {
        e.preventDefault()
        verifyotp({ otp })
    }
    const otphandler = (e) => {
        if (!email) {
            alert("Please enter Email")
        } else {
            sendotp({ email })
        }
    }
    return (
        <div className='login'>
            <div class="section">
                <div class="container">
                    <div class="row full-height justify-content-center">
                        <div class="col-12 text-center align-self-center py-5">
                            <div class="section pb-5 pt-5 pt-sm-2 text-center">
                                <input class="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                <label for="reg-log" className='d-none'></label>
                                <div class="card-3d-wrap mx-auto">
                                    <div class="card-3d-wrapper">
                                        <div class="card-front">
                                            <div class="center-wrap">
                                                <form onSubmit={handleotpsubmit} class="section text-center">
                                                    <h4 class="mb-4 pb-3">Verify Email</h4>

                                                    <div class="form-group mt-2 d-flex">
                                                        <input type="text" class="form-style" placeholder="Email" required={true} value={email} onChange={(e) => { setemail(e.target.value) }} />
                                                        <i class="input-icon uil uil-at"></i>
                                                        <button onClick={otphandler} type='button' className="btn otpBtn mx-2 ">Get Otp</button>

                                                    </div>

                                                    <div class="form-group mt-2">
                                                        <input type="text" class="form-style" placeholder="OTP" required={true} value={otp} onChange={(e) => { setotp(e.target.value) }} />
                                                        <i class="input-icon uil uil-at"></i>

                                                    </div>
                                                    <button type='submit' class="btn mt-4">Submit</button>
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
        </div>
    )
}

export default Otp