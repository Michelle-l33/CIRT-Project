import styles from './SubmissionRecord.module.css';

import SubmissionFiles from './SubmissionFiles';
import SubmissionDiscussion from './SubmissionDiscussion';

const SubmissionRecord = () => {

    return(

        <div className={styles.docTabContainer}>
               <SubmissionFiles />
               <SubmissionDiscussion />
        </div>

    );
}

export default SubmissionRecord;