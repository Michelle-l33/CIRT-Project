import styles from './MainContentNav.module.css';

import sparLogo from '../../Asset/Spartans.logo.png'
import { FaRegBell } from "react-icons/fa";

import { dashBoardContext } from './Dashboard';

import { useContext } from 'react';

const MainContentNav = () => {

    const {isChecked, handleToggle, isClose} = useContext(dashBoardContext);

    const mainContentClass = `${styles.mainContent} ${isClose ? styles.close : ''}`;

    return (
        <div className = {mainContentClass}>

            <nav>
                <span> Welcome! </span>
                
                <input type = "checkbox"
                id = "themeToggle"
                checked = {isChecked} 
                onChange = {handleToggle}
                hidden/>
                <label htmlFor = "themeToggle" className = {styles.themeToggle}></label>

                <a href = "#" className = {styles.notif}>
                    <FaRegBell />
                    <span className = {styles.count}> 12 </span>
                </a>
                
                <a href = "" className = {styles.profile}>
                    <img src = {sparLogo} alt = "Spartan Logo"/>
                </a>
            </nav>

        </div>
    );
};

export default MainContentNav;