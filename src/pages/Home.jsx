import React, { useState, useContext, useEffect } from 'react';
import context from '../context/context';
import Loading from '../components/loading';
import "./home.css";
import PlanContainer from '../components/PlanContainer';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import MyPlan from "../components/MyPlan.jsx";
import MiningButton from '../components/Mining.jsx';

const Home = () => {
  const a = useContext(context);
  const analyticsdata = a.analytics || {};
  const loading = a.dataloading;
  const Withdraw = a.Withdraw;
  const me = a.me || {};
  const updateplan = a.updateplan;
  const joinplan = a.joinplan;
  const [showModal, setShowModal] = useState(false);
  const getallplans = a.getallplans;
  const [update, setupdate] = useState(false);
  const [updateableplan, setupdateableplan] = useState([]);
  const plans = a.plans || [];

  useEffect(() => {
    getallplans();
  }, [getallplans]); // Added getallplans to dependency array

  const handleFormSubmit = () => {
    if (!formData.amount || formData.amount < 10) {
      toast.error('Minimum Amount $10');
      return;
    }
    if (!formData.password) {
      toast.error('Please enter your password');
      return;
    }
    Withdraw(formData);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState({
    amount: 0,
    password: ""
  });

  const handleModalClose = () => {
    setFormData({
      amount: 0,
      password: ""
    });
    setShowModal(false);
  }

  // Modal 2
  const [amount, setamount] = useState(50);
  const [id, setid] = useState();
  const [showModal2, setshowModal2] = useState(false);
  
  const handleModal2Close = () => {
    setamount(50);
    setshowModal2(false);
    setupdate(false);
  }
  
  const handleForm2Submit = async () => {
    if (!amount || amount < 50) {
      toast.error('Minimum amount is $50');
      return;
    }
    
    const totalBalance = (me.balance || 0) + (me.locked_amount || 0);
    if (totalBalance < amount) {
      toast.error('Insufficient balance');
      return;
    }
    
    let response;
    if (update) {
      response = await updateplan({ amount, id });
    } else {
      response = await joinplan({ amount, id });
    }
    if (response) {
      window.location.reload();
    }
  };

  // Modal 3
  const [showModal3, setshowModal3] = useState(false);
  
  const handleShowModal = () => {
    setshowModal3(true);
    const currentPlanDuration = me.membership?.plan?.duration || 0;
    setupdateableplan(plans.filter((plan) => plan.duration > currentPlanDuration));
    setupdate(true);
  }
  
  const handleCloseModal = () => {
    setshowModal3(false);
    setupdate(false);
  }
  
  function copyToClipboard(text) {
    if (!text) return;
    
    // Create a temporary input element to copy the text
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    toast.success('Copied to clipboard!');
  }

  return (
    <div style={{ minHeight: "70vh", marginTop: "100px" }} className='container homeback'>
      {loading ? <Loading /> : (
        <>
          <h2 className='py-3'>Dashboard</h2>
          <div className="container-fluid px-4">
            <div style={{ gap: "10px", flexWrap: "wrap" }} className='mb-4 d-flex'>
              <div className="btn" onClick={() => window.location.href = "/deposit"}>
                <span className='btnText'>Deposit</span>
                <i className="fa-solid fa-plus fa-xl" style={{ color: "white" }}></i>
              </div>
              <div className="btn" onClick={() => {
                if (!me.wallet_address) {
                  toast.error("Please Add your wallet address to continue!", {
                    position: "top-center",
                    theme: "dark"
                  });
                  return;
                }
                setShowModal(true);
              }}>
                <span className='btnText'>Withdraw</span>
                <i className="fa-solid fa-money-bill-transfer fa-xl" style={{ color: "white" }}></i>
              </div>
            </div>
            
            <div className="row g-4">
              <div className="analyticsbox">
                <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-chart-line fa-3x maincolor"></i>
                  <div className="ms-3">
                    <h5 className="mb-2">Total Balance</h5>
                    <h4 className="mb-0">&nbsp;&nbsp;(${((me.balance || 0) + (me.locked_amount || 0))?.toFixed(2)})</h4>
                  </div>
                </div>
              </div>
              
              <div className="analyticsbox">
                <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-chart-bar fa-3x maincolor"></i>
                  <div className="ms-3">
                    <h5 className="mb-2">Total Deposit</h5>
                    <h4 className="mb-0">&nbsp;&nbsp;(${(me.locked_amount || 0)?.toFixed(2)})</h4>
                  </div>
                </div>
              </div>
              
              <div className="analyticsbox">
                <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-chart-area fa-3x maincolor"></i>
                  <div className="ms-3">
                    <h5 className="mb-2">Withdraw Available</h5>
                    <h4 className="mb-0">&nbsp;&nbsp;(${(me.balance || 0)?.toFixed(2)})</h4>
                  </div>
                </div>
              </div>
              
              <div className="analyticsbox">
                <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-chart-pie fa-3x maincolor"></i>
                  <div className="ms-3">
                    <h5 className="mb-2">Today's Profit</h5>
                    <h4 className="mb-0">&nbsp;&nbsp;(${(analyticsdata.todayProfit || 0)?.toFixed(2)})</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {me.referralcode && (
            <div className='d-flex align-items-center justify-content-center my-3'>
              <p className='mx-2' style={{ marginBottom: "0" }}>Referral Code: {me.referralcode}</p>
              <i onClick={() => { copyToClipboard(me.referralcode) }} className="fa-solid fa-copy fa-lg pointer"></i>
            </div>
          )}

          <div className='d-flex align-items-center justify-content-center my-3'>
            <p className='mx-2' style={{ marginBottom: "0" }}>Referral Link: {window.location.protocol + '//' + window.location.host}?r={me.referralcode || ''}</p>
            <i onClick={() => { copyToClipboard(`${window.location.protocol + '//' + window.location.host}?r=${me.referralcode || ''}`) }} className="fa-solid fa-copy fa-lg pointer"></i>
          </div>

          <div>
            <MiningButton currentminingtime={me.miningstartdata} />
          </div>

          {/* Uncommented the plan section - this seems important */}
          {me.membership?.plan ? (
            <MyPlan 
              handleShowModal={handleShowModal} 
              handleCloseModal={handleCloseModal} 
              plans={plans} 
            />
          ) : (
            <PlanContainer 
              update={false} 
              plans={plans} 
              setshowModal={setshowModal2} 
              setid={setid} 
              handleModalClose={handleModal2Close} 
            />
          )}

          {/* Withdraw Modal */}
          <Modal show={showModal} backdrop="static" onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Withdraw</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formAmount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleFormChange}
                    min="10"
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Funding Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    placeholder="Enter your funding password"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleFormSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Join Plan Modal */}
          <Modal show={showModal2} backdrop="static" onHide={handleModal2Close}>
            <Modal.Header closeButton>
              <Modal.Title>{update ? 'Update Plan' : 'Join Plan'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formPlanAmount">
                  <Form.Label>Amount (Minimum: $50)</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={(e) => setamount(e.target.value)}
                    min="50"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModal2Close}>
                Close
              </Button>
              <Button variant="primary" onClick={handleForm2Submit}>
                {update ? 'Update Plan' : 'Join Plan'}
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Upgrade Plan Modal */}
          <Modal show={showModal3} backdrop="static" onHide={handleCloseModal} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Upgrade Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PlanContainer 
                update={true} 
                plans={updateableplan} 
                setshowModal={setshowModal2} 
                setid={setid} 
                handleModalClose={handleModal2Close} 
              />
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  );
}

export default Home;