import styles from './SubmissionRecord.module.css';

const SubmissionParticipant = () => {

    return(

        <div className={styles.participateContainer}>
                <div className = {styles.header}>
                    <h3>Submission accepted for review</h3>
                    <button>Assign</button>
                </div>

                <ul className = {styles.participateList}>
                    <li>
                        <span>Author</span>
                        <span>John Smith</span>
                        <button>Send A Reminder</button>
                    </li>

                    <li>
                        <span>Reviewer</span>
                        <span>Karen Chandler</span>
                        <button>Send A Reminder</button>
                    </li>

                </ul>
        </div>

    );
}

export default SubmissionParticipant;