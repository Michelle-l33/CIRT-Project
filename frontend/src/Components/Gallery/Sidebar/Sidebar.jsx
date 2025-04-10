import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import styles from './Sidebar.module.css';
import { useUser } from '../../Login/UserContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useUser();
  
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.show : ''}`}>
      <button
        onClick={toggleSidebar}
        className={`${styles.sidebarToggle} ${isOpen ? styles.open : ''}`}
      >
        <IoMenu size={28} color={"white"} />
      </button>

      <div className={styles.sidebarHeader}>
        <Link to="/home" className={styles.logo}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="..."></path>
          </svg>
          <div className={styles.logoName}>
            <span className={styles.logoBlack}>CI</span><span className={styles.logoRed}>RT</span>
          </div>
        </Link>
      </div>

      {isOpen && (
        <nav className={styles.sidebarNav}>
          <Link to="/home" className={styles.navItem}>About Us</Link>
          <Link to="/task" className={styles.navItem}>Task</Link>
          <Link to="/tabnav" className={styles.navItem}>TabNav</Link>
          <Link to="/document" className={styles.navItem}>Document</Link>
          <Link to="/user" className={styles.navItem}>User</Link>
          <Link to="/setting" className={styles.navItem}>Setting</Link>
          <Link to="/logout" className={styles.navItem}>Logout</Link>
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;