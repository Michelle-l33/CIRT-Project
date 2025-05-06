import styles from './MainContentAuthor.module.css';
import { Link } from "react-router-dom";
import { MdUploadFile } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";

import SubmissionPage from './SubmissionAuthor/SubmissionAuthor';

import { dashBoardContext } from '../Dashboard';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

function openSubmittionPopUp() { 
    document.querySelector(`.${styles.submissionPopUp}`).style.display = 'block';
    document.querySelector(`.${styles.submissionPopUp}`).style.height = '100vh';
    document.querySelector(`.${styles.submissionPopUp}`).style.width = '100vw';
    document.body.style.overflow = 'hidden';
}

function closeSubmittionPopUp() { 
    document.querySelector(`.${styles.submissionPopUp}`).style.display = 'none';
    document.body.style.overflow = 'auto';
}

const MainContentAuthor = () => {
    const { isClose } = useContext(dashBoardContext);

    const mainContentClass = `${styles.mainContent} ${isClose ? styles.close : ''}`;
    
    return (
        <div className={mainContentClass}>
            <div className={styles.submissionPopUp}>
                <SubmissionPage />
                <button className={styles.closeButton} onClick={closeSubmittionPopUp}><IoMdCloseCircle size={32}/></button>
            </div>

            <main>
                <div className={styles.header}>
                    <div className={styles.left}>
                        <h1>Dashboard Author</h1>
                        <ul className={styles.smallStuff}>
                            <li>
                                <Link to="/Gallery"> View articles </Link>
                            </li>
                            /
                            <li>
                                <Link to="/"> Go to Homepage </Link> 
                            </li>
                        </ul>
                    </div>
                    <button className={styles.upload} onClick={openSubmittionPopUp}><MdUploadFile />Upload a Document</button>                        
                </div>
                <div className={styles.content}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainContentAuthor;
