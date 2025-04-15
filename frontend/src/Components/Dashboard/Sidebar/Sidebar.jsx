import styles from './Sidebar.module.css'
import { Link, useLocation } from "react-router-dom";
import { useUser } from '../../Login/UserContext';

import { RiDashboardHorizontalLine } from "react-icons/ri";
import { GrDocument } from "react-icons/gr";
import { FaTasks } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { GiDiceTwentyFacesTwenty } from "react-icons/gi";
import { IoNewspaperOutline } from "react-icons/io5";


import { dashBoardContext } from '../Dashboard';
import { useContext } from 'react';


const Sidebar = ( {isEditor, isAuthor, isReviewer} ) => {
    const {handleLogout} = useUser();
    const {isClose} = useContext(dashBoardContext);
    const location = useLocation();

    const listOfEditorIcons = [
        {Name: "Task", iconComponent: FaTasks, url: "/Dashboard/Editor/Task"},
        {Name: "TabNav", iconComponent: RiDashboardHorizontalLine,url: "/Dashboard/Editor/TabNav"},
        {Name: "Document", iconComponent: GrDocument, url: "/Dashboard/Editor/DocumentTab"},
        {Name: "User", iconComponent: FaRegUser, url: "/Dashboard/User"},
        // {Name: "Setting", iconComponent: MdOutlineSettings, url: "#"},
    ]

    const listOfAuthorIcons = [
        { Name: "Dashboard", iconComponent: RiDashboardHorizontalLine, url: "/Dashboard/Author" },
        { Name: "User", iconComponent: FaRegUser, url: "/Dashboard/User" },
        // { Name: "Settings", iconComponent: MdOutlineSettings, url: "#" },
    ];

    const listOfReviewerIcons = [
        { Name: "Current", iconComponent: IoNewspaperOutline, url: "/Dashboard/Reviewer/Current" },
        { Name: "User", iconComponent: FaRegUser, url: "/Dashboard/User" },
        // { Name: "Settings", iconComponent: MdOutlineSettings, url: "#" },
    ];

    let listOfIcon;

    if (isAuthor) {
        listOfIcon = listOfAuthorIcons;
    } else if (isEditor) {
        listOfIcon = listOfEditorIcons;
    } else if (isReviewer){
        listOfIcon = listOfReviewerIcons;
    }

    const isLocation = (url) => {
        return location.pathname.includes(url) || location.pathname === url;
    };

    const CreateMenu =({listOfIcon}) => {

        const optionMenu = listOfIcon.map((icon, idx) =>
            <li key = {idx}
                // I didn't know NavLink exist :(
                className = {`${isLocation(icon.url) ? styles.active : ''}`}>
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
            <Link to = "/" className = {styles.logo}>
                <GiDiceTwentyFacesTwenty/>
                <div className = {styles.logoName}><span>CI</span>RT</div>
            </Link>
            
            <ul className ={styles.sideMenu}>
                <CreateMenu listOfIcon={listOfIcon}/>
            </ul>

            <ul className = {styles.sideMenu}>
                <li>
                    <button className={styles.logout} onClick={(e) => {
                    e.preventDefault(); // Prevent the default link behavior
                    handleLogout();
                    }}>
                        <RiLogoutCircleLine/>
                    Logout
                    </button>
                </li>
            </ul>

        </div>
    );
};

export default Sidebar;