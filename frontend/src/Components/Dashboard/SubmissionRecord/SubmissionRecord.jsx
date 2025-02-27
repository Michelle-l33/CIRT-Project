import styles from './SubmissionRecord.module.css';

import SubmissionFiles from './SubmissionFiles';
import SubmissionDiscussion from './SubmissionComments';
import SubmissionSatus from './SubmissionStatus';
import SubmissionParticipant from './SubmissonParticipant';

import { createContext, useState, useReducer } from 'react';

export const sumissionContext = createContext(null);

const SubmissionRecord = () => {
    function submissionReducer(submission, action) {

    }

    const [ currSubmission, setCurrSubmission ] = useState(null);

    const [ submissionList, dispatch ] = useReducer( submissionReducer, [
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
    ]);

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