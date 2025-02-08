import styles from './MainContentNav.module.css';

import sparLogo from '../../Asset/Spartans.logo.png'
import { HiOutlineMenu } from "react-icons/hi";
import { FaRegBell } from "react-icons/fa";

import { dashBoardContext } from './Dashboard';

import { useContext, useMemo } from 'react';

const MainContentNav = () => {

    const {isChecked, handleToggle, windowWidth} = useContext(dashBoardContext);

    const mainContentClass = useMemo( () => {
             return `${styles.mainContent} ${windowWidth < 768 ? styles.close : ''}`;
    }, [windowWidth]);

    return (
        <div className = {mainContentClass}>

            <nav>
                <HiOutlineMenu />
                
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