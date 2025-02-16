import styles from './SubmissionRecord.module.css';


const SubmissionSatus = () => {

    return(

        <div className={styles.statusContainer}>
                <div className = {styles.header}>
                    <h3>Submission accepted for review</h3>
                </div>

                <div className = {styles.statusAction}>
                    <button>Send to a reviewer</button>
                    <button>Decline submission</button>
                </div>
        </div>

    );
}

export default SubmissionSatus;