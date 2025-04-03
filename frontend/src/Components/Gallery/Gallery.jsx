import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Gallery.module.css';
import PosterCard from './PosterCard/PosterCard';
import Sidebar from './Sidebar/Sidebar';
import TopNav from './TopNav/TopNav';
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
      <TopNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />  
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main className={styles.mainContent}>
      <h2 className={styles.pageTitle}>All Research Posters</h2> 
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