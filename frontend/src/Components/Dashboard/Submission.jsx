import styles from './MainContentEditor.module.css';
import { FaRegCircle } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import { GiFrozenRing } from "react-icons/gi";

const getStepStatus = (currentStep) => {
    switch(currentStep) {
        case 1:
            return { 
                stepTitle: "Submitted", 
                statusClass: `${styles.submissionStatus} ${styles.submitted}`
            };
        case 2:
            return { 
                stepTitle: "Under Review", 
                statusClass: `${styles.submissionStatus} ${styles.underReview}`
            };
        case 3:
            return { 
                stepTitle: "Reviewed", 
                statusClass: `${styles.submissionStatus} ${styles.reviewed}`
            };
        case 4:
            return { 
                stepTitle: "Accepted", 
                statusClass: `${styles.submissionStatus} ${styles.accepted}`
            };
        default:
            return { 
                stepTitle: "Ahihi", 
                statusClass: `${styles.submissionStatus}`
            };
    }
}

const Submission = ({submission}) => {

    const { stepTitle, statusClass } = getStepStatus(submission.currentStep);

    return (
        <div className = {styles.submission}>

            <GiFrozenRing />
            <div className = {styles.submissionDes}>
                <h4>{submission.author}</h4>
                <p>{submission.title}</p>
            </div>
                    
            <div className = {statusClass}> 
                <FaRegCircle />
                  
                <span>{stepTitle}</span>
            </div>
                <CiMenuKebab />
      
        </div>
    );
};

export default Submission;