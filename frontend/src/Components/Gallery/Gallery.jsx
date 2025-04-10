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
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

  // Responsive Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768); // Sidebar is open on larger screens
  
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
  
    const handleResize = () => {
      setIsSidebarOpen(!mediaQuery.matches); 
    };
  
    handleResize(); 
    mediaQuery.addEventListener("change", handleResize);
  
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);


  // Fetch gallery data
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const searchLower = searchQuery.toLowerCase();
        const response = await fetch(`https://cirt-project-server.vercel.app/submission/gallery?page=${page}&q=${searchLower}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch gallery");
        }
        const data = await response.json();
        setPosters(data.posters);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };
    fetchGallery();
    console.log("Posters: ", posters);
  }, [page,searchQuery]);

  // Filter posters based on search query
<<<<<<< Updated upstream
  // const filteredPosters = posters.filter((poster) => {
  //   //const searchLower = searchQuery.toLowerCase();
  //   return (
  //     poster.title.toLowerCase().includes(searchLower) ||
  //     poster.firstName.toLowerCase().includes(searchLower) ||
  //     poster.lastName.toLowerCase().includes(searchLower)
  //   );
  // });
=======
  const filteredPosters = Array.isArray(posters) ? posters.filter((poster) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      poster.title.toLowerCase().includes(searchLower) ||
      poster.firstName.toLowerCase().includes(searchLower) ||
      poster.lastName.toLowerCase().includes(searchLower)
    );
  }) : [];
>>>>>>> Stashed changes

  return (
    <div className={styles.galleryContainer}>
      <TopNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />  
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main className={styles.mainContent}>
 
        <div className={styles.posterGrid}>
  {posters.map((poster) => (
    <PosterCard key={poster._id} poster={poster} />
  ))}
</div>
<div className={styles.pagination}>
    <button
      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      disabled={page === 1}
    >
      Previous
    </button>

    <span>Page {page} of {totalPages}</span>

    <button
      onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={page === totalPages}
    >
      Next
    </button>
  </div>
      </main>
    </div>
  );
};

export default Gallery;