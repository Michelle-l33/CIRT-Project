import styles from './SubmissionRecord.module.css';

import { Link } from "react-router-dom";

import { BsSearchHeart } from "react-icons/bs";

import { useContext } from 'react';
import { sumissionContext } from './SubmissionRecord'

const Submission = ({author, title, url}) => {
    return (
        <>
            <h4>{author}</h4>
            <Link to = {url}>
                <p>{title}</p>
            </Link>
            <button>Download</button>
        </>
    );
};

const SubmissionFiles = () => {

    const { currSubmission, setCurrSubmission, submissionList } = useContext(sumissionContext);

    return(
        <div className = {styles.filesContainer}>
            
            <div className = {styles.header}>
                <h3>Submission Files</h3>

                 <div className = {styles.left}>
                    <form>
                        <div className = {styles.formInput}>
                            <input type = "search" placeholder = "Search"></input>
                            <button><BsSearchHeart /></button>
                        </div>
                    </form>
                </div>
            </div>
            
            <ul className = {styles.contentList}>
                {submissionList.map((submission, idx) =>
                    <li key = {idx} className = {`${styles.listItem} ${currSubmission?.title === submission.title? styles.active : ''}`} onClick = {() => setCurrSubmission(submission)}>
                        <Submission author = {submission.author} title = {submission.title} url = {submission.url} />
                    </li>
                )}
            </ul>
        </div>
    )
    ;
};

export default SubmissionFiles;