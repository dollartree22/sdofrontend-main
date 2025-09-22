import React from 'react';
import styles from "../styles/footer.module.css";


const Footer = () => {
    return (
        <>
            <hr style={{ background: "white",width:"90%",margin:"auto" }} />
            <footer className={`${styles.footer} `}>
                <div className={styles["footer-column"]}>
                    <div className={styles["footer-logo"]}>
                        <img
                            src="./sdologo.png"
                            height={100}
                            alt="Logo"
                        />
                    </div>
                </div>

                <div className={styles["footer-column"]}>
                    <h2 className={`${styles["footer-title"]} my-3`}>Contact Support</h2>
                    <a class={styles["footer-link"]} href="mailto:support@onedollartree.store">support@onedollartree.store</a>
                    <a class={styles["footer-link"]} href="https://wa.me/+96876355782">+96 876355782</a>
                </div>

                <div className={styles["footer-column"]}>
                    <h2 className={`${styles["footer-title"]} my-3`}>MEMBERS</h2>
                    <a className={styles["footer-link"]} href="/account">My Profile</a>
                    <a className={styles["footer-link"]} href="/account">Settings</a>
                    <a className={styles["footer-link"]} href="/history">History</a>
                </div>

                <div className={styles["footer-column"]}>
                    <h2 className={`${styles["footer-title"]} my-3`}>LEGAL</h2>
                    <a className={styles["footer-link"]} href="/terms">Terms & User agreement</a>
                    <a className={styles["footer-link"]} href="/policy">Privacy Policy</a>
                </div>

                {/* <div className={styles["footer-column"]}>
                    <h2 className={`${styles["footer-title"]} my-3`}>SOCIALS</h2>
                    <div className={styles["footer-social-icons"]}>
                        <span onClick={() => { window.location.href = "https://www.youtube.com/@vocsai" }} className={styles.imgIcon}>
                            <svg width="15px" height="15px" viewBox="0 0 20 20" aria-hidden="true" fill="#DFDFE2">
                                <path d="M15,0H5C2.2,0,0,2.2,0,5v10c0,2.8,2.2,5,5,5h10c2.8,0,5-2.2,5-5V5C20,2.2,17.8,0,15,0z M14.5,10.9l-6.8,3.8c-0.1,0.1-0.3,0.1-0.5,0.1c-0.5,0-1-0.4-1-1l0,0V6.2c0-0.5,0.4-1,1-1c0.2,0,0.3,0,0.5,0.1l6.8,3.8c0.5,0.3,0.7,0.8,0.4,1.3C14.8,10.6,14.6,10.8,14.5,10.9z"></path>
                            </svg>
                        </span>
                        <span onClick={() => { window.location.href = "https://twitter.com/vocs_ai" }} className={styles.imgIcon}>
                            <svg width="15px" height="15px" viewBox="0 0 20 20" aria-hidden="true" fill="#DFDFE2">
                                <path d="M20,3.8c-0.7,0.3-1.5,0.5-2.4,0.6c0.8-0.5,1.5-1.3,1.8-2.3c-0.8,0.5-1.7,0.8-2.6,1c-0.7-0.8-1.8-1.3-3-1.3c-2.3,0-4.1,1.8-4.1,4.1c0,0.3,0,0.6,0.1,0.9C6.4,6.7,3.4,5.1,1.4,2.6C1,3.2,0.8,3.9,0.8,4.7c0,1.4,0.7,2.7,1.8,3.4C2,8.1,1.4,7.9,0.8,7.6c0,0,0,0,0,0.1c0,2,1.4,3.6,3.3,4c-0.3,0.1-0.7,0.1-1.1,0.1c-0.3,0-0.5,0-0.8-0.1c0.5,1.6,2,2.8,3.8,2.8c-1.4,1.1-3.2,1.8-5.1,1.8c-0.3,0-0.7,0-1-0.1c1.8,1.2,4,1.8,6.3,1.8c7.5,0,11.7-6.3,11.7-11.7c0-0.2,0-0.4,0-0.5C18.8,5.3,19.4,4.6,20,3.8z"></path>
                            </svg>
                        </span>
                        <span onClick={() => { window.location.href = "https://www.tiktok.com/@vocs.ai" }} className={styles.imgIcon}>
                            <svg width="15px" height="15px" viewBox="0 0 20 20" aria-hidden="true" fill="#DFDFE2">
                                <path d="M18.2 4.5c-2.3-.2-4.1-1.9-4.4-4.2V0h-3.4v13.8c0 1.4-1.2 2.6-2.8 2.6-1.4 0-2.6-1.1-2.6-2.6s1.1-2.6 2.6-2.6h.2l.5.1V7.5h-.7c-3.4 0-6.2 2.8-6.2 6.2S4.2 20 7.7 20s6.2-2.8 6.2-6.2v-7c1.1 1.1 2.4 1.6 3.9 1.6h.8V4.6l-.4-.1z"></path>
                            </svg>
                        </span>
                        <span onClick={() => { window.location.href = "https://discord.gg/q3YfEcsX" }} className={styles.imgIcon}>
                            <svg width="15px" height="15px" viewBox="0 0 20 20" aria-hidden="true" fill="#DFDFE2">
                                <path d="M17.2,4.2c-1.7-1.4-4.5-1.6-4.6-1.6c-0.2,0-0.4,0.1-0.4,0.3c0,0-0.1,0.1-0.1,0.4c1.1,0.2,2.6,0.6,3.8,1.4C16.1,4.7,16.2,5,16,5.2c-0.1,0.1-0.2,0.2-0.4,0.2c-0.1,0-0.2,0-0.2-0.1C13.3,4,10.5,3.9,10,3.9S6.7,4,4.6,5.3C4.4,5.5,4.1,5.4,4,5.2C3.8,5,3.9,4.7,4.1,4.6c1.3-0.8,2.7-1.2,3.8-1.4C7.9,3,7.8,2.9,7.8,2.9C7.7,2.7,7.5,2.6,7.4,2.6c-0.1,0-2.9,0.2-4.6,1.7C1.8,5.1,0,10.1,0,14.3c0,0.1,0,0.2,0.1,0.2c1.3,2.2,4.7,2.8,5.5,2.8c0,0,0,0,0,0c0.1,0,0.3-0.1,0.4-0.2l0.8-1.1c-2.1-0.6-3.2-1.5-3.3-1.6c-0.2-0.2-0.2-0.4,0-0.6c0.2-0.2,0.4-0.2,0.6,0c0,0,2,1.7,6,1.7c4,0,6-1.7,6-1.7c0.2-0.2,0.5-0.1,0.6,0c0.2,0.2,0.1,0.5,0,0.6c-0.1,0.1-1.2,1-3.3,1.6l0.8,1.1c0.1,0.1,0.2,0.2,0.4,0.2c0,0,0,0,0,0c0.8,0,4.2-0.6,5.5-2.8c0-0.1,0.1-0.1,0.1-0.2C20,10.1,18.2,5.1,17.2,4.2z M7.2,12.6c-0.8,0-1.5-0.8-1.5-1.7s0.7-1.7,1.5-1.7c0.8,0,1.5,0.8,1.5,1.7S8,12.6,7.2,12.6z M12.8,12.6c-0.8,0-1.5-0.8-1.5-1.7s0.7-1.7,1.5-1.7c0.8,0,1.5,0.8,1.5,1.7S13.7,12.6,12.8,12.6z"></path>
                            </svg>
                        </span>
                    </div>
                </div> */}
            </footer>
        </>

    )
}

export default Footer;
