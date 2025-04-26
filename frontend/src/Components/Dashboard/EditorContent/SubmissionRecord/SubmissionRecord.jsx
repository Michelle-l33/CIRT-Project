import styles from './SubmissionRecord.module.css';

import SubmissionFiles from './SubmissionFiles';
import SubmissionDiscussion from './SubmissionComments';
import SubmissionStatus from './SubmissionStatus';
import SubmissionParticipant from './SubmissonParticipant';

import { SubmissionsProvider } from './SubmissionContext'
import { useState, useContext } from 'react';
import { dashBoardContext } from '../../Dashboard';

const SubmissionRecord = () => {

    const [currSubmission, setCurrSubmission] = useState(null);
    const { isClose } = useContext(dashBoardContext);

    const docTabContainerClass = `${styles.docTabContainer} ${isClose ? styles.close : ''}`;
    return(

        <SubmissionsProvider>

            <div className={docTabContainerClass}>
                <SubmissionFiles setCurrSubmission = {setCurrSubmission}/>
                <SubmissionStatus currSubmission={currSubmission}/>
                <SubmissionDiscussion />
                <SubmissionParticipant />
            </div>

        </SubmissionsProvider>
    );
}

export default SubmissionRecord;