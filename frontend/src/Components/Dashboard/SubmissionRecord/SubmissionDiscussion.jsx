import styles from './SubmissionRecord.module.css';

const SubmissionDiscussion = () => {

    return(
        <div className = {styles.filesContainer}>
            
            <div className = {styles.header}>
                <h3>Submission Discussion</h3>

                 <div className = {styles.left}>
                    <button>Add a discussion</button>
                </div>
            </div>

        </div>
    )
    ;
};

export default SubmissionDiscussion;