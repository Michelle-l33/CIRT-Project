import React from 'react';
import styles from './TopNav.module.css';
import utampaLogo from '../../../Asset/Spartans.logo.png'; 

const TopNav = ({ searchQuery, setSearchQuery, isSidebarOpen }) => {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className={`${styles.topNav} ${!isSidebarOpen ? styles.collapsed : ''}`}>
      <div className={styles.centerSection}>
        <span className={styles.welcomeMessage}>
          Welcome to the Gallery Repository!
        </span>
      </div>


      <div className={styles.rightSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search research posters..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleChange}
          />
        </div>
        <img 
          src={utampaLogo} 
          alt="University of Tampa Logo" 
          className={styles.utampaLogo}
        />
      </div>
    </nav>
  );
};

export default TopNav;