"use client"
import React, { useContext, useEffect, useState } from 'react';
import styles from "../styles/navbar.module.css";
import Hamburger from 'hamburger-react';
import context from '../context/context';

const Navbar = () => {
    // Context
    const a = useContext(context);
    const getme = a.getme;
    // const loggedIn = a.loggedIn
    const me = a.me;
    // const isaccountpage = a.isaccountpage;
    useEffect(() => {
        getme();
    }, []);
    // State
    const [isOpen, setOpen] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [location, setlocation] = useState({})

    useEffect(() => {
        const handleScroll = () => {
            const top = window.scrollY === 0;
            setIsAtTop(top);
        };

        window.addEventListener('scroll', handleScroll);
        setlocation(window.location)
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <nav className={`${styles.navbar}`}>
                <div className={styles.left}>
                    <img
                        src="./sdologo.png"
                        height={100}
                        alt="Logo"
                    />
                </div>
                <div className={`${styles.middle} ${styles.links}`}>
                    <ul className={`fontfamilyantonio ${isAtTop ? styles.ultransparent : ''}`}>
                        <>
                            <li className={location.pathname === "/" ? styles.active : ""}>
                                <a href="/">Home</a>
                            </li>
                            <li className={location.pathname === "/record" ? styles.active : ""}>
                                <a href="/record">History Records</a>
                            </li>
                            <li className={location.pathname === "/account" ? styles.active : ""}>
                                <a href="/account">Account</a>
                            </li>
                            <li className={location.pathname === "/refferals" ? styles.active : ""}>
                                <a href="/refferals">Refferals</a>
                            </li>
                            <li onClick={() => {
                                localStorage.clear()
                                window.location.href="/"
                            }} >
                                <a href="/">Logout</a>
                            </li>
                        </>
                    </ul>
                </div>
                <div className={styles.right}>
                    <div className={`${styles.accnav}`}>
                        <img src={'/avatar.png'} width={40} height={40} alt='Avatar' />
                        <div style={{ display: 'flex', flexDirection: "column" }}>
                            <div style={{ color: "white" }}>{me?.name}</div>
                            <small className={styles.email}>{me?.email}</small>
                        </div>
                    </div>
                </div>
                <div className={`${styles.toggle}`}>
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                </div>

            </nav >
            <div className={`${styles.toggle} ${isOpen ? styles.sidebaropen : styles.dNone}`}>
                <div className={`${styles.links}`}>
                    <ul className={`fontfamilyantonio`}>
                    <>
                            <li className={location.pathname === "/" ? styles.active : ""}>
                                <a href="/">Home</a>
                            </li>
                            <li className={location.pathname === "/record" ? styles.active : ""}>
                                <a href="/record">History Records</a>
                            </li>
                            <li className={location.pathname === "/account" ? styles.active : ""}>
                                <a href="/account">Account</a>
                            </li>
                            <li className={location.pathname === "/refferals" ? styles.active : ""}>
                                <a href="/refferals">Refferals</a>
                            </li>
                            <li onClick={() => {
                                localStorage.clear()
                                window.location.href="/"
                            }} >
                                <a href="/">Logout</a>
                            </li>
                        </>
                    </ul>
                </div>
                <div className={styles.cross}>
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                </div>
            </div>
        </>
    );
}

export default Navbar;
