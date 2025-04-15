import styles from './SubmissionRecord.module.css';

import { Link, useSearchParams } from "react-router-dom";

import { BsSearchHeart } from "react-icons/bs";

import { useState, useEffect } from 'react';

import { useSubmissions } from './SubmissionContext'

// populates files into editor "document" tab


export const Submission = ({firstName, lastName, title, url, id}) => {
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", ""); // Triggers download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <>
            <h4>{firstName} {lastName}</h4>
            <Link to= {`/Gallery/submission/${id}`} target="_blank">
                <p>{title}</p>
            </Link>

            <button className={styles.subDownload} onClick={handleDownload}>Download</button>
        </>
    );
};

const SubmissionFiles = ({setCurrSubmission}) => {

    const submissionList = useSubmissions();

    const [ filteredList, setFilteredList ] = useState([]);

    const [ searchParams, setSearchParams ] = useSearchParams();

    const currentSubmissionId = searchParams.get('submissionId');

    useEffect(() => {
        setFilteredList(submissionList);
    }, [submissionList]);

    const handleSearch = (query) => {

        const filteredList = submissionList.filter((submission) => 
            submission.firstName.toLowerCase().includes(query.toLowerCase()) ||
            submission.lastName.toLowerCase().includes(query.toLowerCase()) ||
            submission.title.toLowerCase().includes(query.toLowerCase()))

        setFilteredList(filteredList);
    }

    // const navigate = useNavigate()

    const handleSubmissionChange = (submission) => {
        // navigate(`?submissionId=${submission._id}`);
        setCurrSubmission(submission);
        setSearchParams({ submissionId: submission._id });
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
                        className = {`${styles.listItem} ${currentSubmissionId === submission._id? styles.active : ''}`} 
                        onClick = {() => handleSubmissionChange(submission)}>
                        <Submission firstName = {submission.firstName} lastName = {submission.lastName} title = {submission.title} url = {submission.document} id = {submission._id} />
                    </li>
                )) : (<span>No Submission Found</span>)}
            </ul>
        </div>
    )
    ;
};

export default SubmissionFiles;