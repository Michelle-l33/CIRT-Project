import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './TopNav.module.css';

const TopNav = ({searchQuery, setSearchQuery}) => {
  const [localQuery, setLocalQuery] = useState('');
  const navigate = useNavigate();

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     navigate(`/search?query=${encodeURIComponent(localQuery)}`);
  //   }
  // };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
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
          value={searchQuery}
          onChange={handleChange}
          autoFocus
        />
      </form>
    </nav>
  );
};

export default TopNav;