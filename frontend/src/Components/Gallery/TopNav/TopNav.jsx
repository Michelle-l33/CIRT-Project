import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TopNav.module.css';

const TopNav = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className={styles.topNav}>
      <Link to="/" className={styles.homeLink}>
        <span className={styles.homeIcon}></span>
        <span>Criminology Institute for Research and Training Repository</span>
      </Link>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search research posters..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </nav>
  );
};

export default TopNav;