import React, { useContext, useState } from 'react'
import context from '../context/context'

const Resetpass = () => {
    const a = useContext(context);
    const resetpass = a.resetpassword
    const [password, setpassword] = useState("")
    const [cpassword, setcpassword] = useState("")
    const handleloginsubmit = (e) => {
        e.preventDefault()
        if (cpassword !== password) {
            alert("Please make sure both passwords Match")
        } else {
            resetpass({ password })
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
                                                <form onSubmit={handleloginsubmit} class="section text-center">
                                                    <h4 class="mb-4 pb-3">New password</h4>
                                                    <div class="form-group mt-2">
                                                        <input type="password" class="form-style" placeholder="Password" required={true} value={password} onChange={(e) => { setpassword(e.target.value) }} />
                                                        <i class="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <div class="form-group mt-2">
                                                        <input type="password" class="form-style" placeholder="Confirm Password" required={true} value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />
                                                        <i class="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <button href="#" type='submit' class="btn mt-4">Submit</button>
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

export default Resetpass