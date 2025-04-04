import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './TopNav.module.css';

const TopNav = () => {
  const [localQuery, setLocalQuery] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?query=${encodeURIComponent(localQuery)}`);
    }
  };

  return (
    <nav className={styles.topNav}>
      <Link to="/" className={styles.homeLink}>
        <span className={styles.homeIcon}></span>
      </Link>
      <span className={styles.pageTitle}>Criminology Institute for Research and Training Repository</span>
      <form
        className={styles.searchContainer}
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/search?query=${encodeURIComponent(localQuery)}`);
        }}
      >
        <input
          type="text"
          placeholder="Search research posters..."
          className={styles.searchInput}
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          autoFocus
        />
      </form>
    </nav>
  );
};

export default TopNav;