import React, { useEffect, useState } from 'react';
import context from './context.js';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
const host = process.env.REACT_APP_BACKEND;

const State = (props) => {
  const [loading, setloading] = useState(false)
  const [dataloading, setdataloading] = useState(false)
  const [me, setme] = useState({});
  const [plans, setplans] = useState([]);
  const [analytics, setanalytics] = useState({});
  const [withdraws, setwithdraws] = useState([])
  const [rewards, setrewards] = useState([])
  const [refferals, setrefferals] = useState([])
  const [deposits, setdeposits] = useState([])

 const login = async (data) => {
    setloading(true)
    try {
      const response = await fetch(`${host}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('login-Dollar-tree-token', json.token)
        Swal.fire("Welcome to Dollar Tree Investments!", "At Dollar Tree, we're all about helping you grow your money and reach your financial goals. We offer smart, easy-to-understand investment opportunities that are designed to fit your needs. Whether you're just getting started or have experience in investing, we're here to guide you every step of the way. Our team is dedicated to finding the right opportunities for you, with a focus on steady growth and smart choices. Let's build your future together!", 'info').then(() => {
          window.location.reload()
        });
      } else {
        toast.error(json.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setloading(false)
  }
  const register = async (data) => {
    setloading(true)
    try {
      const response = await fetch(`${host}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('otp-login-token')
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('login-Dollar-tree-token', json.token)
        window.location.reload()
      } else {
        toast.error(json.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setloading(false)
  }
  const resetpassword = async (data) => {
    setloading(true)
    try {
      const response = await fetch(`${host}/api/user/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("otp-login-token")
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      if (json.success) {
        toast.success(json.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return true
      } else {
        toast.error(json.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return false
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false
    }
    setloading(false)
  }
  const updatepassword = async (data) => {
    setloading(true)
    try {
      const response = await fetch(`${host}/api/user/updatepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("login-Dollar-tree-token")
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      if (json.success) {
        toast.success(json.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return true
      } else {
        toast.error(json.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return false
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false
    }
    setloading(false)
  }
  const updateme = async (data) => {
    setloading(true)
    try {
      const response = await fetch(`${host}/api/user/updateme`, { // Fixed endpoint from upateme to updateme
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("login-Dollar-tree-token")
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      if (json.success) {
        toast.success("Updated Successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return true
      } else {
        toast.error(json.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return false
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false
    }
    setloading(false)
  }
  const getme = async () => {
    setdataloading(true)
    try {
      const response = await fetch(`${host}/api/user/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("login-Dollar-tree-token")
        }
      })
      const json = await response.json();
      if (json.success) {
        setme(json.user)
        setanalytics(json.data)
      } else {
        toast.error(json.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setdataloading(false)
  }
  //Customer
  // Upload Image
  const uploadimg = async (data) => {
    try {
      const response = await fetch(`${host}/api/user/upload`, {
        method: "post",
        headers: {
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "GET",
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("login-Dollar-tree-token")
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      if (json.success) {
        return { success: true, data: json.data }
      } else {
        toast.error(json.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return { success: false }
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  // Delete Image
  const delimg = async (data) => {
    try {
      const response = await fetch(`${host}/api/user/upload`, {
        method: "delete",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("login-Dollar-tree-token")
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
    } catch (error) {
      console.log(error)
    }
  }
// FIXED joinplan function
const joinplan = async (data) => {
  setloading(true);
  try {
    const response = await fetch(`${host}/api/plan/`, {
      method: "POST", // Uppercase
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('login-Dollar-tree-token')
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json = await response.json();
    setloading(false);
    
    if (json.success) {
      toast.success("Plan Joined Successfully!", {
        position: "top-center"
      });
      await getme(); // Refresh user data
      return true;
    } else {
      toast.error(json.message || "Failed to join plan", {
        position: "top-center"
      });
      return false;
    }
  } catch (error) {
    setloading(false);
    toast.error("Network error. Please try again.", {
      position: "top-center"
    });
    console.error("Join plan error:", error);
    return false;
  }
}

// FIXED updateplan function
const updateplan = async (data) => {
  setloading(true);
  try {
    const response = await fetch(`${host}/api/plan/`, {
      method: "PUT", // Uppercase - CRITICAL FIX
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('login-Dollar-tree-token')
        // Remove redundant CORS headers
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json = await response.json();
    setloading(false);
    
    if (json.success) {
      toast.success("Plan Updated Successfully!", {
        position: "top-center"
      });
      await getme(); // Refresh user data
      return true;
    } else {
      toast.error(json.message || "Failed to update plan", {
        position: "top-center"
      });
      return false;
    }
  } catch (error) {
    setloading(false);
    toast.error("Network error. Please try again.", {
      position: "top-center"
    });
    console.error("Update plan error:", error);
    return false;
  }
}

// FIXED getallplans function
const getallplans = async () => { 
  try {
    const response = await fetch(`${host}/api/plan/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('login-Dollar-tree-token')
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json = await response.json();
    
    if (json.success) {
      setplans(json.data || []); // Ensure array
    } else {
      toast.error(json.message || "Failed to load plans", {
        position: "top-center"
      });
    }
  } catch (error) {
    toast.error("Network error. Please try again.", {
      position: "top-center"
    });
    console.error("Get plans error:", error);
  }
}


  const Withdraw = async (data) => {
    const response = await fetch(`${host}/api/transaction/withdraw`, {
      method: "post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('login-Dollar-tree-token')
      },
      body: JSON.stringify(data)
    })
    const json = await response.json();
    if (json.success) {
      toast.success("Withdraw Request is sent! you will get your funds in 1-72 hrs", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error(json.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  const getmywithdraws = async (data) => {
    const response = await fetch(`${host}/api/transaction/withdraw`, {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('login-Dollar-tree-token')
      }
    })
    const json = await response.json();
    if (json.success) {
      setwithdraws(json.data)
    } else {
      toast.error(json.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  const getmyrewards = async (data) => {
    const response = await fetch(`${host}/api/transaction/reward`, {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('login-Dollar-tree-token')
      }
    })
    const json = await response.json();
    if (json.success) {
      setrewards(json.data)
    } else {
      toast.error(json.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  const getmydeposits = async (data) => {
    const response = await fetch(`${host}/api/transaction/deposit`, {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('login-Dollar-tree-token')
      }
    })
    const json = await response.json();
    if (json.success) {
      setdeposits(json.data)
    } else {
      toast.error(json.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  const deposit = async (data) => {
    const response = await fetch(`${host}/api/transaction/deposit`, {
      method: "post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('login-Dollar-tree-token')
      },
      body: JSON.stringify(data)
    })
    const json = await response.json();
    if (json.success) {
      toast.success("Deposit Request is sent!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error(json.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  const getreferrals = async () => {
    setloading(true)
    const response = await fetch(`${host}/api/user/referrals/${me._id}`, {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('login-Dollar-tree-token')
      }
    })
    const json = await response.json();
    if (json.success) {
      setrefferals(json.data)
    } else {
      toast.error(json.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setloading(false)
  }
  const startMining = async (data) => {
    setloading(true)
    const response = await fetch(`${host}/api/plan/startmining`, {
      method: "post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('login-Dollar-tree-token')
      }
    })
    const json = await response.json();
    setloading(false)
    if (json.success) {
      toast.success("Mining started Successfully!", {
        position: "top-center",
        time:3000
      })
      setTimeout(()=>{window.location.reload()},3000)
      return true
    } else {
      toast.error(json.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false
    }
  }
  return (
    <context.Provider value={{
      updatepassword, getreferrals, refferals, startMining,
      updateplan, getmywithdraws, withdraws, deposits, rewards, getmydeposits, getmyrewards,
      register, getallplans, plans, deposit, Withdraw, joinplan, analytics,
      uploadimg, delimg, updateme, login,
      loading, getme, me, resetpassword, dataloading
    }}>
      {props.children}
    </context.Provider>
  )
} 

export default State