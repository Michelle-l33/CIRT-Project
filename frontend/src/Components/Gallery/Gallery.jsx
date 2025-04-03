import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Gallery.module.css';
import PosterCard from './PosterCard';
import { useSearchParams } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

const Gallery = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const [searchQuery, setSearchQuery] = useState(query);
    const [posters, setPosters] = useState([]);

  // Responsive Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768); // Sidebar is open on larger screens
  
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
  
    const handleResize = () => {
      setIsSidebarOpen(!mediaQuery.matches); // Sidebar closed when <= 768px, open otherwise
    };
  
    handleResize(); // Set initial state based on screen size
    mediaQuery.addEventListener("change", handleResize);
  
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);


  // Fetch gallery data
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("https://cirt-project-server.vercel.app/submission/gallery", {
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

      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.show : ''}`}>
              <button onClick={toggleSidebar} className={`${styles.sidebarToggle} ${isSidebarOpen ? styles.open : ''}`}>
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
              {/* <nav className={`${styles.sidebarNav} ${isSidebarOpen ? styles.show : ''}`}> */}
              {isSidebarOpen && (
                <nav className={styles.sidebarNav}>
                  <Link to="/Papers" className={styles.navItem}>All Papers</Link>
                  <Link to="/Gallery" className={styles.navItem}>All Posters</Link>
                  <Link to="/submit" className={styles.navItem}>Submit Research</Link>
                  <Link to="/guides" className={styles.navItem}>Author Guidelines</Link>
                  <Link to="/contact" className={styles.navItem}>Research Support</Link>
                </nav>
              )}
      
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