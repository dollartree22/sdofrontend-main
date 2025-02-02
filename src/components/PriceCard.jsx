import React from 'react';
import styles from "../styles/pricecard.module.css"
const PriceCard = ({  update, id, setid, title, price, duration, profit, setshowModal }) => {
    return (
        <div className={styles.pricecard} >
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.priceDetails}>
                <div className={styles.price}>
                    <span style={{ fontSize: "15px" }}>Profit Per day</span>({profit}%)
                </div>
            </div>
            <div className={styles.features}>
                <div className={styles.feature_item}>
                    Minimum Deposit: {price}$
                </div>
                <div className={styles.feature_item}>
                    Duration: {duration} Days
                </div>
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => {
                setshowModal(true)
                setid(id)
            }} className={styles.signup}>
                {update ? "Update" : "Join"}
            </div>
        </div>
    );
};

export default PriceCard;
