import styles from './MainContentAuthor.module.css';
import { Link } from "react-router-dom";

import { FaRegSmileWink } from "react-icons/fa";
import { ImFilePicture } from "react-icons/im";
import { MdUploadFile } from "react-icons/md";
import { IoDocumentOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { GrNotes } from "react-icons/gr";

import TrackBar from "./TrackBar/TrackBar";

import SubmissionPage from './SubmissionAuthor/SubmissionAuthor';

import { dashBoardContext } from './Dashboard';
import { useState, useContext } from 'react';


//geting Dates: https://www.shecodes.io/athena/7466-how-to-get-current-date-in-react
function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return `${month}/${date}`;
}

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

function submitSubmission() {
    // Add your submission logic here
    closeSubmittionPopUp();
}

const MainContentAuthor = () => {
    const { isClose } = useContext(dashBoardContext);
    const [ currentDate ] = useState(getDate());

    const mainContentClass = `${styles.mainContent} ${isClose ? styles.close : ''}`;
    return (
        <div className={mainContentClass}>
            <div className={styles.submissionPopUp}>
                <SubmissionPage />
                <button onClick={closeSubmittionPopUp}>Close</button>
            </div>

            <main>
                <div className={styles.header}>
                    <div className={styles.left}>
                        <h1>Dashboard Author</h1>
                        <ul className={styles.smallStuff}>
                            <li>
                                <Link to="#">New articles </Link>
                            </li>
                            /
                            <li>
                                <Link to="/"> Go to Homepage </Link> 
                            </li>
                        </ul>
                    </div>
                    <button className={styles.report} onClick={openSubmittionPopUp}><MdUploadFile />Upload a Document</button>                        
                </div>
            
                <ul className={styles.insights}>
                    <li key='posters'>
                        <ImFilePicture />
                        <span className={styles.info}>
                            <h3>10</h3>
                            <span>Num of Posters</span>
                        </span>
                    </li>
                    <li key='articles'>
                        <IoDocumentOutline />
                        <span className={styles.info}>
                            <h3>10</h3>
                            <span>Num of Articles</span>
                        </span>
                    </li>
                    <li key='date'>
                        <MdOutlineDateRange />
                        <span className={styles.info}>
                            <h3>{currentDate}</h3>
                            <span>Today Date</span>
                        </span>
                    </li>
                    <li key='happy'>
                        <FaRegSmileWink />
                        <span className={styles.info}>
                            <h3>Smile xD</h3>
                            <span>Be Happy!</span>
                        </span>
                    </li>
                </ul>

                <div className={styles.bottomData}>
                    <div className={styles.trachBarContainer}>
                        <TrackBar currentStep={2} />
                    </div>

                    <div className={styles.comment}>
                        <div className={styles.header}>
                            <GrNotes />
                            <h3>Comments</h3>
                        </div>

                        <ul className={styles.commentList}>
                            <li>
                                <p>Hello, hello, baby, you called? I can't hear a thing</p>
                                <span>- From: Editor</span>
                            </li>
                            <li>
                                <p>I have got no service in the club, you say, say?</p>
                                <span>- From: Reviewer</span>
                            </li>
                        </ul>                                  
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainContentAuthor;