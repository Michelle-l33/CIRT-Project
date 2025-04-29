import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './Gallery.module.css';
import PosterCard from './PosterCard/PosterCard';
import Sidebar from './Sidebar/Sidebar';
import TopNav from './TopNav/TopNav';
import { IoMenu } from 'react-icons/io5';
import PaperCard from './PosterCard/PaperCard';

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [posters, setPosters] = useState([]);
  const [papers, setPapers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [selectedTags, setSelectedTags] = useState([]);
  const initialTab = searchParams.get("isPosterTab") === "false" ? false : true;
  const [isPosterTab, setIsPosterTab] = useState(initialTab);
  const [loading, setLoading] = useState(true);

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
    const fetchData = async () => {
      setLoading(true);
      const searchLower = searchQuery.toLowerCase();
      const endpoint = isPosterTab
        ? `gallery`
        : `publications`;

      try {
        const response = await fetch(`https://cirt-project-server.vercel.app/submission/${endpoint}?page=${page}&q=${searchLower}`);
        if (!response.ok) throw new Error(`Failed to fetch ${isPosterTab ? 'posters' : 'papers'}`);
        const data = await response.json();

        if (isPosterTab) {
          setPosters(data.posters.map(poster => ({
            ...poster,
            tags: poster.tags || [
              sampleCategories[Math.floor(Math.random() * sampleCategories.length)],
              sampleCategories[Math.floor(Math.random() * sampleCategories.length)]
            ]
          })));
        } else {
          setPapers(data.articles);
        }
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, searchQuery, isPosterTab]);

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

  const postersWithCategories = posters.map(poster => ({
    ...poster,
    tags: poster.tags || [
      sampleCategories[Math.floor(Math.random() * sampleCategories.length)],
      sampleCategories[Math.floor(Math.random() * sampleCategories.length)]
    ]
  }));
  
  const filteredItems = selectedTags.length
    ? (isPosterTab ? posters : papers).filter(item =>
        selectedTags.every(tag => item.tags?.includes(tag))
      )
    : (isPosterTab ? posters : papers);

    return (
      <div className={`${styles.galleryContainer} ${isSidebarOpen ? '' : styles.sidebarClosed}`}>
        <TopNav 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          toggleSidebar={toggleSidebar}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          sampleCategories={sampleCategories}
        />

        <Sidebar 
          isOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
          onSelectTab={setIsPosterTab} 
          isPosterTab={isPosterTab}
        />
  
        <main className={styles.mainContent}>
          <div className={styles.tagFilter}>
            {sampleCategories.map((tag) => (
              <button
                key={tag}
                className={`${styles.tagFilterBtn} ${selectedTags.includes(tag) ? styles.active : ''}`}
                onClick={() => {
                  setSelectedTags(prev =>
                    prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                  );
                }}
              >
                {tag}
              </button>
            ))}
          </div>
  
          {loading ? (
            <div>Loading {isPosterTab ? 'posters' : 'papers'}...</div>
          ) : filteredItems.length > 0 ? (
            <>
              <div className={isPosterTab ? styles.posterGrid : styles.papersList}>
                {isPosterTab ? (
                  filteredItems.map(poster => <PosterCard key={poster._id} poster={poster} />)
                ) : (
                  filteredItems.map(paper => <PaperCard key = {paper._id} paper={paper}/>)
                )}
              </div>
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>Previous</button>
                  <span>Page {page} of {totalPages}</span>
                  <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>Next</button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.noResults}>
              No {isPosterTab ? 'posters' : 'papers'} found matching your search.
            </div>
          )}
        </main>
      </div>
    );
  };
  

export default Gallery;