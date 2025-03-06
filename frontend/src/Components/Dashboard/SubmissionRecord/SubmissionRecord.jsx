import styles from './SubmissionRecord.module.css';

import SubmissionFiles from './SubmissionFiles';
import SubmissionDiscussion from './SubmissionComments';
import SubmissionStatus from './SubmissionStatus';
import SubmissionParticipant from './SubmissonParticipant';

import { SubmissionsProvider } from './SubmissionContext'
import { useState } from 'react';

const SubmissionRecord = () => {

    const [currSubmission, setCurrSubmission] = useState(null);


    return(

        <SubmissionsProvider>

            <div className={styles.docTabContainer}>
                <SubmissionFiles setCurrSubmission = {setCurrSubmission}/>
                <SubmissionStatus currSubmission={currSubmission}/>
                <SubmissionDiscussion />
                <SubmissionParticipant />
            </div>

        </SubmissionsProvider>
    );
}

export default SubmissionRecord;