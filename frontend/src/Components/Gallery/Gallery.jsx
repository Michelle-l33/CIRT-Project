import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './Gallery.module.css';
import PosterCard from './PosterCard/PosterCard';
import Sidebar from './Sidebar/Sidebar';
import TopNav from './TopNav/TopNav';
import { IoMenu } from 'react-icons/io5';

const Gallery = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [posters, setPosters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const searchLower = searchQuery.toLowerCase();
        const response = await fetch(
          `https://cirt-project-server.vercel.app/submission/gallery?page=${page}&q=${searchLower}`,
          { method: "GET" }
        );
        if (!response.ok) throw new Error("Failed to fetch gallery");
        const data = await response.json();
        setPosters(data.posters);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };
    fetchGallery();
  }, [page, searchQuery]);

  return (
    <div className={`${styles.galleryContainer} ${isSidebarOpen ? '' : styles.sidebarClosed}`}>
      <TopNav 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        toggleSidebar={toggleSidebar} 
      />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main className={styles.mainContent}>
        
        {posters.length > 0 ? (
          <>
            <div className={styles.posterGrid}>
              {posters.map((poster) => (
                <PosterCard key={poster._id} poster={poster} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.noResults}>
            No posters found matching your search.
          </div>
        )}
      </main>
    </div>
  );
};

export default Gallery;