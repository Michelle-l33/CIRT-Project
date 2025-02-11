import styles from './Sidebar.module.css'
import { Link } from "react-router-dom";
import { useUser } from '../Login/UserContext';

import { RiDashboardHorizontalLine } from "react-icons/ri";
import { GrDocument } from "react-icons/gr";
import { LuMessageSquareMore } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { GiDiceTwentyFacesTwenty } from "react-icons/gi";

import { dashBoardContext } from './Dashboard';
import { useState, useContext } from 'react';

const listOfIcon = [
    {
        Name: "Dashboard",
        iconComponent: RiDashboardHorizontalLine,
        url: "#"
    },

    {
        Name: "Document",
        iconComponent: GrDocument,
        url: "#"
    },


    {
        Name: "Comment",
        iconComponent: LuMessageSquareMore,
        url: "#"
    },

    {
        Name: "User",
        iconComponent: FaRegUser,
        url: "#"
    },

    {
        Name: "Setting",
        iconComponent: MdOutlineSettings,
        url: "#"
    },

]



const Sidebar = () => {
    const {handleLogout} = useUser();
    const [hoverIdx, setHover] = useState(10000);
    const {isClose} = useContext(dashBoardContext);

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

    const sidebarClass = `${styles.sideBar} ${isClose ? styles.close : ''}`;

    return (
        <div className = {sidebarClass}>
            <Link to = "#" className = {styles.logo}>
                <GiDiceTwentyFacesTwenty/>
                <div className = {styles.logoName}><span>CI</span>RT</div>
            </Link>
            
            <ul className ={styles.sideMenu}>
                <CreateMenu />
            </ul>

            <ul className = {styles.sideMenu}>
                <li>
                    <a href="#" className={styles.logout} onClick={(e) => {
                    e.preventDefault();  // Prevent the default link behavior
                    handleLogout();
                    }}>
                        <RiLogoutCircleLine/>
                    Logout
                    </a>
                </li>
                {/* <li><Link to = "#" className = {styles.logout}>
                    <RiLogoutCircleLine />
                    Logout
                </Link></li> */}
            </ul>

        </div>
    );
};

export default Sidebar;