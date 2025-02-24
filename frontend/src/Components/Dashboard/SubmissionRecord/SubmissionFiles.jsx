import styles from './SubmissionRecord.module.css';

import { Link } from "react-router-dom";

import { BsSearchHeart } from "react-icons/bs";

import { useContext, useState } from 'react';
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

    const [ filteredList, setFilteredList ] = useState(submissionList);

    const handleSearch = (query) => {

        const filteredList = submissionList.filter((submission) => 
            submission.author.toLowerCase().includes(query.toLowerCase()) ||
            submission.title.toLowerCase().includes(query.toLowerCase()))

        setFilteredList(filteredList);
    }
    
    return(
        <div className = {styles.filesContainer}>
            
            <div className = {styles.header}>
                <h3>Submission Files</h3>

                 <div className = {styles.left}>
                    <form onSubmit = {(event) => event.preventDefault()}>
                        <div className = {styles.formInput}>
                            <input  type = "text" 
                                    placeholder = "Search"
                                    onChange = {(event) => handleSearch(event.target.value)}></input>
                            <button type = "submit"><BsSearchHeart /></button>
                        </div>
                    </form>
       
                </div>
            </div>
            
            <ul className = {styles.contentList}>
                {filteredList.length > 0 ? (filteredList.map((submission, idx) =>
                    <li key = {idx} 
                        // the title is a placeholder for id
                        className = {`${styles.listItem} ${currSubmission?.title === submission.title? styles.active : ''}`} 
                        onClick = {() => setCurrSubmission(submission)}>
                        <Submission author = {submission.author} title = {submission.title} url = {submission.url} />
                    </li>
                )) : (<span>No Submission Found</span>)}
            </ul>
        </div>
    )
    ;
};

export default SubmissionFiles;