import React from 'react';
import { Link } from 'react-router-dom';
import { IoMenu } from 'react-icons/io5';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.show : ''}`}>
      <button
        onClick={toggleSidebar}
        className={`${styles.sidebarToggle} ${isOpen ? styles.open : ''}`}
      >
        <IoMenu size={28} color={"white"} />
      </button>

      <div className={styles.sidebarHeader}>
        <Link to="/">
          <img
            src="/assets/utampa_logo.png"
            alt="UT Logo"
            className={styles.logo}
          />
        </Link>
      </div>

      {isOpen && (
        <nav className={styles.sidebarNav}>
          <Link to="/Papers" className={styles.navItem}>All Papers</Link>
          <Link to="/Gallery" className={styles.navItem}>All Posters</Link>
          <Link to="/submit" className={styles.navItem}>Submit Research</Link>
          <Link to="/guides" className={styles.navItem}>Author Guidelines</Link>
          <Link to="/contact" className={styles.navItem}>Research Support</Link>
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;