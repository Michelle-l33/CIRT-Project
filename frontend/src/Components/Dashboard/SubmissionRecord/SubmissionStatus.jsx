import styles from './SubmissionRecord.module.css';

import { useState, useEffect, useCallback } from 'react';

import { useSubmissionsDispatch } from './SubmissionContext'


const SubmissionStatus = ( {currSubmission} ) => {

    const [ currentStep, setCurrentStep ] = useState("0");

    const { updateSubmissionStage } = useSubmissionsDispatch();


    const updateCurrStep = useCallback(() => {
        if (currSubmission) {
            setCurrentStep(currSubmission.stage);
        }
    }, [currSubmission]);

    useEffect(() => {
        updateCurrStep();
    }, [updateCurrStep]);

    if (!currSubmission) {
        return <div className={styles.noStatus}>No submission selected</div>;
    }

    const handleUpdateStage = async (newStage) => {
        if (!currSubmission) return;

        await updateSubmissionStage(currSubmission, newStage);
        setCurrentStep(newStage); // Update UI after successful API call
        
        setCurrentStep(newStage);
    };


    return(

        <div className={styles.statusContainer}>
                {currentStep === "1" && <>

                    <div className = {styles.header}>
                        <h3>Submission accepted for review</h3>
                    </div>

                    <div className = {styles.statusAction}>
                        <button onClick = {() => handleUpdateStage("2")}>Send to a reviewer</button>
                        <button>Decline submission</button>           
                    </div>
              </>}
                    
                {currentStep === "2" && <>

                    <div className = {styles.header}>
                        <h3>Submission sent to reviewers</h3>
                    </div>

                    <div className = {styles.statusAction}>
                    <button onClick = {() => handleUpdateStage("3")}>Send to Author</button>
                        <button>Decline submission</button>           
                    </div>
              </>}

                {currentStep === "3" && <>

                    <div className = {styles.header}>
                        <h3>Submission Comments Sent To Author  </h3>
                    </div>

                    <div className = {styles.statusAction}>
                        <button onClick = {() => handleUpdateStage("4")}>Approve Submission</button>
                        <button>Decline submission</button>           
                    </div>
              </>}

                {currentStep === "4" && <>

                    <div className = {styles.header}>
                        <h3>Submission Approved</h3>
                    </div>

                    <div className = {styles.statusAction}>
                        <button>Publish the Submission</button>
                        <button>Decline submission</button>           
                    </div>
              </>}
            
        </div>
    );
}

export default SubmissionStatus;