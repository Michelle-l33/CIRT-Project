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

const Sidebar = ({ isOpen, toggleSidebar,onSelectTab,isPosterTab }) => {
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
      <ul className={styles.sideMenu}>
        <li className={isPosterTab ? styles.active : ''}>
        <button onClick={() => onSelectTab(true)} className={styles.linkBtn}>
            <div className={styles.linkContent}>
              <FaImages />
              <span>All Posters</span>
            </div>
        </button>
        </li>
        <li className={!isPosterTab ? styles.active : ''}>
        <button onClick={() => onSelectTab(false)} className={styles.linkBtn}>
            <div className={styles.linkContent}>
              <FaFileAlt />
              <span>All Papers</span>
            </div>
          </button>
        </li>
        <li className={isActive('/Dashboard') ? styles.active : ''}>
          <Link to="/Dashboard">
            <div className={styles.linkContent}>
              <FaEdit />
              <span>Submit Research</span>
            </div>
          </Link>
        </li>
        <li className={isActive('/AboutUs') ? styles.active : ''}>
          <Link to="/AboutUs">
            <div className={styles.linkContent}>
              <FaInfoCircle />
              <span>About Us</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;