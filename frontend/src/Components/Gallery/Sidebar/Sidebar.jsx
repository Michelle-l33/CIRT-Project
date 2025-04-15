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
        <Link to="/" className={styles.logo}>
          <img src="/assets/utampa_logo.png" className={styles.logo} alt="Logo" />
          <div className={styles.logoName}>
            <span className={styles.logoBlack}>CI</span><span className={styles.logoRed}>RT</span>
          </div>
        </Link>
      </div>

      {isOpen && (
        <nav className={styles.sidebarNav}>
          <Link to="/Gallery" className={styles.navItem}>All Posters</Link>
          <Link to="/Papers" className={styles.navItem}>All Papers</Link>
          <Link to="/Dashboard" className={styles.navItem}>Submit Research</Link>
          <Link to="/home" className={styles.navItem}>About Us</Link>
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;