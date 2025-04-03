import SearchBar from "./SearchBar/SearchBar"
import styles from './ArticleView.module.css';
// import { useState } from 'react';
import { RiArticleLine } from "react-icons/ri";
import {useUser} from "../Login/UserContext";
import React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";

const ArticleViewPage = () => {
    const {id} = useParams();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const {user} = useUser();
    console.log("subID: ",id);

    // Responsive Abstract
    const [isAbstractOpen, setisAbstractOpen] = useState(window.innerWidth > 768); // Sidebar is open on larger screens
    
      const toggleAbstract = () => {
        setisAbstractOpen(prev => !prev);
      };
    
      useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
      
        const handleResize = () => {
          setisAbstractOpen(!mediaQuery.matches); // Sidebar closed when <= 768px, open otherwise
        };
      
        handleResize(); // Set initial state based on screen size
        mediaQuery.addEventListener("change", handleResize);
      
        return () => mediaQuery.removeEventListener("change", handleResize);
      }, []);

    useEffect(() => {
        const fetchSubmission = async () => {
          try {
            const response = await fetch(`https://cirt-project-server.vercel.app/submission/${id}`, {
              method: "GET",
            });
            if (!response.ok) {
              throw new Error("Failed to fetch submission");
            }
            const data = await response.json();
            setSubmission(data);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching submission:", error);
          }
        };
        fetchSubmission();
      }, [id]);

    return (
        <div className={styles.bigContainer}>
            <SearchBar className={styles.searchBar}/>
            <main>
                <div className={styles.articleInformation}>
                    <div className={styles.categoryTag}>
                        <RiArticleLine /><span>{loading ? "Loading": submission.isPoster ? "Poster" : "Article"}</span>
                    </div>
                    <div className={styles.title}>

                    <h1>{loading ? "Loading..." : submission?.title || "Title Not Found"}</h1>
                    </div>
                    <div className={styles.contributors}>
                    <h1>{loading ? "Loading..." : user?.isReviewer ? "REDACTED" :`${submission?.lastName}, ${submission.firstName}` || "Author Not Found"}</h1>
                    </div>
                    <div className={styles.contributors}>
                    <h2>
                      {loading ? "Loading..." : submission?.collaborators?.length > 0 ? (
                        `Collaborators: ${submission.collaborators.join(", ")}` // Display as comma-separated list
                      ) : (
                        ""
                      )}
                    </h2>
                    </div>
                      {window.innerWidth > 758 && (
                          <div className={styles.abstractContainer}> 
                          <h3>Abstract</h3>
                          <article>{loading ? "Loading..." : submission?.abstract || "Abstract Not Available"}</article>
                        </div>
                      )}
                    
                    {/* Abstract */}
                  {window.innerWidth <= 758 && (
                    <aside className={`${styles.abstractContainer} ${isAbstractOpen ? styles.show : ''}`}>
                      <button onClick={toggleAbstract} className={`${styles.abstractToggle} ${isAbstractOpen ? styles.open : ''}`}>
                        <h3>Abstract</h3>
                        {isAbstractOpen ? <RiArrowUpSLine size={24} color="black" /> : <RiArrowDownSLine size={24} color="black" />}
                      </button>
                      {isAbstractOpen && (
                        <article>{loading ? "Loading..." : submission?.abstract || "Abstract Not Available"}</article>
                      )}
                    </aside>
                  )}

                </div>
                
                <section className={styles.pdfWrapper}> {/* <Name/> */}
                    {/* <div className={styles.pdfNavBar}>
                        <div className={styles.leftControl}><button><PiSidebarSimpleLight  size={28} color={"white"}/></button><button><MdOutlineZoomIn size={28} color={"white"}/></button><button><MdOutlineZoomOut size={28} color={"white"}/></button></div>
                        <div className={styles.centerControl}><button><FaAngleUp size={28} color={"white"}/></button><button><FaAngleDown size={28} color={"white"}/></button></div>
                        <div className={styles.rightControl}><button><RiFullscreenLine size={28} color={"white"}/></button></div>
                    </div> */}
                    {submission?.document ? (
                        <iframe 
                            src={submission.document} 
                            width="100%" 
                            height="600px" 
                            style={{ border: "none" }}
                        />
                    ) : (
                        <p>No PDF available</p>
                    )}
                    {/* <img src="https://media1.tenor.com/m/yqGDxokI9c4AAAAd/brazilian-luffy-dance.gif" alt="" /> */}
                </section>
            </main>
        </div>
    );
};

export default ArticleViewPage