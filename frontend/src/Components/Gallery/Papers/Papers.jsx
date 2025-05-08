import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Papers.module.css';
import { useSearchParams } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import Sidebar from '../Sidebar/Sidebar';
import TopNav from '../TopNav/TopNav';

const Papers = () => {

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [papers, setPapers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);  
  const [loading, setLoading] = useState(true);
  
  const sampleCategories = [
    "Corrections",
    "Courts/Sentencing",
    "White Collar Crime",
    "Mental Health",
    "Victimology",
    "Criminal Theory",
    "Statistics/Methodology",
    "Policing",
    "Crime Prevention",
    "Policy"
  ];
  
  const [selectedTags, setSelectedTags] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
 
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
  

  useEffect(()=>{
    const fetchPapers = async ()=>{
      try{
        const searchLower = searchQuery.toLowerCase();
        const response = await fetch(`https://cirt-project-server.vercel.app/submission/publications?page=${page}&q=${searchLower}`,{
          method:"GET"
        })
        if(!response.ok){
          throw new Error ("Failed to fetch papers");
        }
        const data = await response.json();
        setPapers(data.articles);
        setTotalPages(data.totalPages);
        
      } catch (error){
        console.error("Error fetching papers:", error);
      }finally{
        setLoading(false);
      }
    }
    fetchPapers();
    console.log("Papers: ", papers);
  },[page, searchQuery]);

  const filteredPapers = selectedTags.length
    ? papers.filter(paper =>
        selectedTags.every(tag => paper.tags?.includes(tag))
      )
    : papers;

  if (loading) {
    return <div>Loading papers...</div>;
  }

  return (
    <div className={`${styles.papersContainer} ${!isSidebarOpen ? styles.sidebarClosed : ''}`} >
      <TopNav 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        toggleSidebar={toggleSidebar}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        sampleCategories={sampleCategories}
      />

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.tagFilter}>
          {sampleCategories.map((tag) => (
            <button
              key={tag}
              className={`${styles.tagFilterBtn} ${selectedTags.includes(tag) ? styles.active : ''}`}
              onClick={() => {
                setSelectedTags(prev =>
                  prev.includes(tag)
                    ? prev.filter(t => t !== tag)
                    : [...prev, tag]
                );
              }}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className={styles.papersList}>
          {filteredPapers.map(paper => (
            <article key={paper.id} className={styles.paperItem}>
              <div className={styles.paperLeft}>
                <input type="checkbox" className={styles.paperCheckbox} />
                <div className={styles.paperMeta}>
                  <span className={styles.paperLabel}>JOURNAL ARTICLE</span>
                  <h3 className={styles.paperTitle}>{paper.title}</h3>
                  <p className={styles.paperAuthor}>
                    {paper.firstName} {paper.lastName}
                  </p>
                  <div className={styles.tags}>
                    {(paper.tags?.length ? paper.tags : ["Policy", "Mental Health"]).map((tag, index) => (
                      <span key={index} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                  <p className={styles.paperAbstract}>
                    {paper.abstract ? `${paper.abstract.substring(0, 200)}...` : "No preview available."}
                  </p>
                </div>
              </div>
              <div className={styles.paperActions}>
                <Link to={`/Gallery/submission/${paper._id}`} className={styles.downloadBtn}>View Article</Link>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.pagination}>
          <div className={styles.paginationContent}>
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
        </div>
      </main>
    </div>
  );
};

export default Papers;