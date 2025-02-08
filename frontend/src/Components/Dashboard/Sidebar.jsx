import styles from './Sidebar.module.css'
import { Link } from "react-router-dom";

import { IoIosWater } from "react-icons/io";

import { dashBoardContext } from './Dashboard';
import { useState, useContext, useMemo } from 'react';

const listOfIcon = [
    {
        Name: "Dashboard",
        iconComponent: IoIosWater,
        url: "#"
    },

    {
        Name: "Document",
        iconComponent: IoIosWater,
        url: "#"
    },


    {
        Name: "Message",
        iconComponent: IoIosWater,
        url: "#"
    },

    {
        Name: "User",
        iconComponent: IoIosWater,
        url: "#"
    },

    {
        Name: "Setting",
        iconComponent: IoIosWater,
        url: "#"
    },

]



const Sidebar = () => {

    const [hoverIdx, setHover] = useState(10000);
    const {windowWidth} = useContext(dashBoardContext);

    const handleHover = (idx) => {
        setHover(idx);
    }

    const handleLeave = () => {
        setHover(10000);
    }

    function CreateMenu () {

        const optionMenu = listOfIcon.map((icon, idx) =>
            <li key = {idx}
                onMouseOver = {() => handleHover(idx)}
                onMouseLeave = {() => handleLeave(idx)}
                className = {`${ hoverIdx === idx ? styles.active : ''}`}>
                <Link to = {icon.url}>
                    <icon.iconComponent />
                    {icon.Name}
                </Link>
            </li>
        )
        return optionMenu;
    }

    const sidebarClass = useMemo(() => {
        return `${styles.sideBar} ${windowWidth < 768 ? styles.close : ''}`;
    }, [windowWidth]);

    return (
        <div className = {sidebarClass}>
            <Link to = "#" className = {styles.logo}>
                <IoIosWater/>
                <div className = {styles.logoName}><span>CI</span>RT</div>
            </Link>
            
            <ul className ={styles.sideMenu}>
                <CreateMenu />
            </ul>

            <ul className = {styles.sideMenu}>
                <li><Link to = "#" className = {styles.logout}>
                    <IoIosWater />
                    Logout
                </Link></li>
            </ul>

        </div>
    );
};

export default Sidebar;