import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiDiceTwentyFacesTwenty } from 'react-icons/gi';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { IoMenu } from 'react-icons/io5';
import {
  FaImages,      // Icon for "All Posters"
  FaFileAlt,     // Icon for "All Papers"
  FaEdit,        // Icon for "Submit Research"
  FaInfoCircle   // Icon for "About Us"
} from 'react-icons/fa';
import styles from './Sidebar.module.css';
import { useUser } from '../../Login/UserContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useUser();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className={`${styles.sideBar} ${isOpen ? '' : styles.close}`}>
      <div className={styles.topSection}>
        <button onClick={toggleSidebar} className={styles.toggleButton}>
          <IoMenu size={24} />
        </button>
      </div>
      
      <Link to="/" className={styles.logo}>
        <GiDiceTwentyFacesTwenty />
        <div className={styles.logoName}>
          <span>CI</span>RT
        </div>
      </Link>
      
      <ul className={styles.sideMenu}>
        <li className={isActive('/Gallery') ? styles.active : ''}>
          <Link to="/Gallery">
            <FaImages />
            <span>All Posters</span>
          </Link>
        </li>
        <li className={isActive('/Papers') ? styles.active : ''}>
          <Link to="/Papers">
            <FaFileAlt />
            <span>All Papers</span>
          </Link>
        </li>
        <li className={isActive('/Dashboard') ? styles.active : ''}>
          <Link to="/Dashboard">
            <FaEdit />
            <span>Submit Research</span>
          </Link>
        </li>
        <li className={isActive('/home') ? styles.active : ''}>
          <Link to="/home">
            <FaInfoCircle />
            <span>About Us</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;