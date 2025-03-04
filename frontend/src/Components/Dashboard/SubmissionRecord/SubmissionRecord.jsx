import styles from './SubmissionRecord.module.css';

import SubmissionFiles from './SubmissionFiles';
import SubmissionDiscussion from './SubmissionComments';
import SubmissionStatus from './SubmissionStatus';
import SubmissionParticipant from './SubmissonParticipant';

import { createContext, useState, useEffect } from 'react';

export const sumissionContext = createContext(null);

const SubmissionRecord = () => {

    const [ currSubmission, setCurrSubmission ] = useState(null);
    const[ submissionList,setSubmissionList ] = useState([]);
    const [ loading, setLoading ] = useState(true);


    useEffect(()=>{
        const fetchSubmissions = async () => {
            try {
                const response = await fetch("http://localhost:8082/submission/unpublished",{
                    method: "GET"
                })
                if (!response.ok) {
                    throw new Error("Failed to fetch submissions");
                }
        
                const submissions = await response.json();
                setSubmissionList(submissions);
                
            } catch (error) {
                console.error("Error fetching submissions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubmissions();
    },[]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return(

        <sumissionContext.Provider value = {{currSubmission, setCurrSubmission, submissionList}}>

            <div className={styles.docTabContainer}>
                <SubmissionFiles />
                <SubmissionStatus />
                <SubmissionDiscussion />
                <SubmissionParticipant />
            </div>

        </sumissionContext.Provider>
    );
}

export default SubmissionRecord;