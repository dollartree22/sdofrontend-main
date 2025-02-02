import React, { useContext, useEffect, useState } from 'react'
import ReactSwitch from 'react-switch'
import "./profile.css"
import context from '../context/context'
import { toast } from 'react-toastify';
import Loading from '../components/loading';

const Profile = () => {
  const a = useContext(context);
  const getme = a.getme;
  const updatepassword = a.updatepassword;
  const updateme = a.updateme;
  const loading = a.dataloading;
  const me = a.me;
  const [email, setemail] = useState("");
  const [ach_payment_method, setach_payment_method] = useState(false);
  const [api_key, setapi_key] = useState("");
  const [name, setname] = useState("");
  const [company_name, setcompany_name] = useState("");
  const [company_address, setcompany_address] = useState("");
  const [newpassword, setnewpassword] = useState("")
  const [cpassword, setcpassword] = useState("")
  const [oldpassword, setoldpassword] = useState("")

  useEffect(() => {
    getme()
  }, []);

  useEffect(() => {
    setach_payment_method(me.ach_payment_method);
    setemail(me.email);
    setapi_key(me.api_key);
    setcompany_address(me.company_address);
    setname(me.name);
    setcompany_name(me.company_name)
  }, [me])

  const handlechangepass = async () => {
    if (cpassword !== newpassword) {
      toast.error("Confirm Password Does not match", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return
    }
    if (newpassword.length < 8) {
      toast.error("Password Length Should be at least 8", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
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
  const handleupdateprofile = () => {
    updateme({ name, email, ach_payment_method, api_key, company_address, company_name });
  }
  return (
    <div className="container my-4">
      {
       loading? <Loading/>:<div className="row">
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
                         value={name}
                         onChange={(e) => setname(e.target.value)}
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
                         onChange={(e) => setemail(e.target.value)}
                         required
                       />
                     </div>
                   </div>{" "}
                   <div className="row mt-3">
                     <div className="col-md-6">
                       <label className="form-label">Api key *</label>
                       <input
                         type="text"
                         className="form-control"
                         placeholder="Key of cardknox"
                         value={api_key}
                         onChange={(e) => setapi_key(e.target.value)}
                         required
                       />
                     </div>
                     {/* Switch of true/false */}
                     <div className="col-md-6 achswitch mt-3">
                       <label htmlFor="achPaymentSwitch" className="form-label">
                         Ach Payment method
                       </label>
                       <ReactSwitch
                         id="achPaymentSwitch"
                         onChange={(value) => setach_payment_method(value)}
                         checked={ach_payment_method}
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
               <div className="col-xxl-6 mb-5 mb-xxl-0">
                 <div className="bg-secondary-soft px-4 py-5 rounded">
                   <div className="row g-3">
                     <h4 className="mb-4 mt-0">Company Details</h4>
                     {/* Company Details */}
                     <div className="col-md-6">
                       <label className="form-label">
                         <i class="fa-solid fa-building fa-lg"></i>
                         <span className='mx-2'>Company Name</span>
                       </label>
                       <input
                         type="text"
                         className="form-control"
                         placeholder="Example LLC"
                         value={company_name}
                         onChange={(e) => setcompany_name(e.target.value)}
                         required
                       />
                     </div>
                     {/*  */}
                     <div className="col-md-6">
                       <label className="form-label">
                         <i className="fa-regular fa-address-book fa-flip-horizontal fa-lg"></i>
                         <span className='mx-2'>Company Address</span>
                       </label>
                       <input
                         type="text"
                         className="form-control"
                         placeholder="123 Main Street
                       Anytown, USA 12345"
                         value={company_address}
                         onChange={(e) => setcompany_address(e.target.value)}
                         required
                       />
                     </div>
                   </div>{" "}
                   {/* Row END */}
                 </div>
               </div>
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
                 <div className="col-md-12">
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
         {/* Row END */}
         {/* button */}
         <div className="gap-3 d-md-flex justify-content-md-end text-center">
           <button type="button" onClick={handlechangepass} className="btn btn-primary">
             Change Password
           </button>
         </div>
       </div>{" "}
       {/* Form END */}
     </div>
      }
      
    </div>

  )
}

export default Profile