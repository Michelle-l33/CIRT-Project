import styles from './SubmissionRecord.module.css';

import SubmissionFiles from './SubmissionFiles';
import SubmissionDiscussion from './SubmissionComments';
import SubmissionSatus from './SubmissionStatus';
import SubmissionParticipant from './SubmissonParticipant';

import { createContext, useState, useEffect } from 'react';

export const sumissionContext = createContext(null);

const SubmissionRecord = () => {

    const [ currSubmission, setCurrSubmission ] = useState(null);
    const [submissionList, setSubmissionList] = useState([]);

    console.log(currSubmission)
    const submissionListTest = [
        {
            author: "Author's name 1",
            title: "Title1: sbbdda sabd ashdb ashdb asdb",
            url: "#",
            currentStep: 1,
        },
        {
            author: "Author's name 2",
            title: "Title2: sbbdda sabd ashdb ashdb asdb",
            url: "#",
            currentStep: 3,
        },
        {
            author: "Author's name 3",
            title: "Title3: sbbdda sabd ashdb ashdb asdb",
            url: "#",
            currentStep: 4,
        },
        {
            author: "Author's name 4",
            title: "Title4: sbbdda sabd ashdb ashdb asdb",
            url: "#",
            currentStep: 1,
        },
        {
            author: "Author's name 5",
            title: "Title5: sbbdda sabd ashdb ashdb asdb",
            url: "#",
            currentStep: 2
        },
        {
            author: "Author's name 6",
            title: "Title6: sbbdda sabd ashdb ashdb asdb",
            url: "#",
            currentStep: 2
        },
        {
            author: "Author's name 7",
            title: "Title7: sbbdda sabd ashdb ashdb asdb",
            url: "#",
            currentStep: 4
        },
    ]
    
    useEffect(() => {
        setSubmissionList(submissionListTest);
    }, [])

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