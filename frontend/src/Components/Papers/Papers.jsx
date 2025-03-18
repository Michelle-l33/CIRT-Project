import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Papers.module.css';
import { useSearchParams } from "react-router-dom";

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


  useEffect(()=>{
    const fetchPapers = async ()=>{
      try{
        const response = await fetch("http://localhost:8082/submission/publications",{
          method:"GET"
        })
        if(!response.ok){
          throw new Error ("Failed to fetch papers");
        }
        const data = await response.json();
        setPapers(data);
        console.log("Papers: ", papers);
      } catch (error){
        console.error("Error fetching papers:", error);
      }
    }
    fetchPapers();
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
          <Link to="/Papers" className={styles.navItem}>All Papers</Link>
          <Link to="/Gallery" className={styles.navItem}>All Posters</Link>
          <Link to="/submit" className={styles.navItem}>Submit Research</Link>
          <Link to="/guides" className={styles.navItem}>Author Guidelines</Link>
          <Link to="/contact" className={styles.navItem}>Research Support</Link>
        </nav>
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
                <a 
                  href={`/assets/papers/${paper.pdf}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.pdfButton}
                >
                  View PDF
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Papers;