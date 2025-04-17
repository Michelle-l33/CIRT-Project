import React, { useState, useRef, useEffect } from 'react';
import styles from './TopNav.module.css';
import utampaLogo from '../../../Asset/Spartans.logo.png'; 

const TopNav = ({ searchQuery, setSearchQuery, isSidebarOpen, selectedTags, setSelectedTags, sampleCategories }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <div className={styles.searchContainer} ref={dropdownRef}>
          <input
            type="text"
            placeholder="Search research posters..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleChange}
            onFocus={() => setIsDropdownOpen(true)}
          />
          {isDropdownOpen && (
            <div className={styles.tagDropdownPanel}>
              {sampleCategories.map((tag) => (
                <label key={tag} className={styles.tagOption}>
                  <input
                    type="checkbox"
                    value={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={() => {
                      if (selectedTags.includes(tag)) {
                        setSelectedTags(selectedTags.filter(t => t !== tag));
                      } else {
                        setSelectedTags([...selectedTags, tag]);
                      }
                    }}
                  />
                  {tag}
                </label>
              ))}
            </div>
          )}
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