import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Papers.module.css';
import { useSearchParams } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

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
    <div className={styles.papersContainer}>
      {/* Top Navigation */}
      <nav className={styles.topNav}>
        <Link to="/" className={styles.homeLink}>
          <span className={styles.homeIcon}></span>
          <span>Criminology Institute for Research and Training Repository</span>
        </Link>
        <div className={styles.searchContainer} ref={searchRef}>
          <input 
            type="text" 
            placeholder="Search research papers..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
      </nav>

      {/* Sidebar */}
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

      {/* Main Content */}
      <main className={styles.mainContent}>
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