import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Papers.module.css';
import { useSearchParams } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

const Papers = () => {

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [papers, setPapers] = useState([]);
  // Dummy data for papers
  // const papers = [
  //   { id: 1, title: "AI in Healthcare Research", author: "Dr. Smith", pdf: 'pdf1.pdf' },
  //   { id: 2, title: "Marine Biology Study", author: "Dr. Johnson", pdf: 'pdf2.pdf' },
  //   { id: 3, title: "Urban Development Analysis", author: "Dr. Williams", pdf: 'pdf3.pdf' },
  //   { id: 4, title: "Quantum Computing Advancements", author: "Dr. Brown", pdf: 'pdf4.pdf' },
  //   { id: 5, title: "Climate Change Impact", author: "Dr. Davis", pdf: 'pdf5.pdf' },
  //   { id: 6, title: "Neuroscience Breakthroughs", author: "Dr. Wilson", pdf: 'pdf6.pdf' }
  // ];
  // const sidebarNav = document.querySelector('.sidebarNav');
  // const sidebar = document.querySelector('.sidebar');
  // const navItem = document.querySelectorAll('.navItem');
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
        const response = await fetch("https://cirt-project-server.vercel.app/submission/publications",{
          method:"GET"
        })
        if(!response.ok){
          throw new Error ("Failed to fetch papers");
        }
        const data = await response.json();
        setPapers(data);
        
      } catch (error){
        console.error("Error fetching papers:", error);
      }
    }
    fetchPapers();
    console.log("Papers: ", papers);
  },[]);

  // Filter papers based on search query
  const filteredPapers = papers.filter(paper => {
    const searchLower = searchQuery.toLowerCase();
    return (
      paper.title.toLowerCase().includes(searchLower) ||
      paper.firstName.toLowerCase().includes(searchLower) ||
      paper.lastName.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className={styles.papersContainer}>
      {/* Top Navigation */}
      <nav className={styles.topNav}>
        <Link to="/" className={styles.homeLink}>
          <span className={styles.homeIcon}></span>
          <span>Criminology Institute for Research and Training Repository</span>
        </Link>
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Search research papers..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.papersList}>
          {filteredPapers.map(paper => (
            <article key={paper.id} className={styles.paperItem}>
              <div className={styles.paperInfo}>
                <h3>{paper.title}</h3>
                <p className={styles.author}>{paper.author}</p>
              </div>
              <div className={styles.actions}>
                <Link to= {`/Gallery/submission/${paper._id}`} className={styles.pdfButton}>View Article</Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Papers;