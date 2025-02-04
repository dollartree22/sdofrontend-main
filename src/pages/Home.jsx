import React, { useState } from 'react'
import { useContext } from 'react'
import context from '../context/context'
import { useEffect } from 'react';
import Loading from '../components/loading';
import "./home.css"
import PlanContainer from '../components/PlanContainer';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import MyPlan from "../components/MyPlan.jsx";
import MiningButton from '../components/Mining.jsx';

const Home = () => {
  const a = useContext(context);
  const analyticsdata = a.analytics;
  const loading = a.dataloading;
  const Withdraw = a.Withdraw;
  const me = a.me;
  const updateplan = a.updateplan;
  const joinplan = a.joinplan;
  const [showModal, setShowModal] = useState(false);
  const getallplans = a.getallplans;
  const [update, setupdate] = useState(false)
  const [updateableplan, setupdateableplan] = useState([])
  const plans = a.plans;
  useEffect(() => {
    getallplans();
  }, []);
  const handleFormSubmit = () => {
    if (formData.amount < 10) {
      toast.error('Minimum Amount $10');
      return
    }
    Withdraw(formData)
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
    })
    setShowModal(false)
  }

  // Modal 2
  const [amount, setamount] = useState(50);
  const [id, setid] = useState()
  const [showModal2, setshowModal2] = useState(false)
  const handleModal2Close = () => {
    setamount(50)
    setshowModal2(false)
    setupdate(false)
  }
  const handleForm2Submit = async () => {
    if ((me.balance + me.locked_amount) < amount || amount < 50) {
      return toast.error('Low Balance', {
        position: "top-center"
      })
    }
    let response;
    if (update) {
      response = await updateplan({ amount, id });
    } else {
      response = await joinplan({ amount, id });
    }
    if (response) {
      window.location.reload()
    }
  };
  // Modal 3
  const [showModal3, setshowModal3] = useState(false);
  const handleShowModal = () => {
    setshowModal3(true)
    console.log(me.membership.plan.duration)
    setupdateableplan(plans.filter((plan) => plan.duration > me.membership.plan.duration))
    setupdate(true)
  }
  const handleCloseModal = () => {
    setshowModal3(false)
    setupdate(false)
  }
  function copyToClipboard(text) {
    // Create a temporary input element to copy the text
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  }
  return (
    <div style={{ minHeight: "70vh", marginTop: "100px" }} className='container homeback'>
      {
        loading ? <Loading /> : <>
          <h2 className='py-3'>Dashboard</h2>
          <div class="container-fluid px-4">
            <div style={{ gap: "10px", flexWrap: "wrap" }} className='mb-4 d-flex'>
              <div className="btn">
                <span className='btnText' onClick={() => window.location.href = "/deposit"}>Deposit</span>
                <i class="fa-solid fa-plus fa-xl" style={{ color: "white" }}></i>
              </div>
              <div className="btn" onClick={() => {
                if (!me.wallet_address) {
                  toast.error("Please Add your wallet address to continue!", {
                    position: "top-center",
                    theme: "dark"
                  });
                  return
                }
                setShowModal(true)
              }}>
                <span className='btnText'>Withdraw</span>
                <i class="fa-solid fa-money-bill-transfer fa-xl" style={{ color: "white" }}></i>
              </div>
            </div>
            <div class="row g-4">
              <div class=" analyticsbox">
                <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                  <i class="fa fa-chart-line fa-3x maincolor"></i>
                  <div class="ms-3">
                    <h5 class="mb-2">Total Balance</h5>
                    <h4 class="mb-0">&nbsp;&nbsp;(${(me.balance + me.locked_amount)?.toFixed(2)})</h4>
                  </div>
                </div>
              </div>
              <div class=" analyticsbox">
                <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                  <i class="fa fa-chart-bar fa-3x maincolor"></i>
                  <div class="ms-3">
                    <h5 class="mb-2">Total Deposit</h5>
                    <h4 class="mb-0">&nbsp;&nbsp;(${me.locked_amount?.toFixed(2)})</h4>
                  </div>
                </div>
              </div>
              <div class=" analyticsbox">
                <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                  <i class="fa fa-chart-area fa-3x maincolor"></i>
                  <div class="ms-3">
                    <h5 class="mb-2">Withdraw Available</h5>
                    <h4 class="mb-0">&nbsp;&nbsp;(${me.balance?.toFixed(2)})</h4>
                  </div>
                </div>
              </div>
              <div class=" analyticsbox">
                <div class="bg-light rounded d-flex align-items-center justify-content-between p-4">
                  <i class="fa fa-chart-pie fa-3x maincolor"></i>
                  <div class="ms-3">
                    <h5 class="mb-2">Today's Profit</h5>
                    <h4 class="mb-0">&nbsp;&nbsp;(${analyticsdata.todayProfit?.toFixed(2)})</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='d-flex align-items-center justify-content-center my-3'>
            <p className='mx-2' style={{ marginBottom: "0" }}>Refferal Code: {me.referralcode}</p>
            <i onClick={() => { copyToClipboard(me.referralcode) }} class="fa-solid fa-copy fa-lg pointer"></i>
          </div>
          <div className='d-flex align-items-center justify-content-center my-3'>
            <p className='mx-2' style={{ marginBottom: "0" }}>Refferal Link: {window.location.protocol + '//' + window.location.host}?r={me.referralcode}</p>
            <i onClick={() => { copyToClipboard(`${window.location.protocol + '//' + window.location.host}?r=${me.referralcode}`) }} class="fa-solid fa-copy fa-lg pointer"></i>
          </div>
          <div>
            <MiningButton currentminingtime={me.miningstartdata} />
          </div>
          {/* {
            me.membership?.plan ? <MyPlan handleShowModal={handleShowModal} handleCloseModal={handleCloseModal} plans={plans} /> :
              <PlanContainer update={false} plans={plans} setshowModal={setshowModal2} setid={setid} handleModalClose={handleModal2Close} />
          } */}
          <Modal show={showModal} backdrop="static" onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Withdraw</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formTitle">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleFormChange}
                  />
                </Form.Group>
                <Form.Group controlId="formTitle">
                  <Form.Label>Funding Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
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
          <Modal show={showModal2} backdrop="static" onHide={handleModal2Close}>
            <Modal.Header closeButton>
              <Modal.Title>Join Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formTitle">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={(e) => setamount(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModal2Close}>
                Close
              </Button>
              <Button variant="primary" onClick={handleForm2Submit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showModal3} backdrop="static" onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Upgrade Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PlanContainer update={true} plans={updateableplan} setshowModal={setshowModal2} setid={setid} handleModalClose={handleModal2Close} /></Modal.Body>
          </Modal>
        </>
      }
    </div>
  )
}

export default Home