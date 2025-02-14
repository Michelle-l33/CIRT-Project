import logo from '../../Asset/Utampa_logo.png';
import styles from './NavBar.module.css';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';

const NavBar = ({isLoggedIn}) => {
    //javascript funcs go here

    // const location = useLocation();

    // useEffect(() => {
    //     const loginButton = document.getElementById('loginButton');
    //     if (location.pathname === '/Login') {
    //         loginButton.classList.add('hidden');
    //     } else {
    //         loginButton.classList.remove('hidden');
    //     }
    // }, [location]); // this makes it so login button doesnt show on the /Login page

    return( // html goes in the return()
        <nav className={styles.navBar}>
            <div className = {styles.navLeft}>
                <Link to="/"> 
                    <img src = {logo} alt = "Logo"/>
                </Link>             
            </div>

            <div className = {styles.navRight}>

                <Link to="/Login"> Login </Link>
            </div>
        </nav>
    );
};


NavBar.propTypes = {
    isLoggedIn: PropTypes.bool
};

export default NavBar; //make sure to export the function