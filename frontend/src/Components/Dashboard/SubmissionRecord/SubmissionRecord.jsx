import styles from './SubmissionRecord.module.css';

import SubmissionFiles from './SubmissionFiles';
import SubmissionDiscussion from './SubmissionComments';
import SubmissionSatus from './SubmissionStatus';
import SubmissionParticipant from './SubmissonParticipant';

import { createContext, useState, useReducer, useEffect } from 'react';

export const sumissionContext = createContext(null);

const SubmissionRecord = () => {
    function submissionReducer(submission, action) {

    }

    const [ currSubmission, setCurrSubmission ] = useState(null);
    const[submissionList,setSubmissionList] = useState([]);
    const [loading, setLoading] = useState(true);
    /* const [ submissionList, dispatch ] = useReducer( submissionReducer, [
        {   
            id: 101,
            author: "Kiril Pangu",
            title: "Title1: sbbdda sabd ashdb ashdb asdb",
            url: "#",
            currentStep: 1,
        },
        {
            id: 102,
            author: "Marie-Ève Gaby",
            title: "Title2: sbbdda sabd ashdb ashdb asdb",
            url: "#",
            currentStep: 3,
        },
        {
            id: 103,
            author: "Peter Nithya",
            title: "Title3: sbbdda sabd ashdb ashdb asdb",
            url: "#",
            currentStep: 4,
        },
        {
            id: 104,
            author: "Kole Ozan",
            title: "Title4: sbbdda sabd ashdb ashdb asdb",
            url: "#",
            currentStep: 1,
        },
        {
            id: 105,
            author: "Slàine Bastian",
            title: "Title5: sbbdda sabd ashdb ashdb asdb",
            url: "#",
            currentStep: 2
        },
        {
            id: 106,
            author: "Africanus Aster",
            title: "Title6: sbbdda sabd ashdb ashdb asdb",
            url: "#",
            currentStep: 2
        },
        {
            id: 107,
            author: "María Ángeles Latda",
            title: "Title7: sbbdda sabd ashdb ashdb asdb",
            url: "#",
            currentStep: 4
        },
    ]); */

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
                console.log(submissionList);
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
                <SubmissionSatus />
                <SubmissionDiscussion />
                <SubmissionParticipant />
            </div>

        </sumissionContext.Provider>
    );
}

export default SubmissionRecord;