import React from 'react';
import styles from './TopNav.module.css';
import utampaLogo from '../../../Asset/Spartans.logo.png'; 
import { Link } from 'react-router-dom';
import { useState } from 'react';

const TopNav = ({ searchQuery, setSearchQuery, isSidebarOpen, selectedTags, setSelectedTags, sampleCategories }) => {
  const[menuOpen,setMenuOpen] = useState(false);
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
          CIRT Database
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
        {/* Hamburger icon (shown on small screens) */}
        <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
                ☰ 
            </div>

            {/* Dropdown Menu */}
            <div className={`${styles.dropdownMenu} ${menuOpen ? styles.show : ''}`}>
                <button><a href="/"><span>Home</span></a></button>
                <button><a href="/AboutUs"><span>About Us</span></a></button>
                <button><Link to="/Fellowship"><span>Fellowship</span></Link></button>
                <button><a href="/Gallery"><span>Database</span></a></button>
                <button><Link to="/Dashboard"><span>My Account</span></Link></button>
            </div>
        <div className={styles.navButtons}>
                <button><a href="/"><span>Home</span></a></button>
                <button><a href="/AboutUs"><span>About Us</span></a></button>
                <button><Link href="/Fellowship"><span>Fellowship</span></Link></button>
                <button><a href="/Gallery"><span>Database</span></a></button>
                <button><Link to="/Dashboard"><span>My Account</span></Link></button>
        </div>
        
      </div>
    </nav>
  );
};

export default TopNav;