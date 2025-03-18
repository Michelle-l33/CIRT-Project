import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Gallery.module.css';
import PosterCard from './PosterCard';
import { useSearchParams } from "react-router-dom";

const Gallery = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const [searchQuery, setSearchQuery] = useState(query);
    const [posters, setPosters] = useState([]);

  // Fetch gallery data
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("http://localhost:8082/submission/gallery", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch gallery");
        }
        const data = await response.json();
        setPosters(data);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };
    fetchGallery();
  }, []);

  // Filter posters based on search query
  const filteredPosters = posters.filter((poster) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      poster.title.toLowerCase().includes(searchLower) ||
      poster.firstName.toLowerCase().includes(searchLower) ||
      poster.lastName.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className={styles.galleryContainer}>
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

      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link to="/">
          <img
            src="/assets/utampa_logo.png"
            alt="UT Logo"
            className={styles.logo}
          />
          </Link>
          
        </div>
        <nav className={styles.sidebarNav}>
          <Link to="/Gallery" className={styles.navItem}>All Posters</Link>
          <Link to="/Papers" className={styles.navItem}>All Papers</Link>
          <Link to="/submit" className={styles.navItem}>Submit Research</Link>
          <Link to="/guides" className={styles.navItem}>Author Guidelines</Link>
          <Link to="/contact" className={styles.navItem}>Research Support</Link>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.posterGrid}>
          {filteredPosters.map((poster) => (
            <PosterCard key={poster._id} poster={poster} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Gallery;