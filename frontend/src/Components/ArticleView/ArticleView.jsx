import SearchBar from "./SearchBar/SearchBar"
import styles from './ArticleView.module.css';
// import { useState } from 'react';
import { RiArticleLine, RiFullscreenLine } from "react-icons/ri";
import { PiSidebarSimpleLight } from "react-icons/pi";
import { MdOutlineZoomIn, MdOutlineZoomOut } from "react-icons/md";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import React from 'react';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';


const ArticleViewPage = () => {
    const {id} = useParams();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    console.log("subID: ",id);

    useEffect(() => {
        const fetchSubmission = async () => {
          try {
            const response = await fetch(`http://localhost:8082/submission/${id}`, {
              method: "GET",
            });
            if (!response.ok) {
              throw new Error("Failed to fetch submission");
            }
            const data = await response.json();
            setSubmission(data);
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
                        <RiArticleLine /><span>Journal Article</span>
                    </div>
                    <div className={styles.title}>
                        <h1>{submission.title}</h1>
                    </div>
                    <div className={styles.contributors}>
                        John Pork, Thiago Silva, Eminem
                    </div>
                </div>
                
                <section className={styles.pdfWrapper}> {/* <Name/> */}
                    <div className={styles.pdfNavBar}>
                        <div className={styles.leftControl}><button><PiSidebarSimpleLight  size={28} color={"white"}/></button><button><MdOutlineZoomIn size={28} color={"white"}/></button><button><MdOutlineZoomOut size={28} color={"white"}/></button></div>
                        <div className={styles.centerControl}><button><FaAngleUp size={28} color={"white"}/></button><button><FaAngleDown size={28} color={"white"}/></button></div>
                        <div className={styles.rightControl}><button><RiFullscreenLine size={28} color={"white"}/></button></div>
                    </div>
                    <img src="https://media1.tenor.com/m/yqGDxokI9c4AAAAd/brazilian-luffy-dance.gif" alt="" />
                </section>
            </main>
        </div>
    );
};

export default ArticleViewPage