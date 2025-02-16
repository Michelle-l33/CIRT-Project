import styles from './SubmissionRecord.module.css';

import SubmissionFiles from './SubmissionFiles';
import SubmissionDiscussion from './SubmissionComments';
import SubmissionSatus from './SubmissionStatus';
import SubmissionParticipant from './SubmissonParticipant';

const SubmissionRecord = () => {

    return(

        <div className={styles.docTabContainer}>
               <SubmissionFiles />
               <SubmissionSatus />
               <SubmissionDiscussion />
               <SubmissionParticipant />
        </div>

    );
}

export default SubmissionRecord;