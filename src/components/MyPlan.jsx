import React, { useContext } from 'react';
import context from '../context/context';
import ProgressBar from "@ramonak/react-progress-bar";
import "./global.css";

const MyPlan = ({ handleShowModal }) => {
  const a = useContext(context);
  const me = a.me;
  const analytics = a.analytics;

  // Agar plan nahi hai to fallback
  if (!me?.membership?.plan) {
    return (
      <div className="my-5 text-center">
        <h2>No Active Investment Plan</h2>
        <p>You have not joined any plan yet. Please choose a plan to get started.</p>
      </div>
    );
  }

  return (
    <div className='my-5'>
      <h1>{me.membership.plan.title} Investment Plan</h1>

      {/* Progress bar */}
      <div className="bar">
        <ProgressBar
          completed={analytics?.totalPlanCompleted || 0}
          customLabel="."
        />
      </div>

      <div className="my-4 row g-4 ">
        {/* Total Profit */}
        <div style={{ maxWidth: "19rem", width: "max-content" }}
          className="bg-light rounded d-flex align-items-center justify-content-between p-4">
          <i className="fa fa-chart-line fa-3x maincolor"></i>
          <div className="ms-3">
            <h5 className="mb-2">Total Plan's Profit</h5>
            <h4 className="mb-0">(${analytics?.totalPlanProfit?.toFixed(2) || 0})</h4>
          </div>
        </div>

        {/* Plan completion */}
        <div className="bg-light rounded d-flex align-items-center justify-content-between mt-3 p-3 "
          style={{ color: "black", maxWidth: "19rem", width: "max-content" }}>
          <div className="">
            <h4 className="mb-0">
              {`${(analytics?.totalPlanCompleted || 0).toFixed(2)} % completed of ${me.membership.plan.duration} days`}
            </h4>
          </div>
        </div>
      </div>

      {/* Upgrade button */}
      <div className='row'>
        <div className="btn" style={{ maxWidth: "max-content" }}>
          <span className='btnText' onClick={handleShowModal}>Upgrade</span>
          <i className="fa-solid fa-plus fa-xl" style={{ color: "white" }}></i>
        </div>
      </div>
    </div>
  );
};

export default MyPlan;
