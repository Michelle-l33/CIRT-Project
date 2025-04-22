import React from 'react';
import styles from './TopNav.module.css';
import utampaLogo from '../../../Asset/Spartans.logo.png'; 
import { Link } from 'react-router-dom';

const TopNav = ({ searchQuery, setSearchQuery, isSidebarOpen, selectedTags, setSelectedTags, sampleCategories }) => {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className={`${styles.topNav} ${!isSidebarOpen ? styles.collapsed : ''}`}>
      <div className={`${styles.centerSection} ${!isSidebarOpen ? styles.expandedTitle : ''}`}>
        <Link to="/">
        <img 
          src={utampaLogo} 
          alt="University of Tampa Logo" 
          className={styles.utampaLogo}
        />
        </Link>
        <span className={styles.welcomeMessage}>
          Criminology Institute for Research and Training Repository
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
        
      </div>
    </nav>
  );
};

export default TopNav;