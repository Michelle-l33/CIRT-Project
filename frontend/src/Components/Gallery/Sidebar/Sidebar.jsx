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
          <Link to={user ? "#" : "/login"} className={styles.navItem}>
            Submit Research
            {/* TODO: If user is logged in, route to submission form */}
          </Link>
          <Link to="/guides" className={styles.navItem}>Author Guidelines</Link>
          <Link to="/contact" className={styles.navItem}>Research Support</Link>
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;