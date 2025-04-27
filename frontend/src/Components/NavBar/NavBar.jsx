import logo from '../../Asset/Utampa_logo.png';
import styles from './NavBar.module.css';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";
import { useState } from 'react';

const NavBar = () => {
    //javascript funcs go here
    const[menuOpen,setMenuOpen] = useState(false);

    return( // html goes in the return()
        <nav className={styles.navBar} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className = {styles.navLeft}>
                <Link to="/"> 
                    <img src = {logo} alt = "Logo"/>
                </Link>  
                {/* <span>Criminology Institute For Research And Training</span>            */}
            </div>
            
            {/* Hamburger icon (shown on small screens) */}
            <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
                ☰ 
            </div>

            {/* Dropdown Menu */}
            <div className={`${styles.dropdownMenu} ${menuOpen ? styles.show : ''}`}>
                <button><a href="/"><span>Home</span></a></button>
                <button><a href="/AboutUs"><span>About Us</span></a></button>
                <button><a href="/Gallery"><span>Database</span></a></button>
                <button><Link to="/Dashboard"><span>My Account</span></Link></button>
            </div>

            <div className={styles.navButtons}>
                <button><a href="/"><span>Home</span></a></button>
                <button><a href="/AboutUs"><span>About Us</span></a></button>
                <button><a href="/Gallery"><span>Database</span></a></button>
                <button><Link to="/Dashboard"><span>My Account</span></Link></button>
            </div>

        </nav>
    );
};


NavBar.propTypes = {
    isLoggedIn: PropTypes.bool
};

export default NavBar; //make sure to export the function