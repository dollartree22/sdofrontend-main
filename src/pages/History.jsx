import React, { useContext, useEffect, useState } from 'react';
import context from '../context/context';
import Loading from '../components/loading';
import "./invoice.css"
const Withdraws = () => {
    const a = useContext(context);
    const withdraws = a.withdraws;
    const deposits = a.deposits;
    const rewards = a.rewards;
    const getmywithdraws = a.getmywithdraws;
    const getmyrewards = a.getmyrewards;
    const getmydeposits = a.getmydeposits;
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('withdraw'); // Initially, set to 'withdraw'

    useEffect(() => {
        const getdata = async () => {
            setLoading(true);
            await getmywithdraws();
            await getmyrewards();
            await getmydeposits();
            setLoading(false);
        };
        getdata();
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    function formatDateToDdmmyyyy(inputDate) {
        const date = new Date(inputDate);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear().toString();

        return `${day}/${month}/${year}`;
    }
    function formatTimeTo12hr(inputTime) {
        const date = new Date(inputTime);

        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12 || 12; // Convert to 12-hour format

        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        return formattedTime;
    }
    return (
        <div className='container' style={{ minHeight: "80vh", marginTop: "100px" }}>
            <h2 className='my-3 mt-5'>History</h2>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <ul className="nav nav-tabs" id="myTabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${activeTab === 'withdraw' ? 'active' : ''}`}
                                id="withdraw-tab"
                                data-toggle="tab"
                                href="#"
                                role="tab"
                                aria-controls="withdraw"
                                aria-selected={activeTab === 'withdraw'}
                                onClick={() => handleTabClick('withdraw')}
                            >
                                Withdraws
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${activeTab === 'deposit' ? 'active' : ''}`}
                                id="deposit-tab"
                                data-toggle="tab"
                                href="#"
                                role="tab"
                                aria-controls="deposit"
                                aria-selected={activeTab === 'deposit'}
                                onClick={() => handleTabClick('deposit')}
                            >
                                Deposits
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${activeTab === 'reward' ? 'active' : ''}`}
                                id="reward-tab"
                                data-toggle="tab"
                                href="#"
                                role="tab"
                                aria-controls="reward"
                                aria-selected={activeTab === 'reward'}
                                onClick={() => handleTabClick('reward')}
                            >
                                Rewards
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabsContent">
                        <div
                            className={`tab-pane fade ${activeTab === 'withdraw' ? 'show active' : ''}`}
                            id="withdraw"
                            role="tabpanel"
                            aria-labelledby="withdraw-tab"
                        >
                            {/* Table for withdraw Withdrawals */}
                            <div className="table-responsive">
                                <table className="table table-dark">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {withdraws?.map((withdraw) => (
                                            <tr key={withdraw._id}>
                                                <td>{formatDateToDdmmyyyy(withdraw.createdAt)}</td>
                                                <td>${withdraw.amount?.toFixed(2)}</td>
                                                <td>{formatTimeTo12hr(withdraw.createdAt)}</td>
                                                <td>
                                                    <div className="status">{withdraw.status?.toUpperCase()}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div
                            className={`tab-pane fade ${activeTab === 'reward' ? 'show active' : ''}`}
                            id="reward"
                            role="tabpanel"
                            aria-labelledby="reward-tab"
                        >
                            {/* Table for reward Withdrawals */}
                            <div className="table-responsive">
                                <table className="table table-dark">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Time</th>
                                            <th>Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rewards.map((withdraw) => (
                                            <tr key={withdraw._id}>
                                                <td>{formatDateToDdmmyyyy(withdraw.createdAt)}</td>
                                                <td>${withdraw.amount?.toFixed(2)}</td>
                                                <td>{formatTimeTo12hr(withdraw.createdAt)}</td>
                                               <td> <div className="status">{withdraw.type?.toUpperCase()}</div></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* Similar tab content for deposits */}
                        <div
                            className={`tab-pane fade ${activeTab === 'deposit' ? 'show active' : ''}`}
                            id="deposit"
                            role="tabpanel"
                            aria-labelledby="deposit-tab"
                        >
                            {/* Table for deposits */}
                            <div className="table-responsive">
                                <table className="table table-dark">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Time</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deposits.map((withdraw) => (
                                            <tr key={withdraw._id}>
                                                <td>{formatDateToDdmmyyyy(withdraw.createdAt)}</td>
                                                <td>${withdraw.amount?.toFixed(2)}</td>
                                                <td>{formatTimeTo12hr(withdraw.createdAt)}</td>
                                                <td>
                                                    <div className="status">{withdraw.status?.toUpperCase()}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Withdraws;
