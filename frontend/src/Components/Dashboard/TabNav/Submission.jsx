import styles from './TabNav.module.css';
import { FaRegCircle } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import { GiFrozenRing } from "react-icons/gi";

import { useState, useEffect, useRef } from 'react';

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

//detecting click anywhere https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
function useOutsideAlerter(ref, setOptionClicked) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            setOptionClicked(false);
        }
      }
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [ref]);
  }

const Submission = ({submission}) => {
    
    const { stepTitle, statusClass } = getStepStatus(submission.currentStep);

    const [isOptionClicked, setOptionClicked] = useState(false);

    const handleOptionClick = () => {
        setOptionClicked(!isOptionClicked);
    }

    const dropdownRef = useRef(null);

    useOutsideAlerter(dropdownRef, setOptionClicked);

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
            
            <CiMenuKebab ref = {dropdownRef} onClick = {handleOptionClick}/>
            <div  className = {`${styles.submissionOption} ${isOptionClicked ? styles.show : ''}`}>
                <span>Option 1</span>
                <span>Assign a reviewer</span>
            </div>
        </div>
    );
};

export default Submission;