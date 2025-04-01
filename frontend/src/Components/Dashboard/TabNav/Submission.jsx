import styles from './TabNav.module.css';
import { FaRegCircle } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import { GiFrozenRing } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from 'react';

const getStepStatus = (currentStep) => {
    switch(currentStep) {
        case "1":
            return { 
                stepTitle: "Submitted", 
                statusClass: `${styles.submissionStatus} ${styles.submitted}`
            };
        case "2":
            return { 
                stepTitle: "Under Review", 
                statusClass: `${styles.submissionStatus} ${styles.underReview}`
            };
        case "3":
            return { 
                stepTitle: "Author Revising", 
                statusClass: `${styles.submissionStatus} ${styles.reviewed}`
            };
        case "4":
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

const Submission = ({submission, optionList}) => {
    const { stepTitle, statusClass } = getStepStatus(submission.stage);
    const [isOptionClicked, setOptionClicked] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = useCallback((event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOptionClicked(false);
        }
    }, [dropdownRef, setOptionClicked]);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <div className={styles.submission}>
            <GiFrozenRing />

            <div className={styles.submissionDes}>
                <h4>{submission.firstName} {submission.lastName}</h4>
                <Link to={`/Gallery/submission/${submission._id}`} target="_blank">
                    <p>{submission.title}</p>
                </Link>
            </div>
                    
            <div className={statusClass}> 
                <FaRegCircle />
                <span>{stepTitle}</span>
            </div>
            
            <CiMenuKebab 
                ref={dropdownRef} 
                onClick={() => setOptionClicked(!isOptionClicked)}
            />
            
            <div className={`${styles.submissionOption} ${isOptionClicked ? styles.show : ''}`}>
                {optionList.map((option) => (
                    option.element ? (
                        <div key={option.name}>{option.element(submission)}</div>
                    ) : (
                        <button onClick={() => option.function(submission)} key={option.name}>
                            {option.name}
                        </button>
                    )
                ))}
            </div>
        </div>
    );
};

export default Submission;