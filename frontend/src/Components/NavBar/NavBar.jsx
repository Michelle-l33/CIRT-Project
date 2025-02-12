import logo from '../../Asset/Utampa_logo.png';
import styles from './NavBar.module.css';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

const NavBar = ({isLoggedIn}) => {
    //javascript funcs go here
    return( // html goes in the return()
        <nav className={styles.navBar}>
            <div className = {styles.navLeft}>
                <img src = {logo} alt = "Logo" />
            </div>

            <div className = {styles.navRight}
                 style = {{visibility: isLoggedIn ? 'hidden':'visible'}}>

                <Link to="/Login"> Login </Link>
            </div>
        </nav>
    );
};


NavBar.propTypes = {
    isLoggedIn: PropTypes.bool
};

export default NavBar; //make sure to export the function