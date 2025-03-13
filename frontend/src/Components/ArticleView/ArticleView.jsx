import SearchBar from "./SearchBar/SearchBar"
import styles from './ArticleView.module.css';
// import { useState } from 'react';
import { RiArticleLine, RiFullscreenLine } from "react-icons/ri";
import { PiSidebarSimpleLight } from "react-icons/pi";
import { MdOutlineZoomIn, MdOutlineZoomOut } from "react-icons/md";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";


const ArticleViewPage = () => {

    return (
        <div className={styles.bigContainer}>
            <SearchBar className={styles.searchBar}/>
            <main>
                <div className={styles.articleInformation}>
                    <div className={styles.categoryTag}>
                        <RiArticleLine /><span>Journal Article</span>
                    </div>
                    <div className={styles.title}>
                        Article Title: A sample for this page
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