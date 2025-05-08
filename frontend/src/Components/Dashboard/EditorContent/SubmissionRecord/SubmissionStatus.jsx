import styles from './SubmissionRecord.module.css';

import { useState, useEffect, useCallback } from 'react';

import { useSubmissionsDispatch } from './SubmissionContext'


const SubmissionStatus = ( {currSubmission} ) => {

    const [ currentStep, setCurrentStep ] = useState("0");
    const [ loading, setLoading] = useState(false);

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
        setLoading(true);

        try {
            await updateSubmissionStage(currSubmission, newStage);
            setCurrentStep(newStage);
        } catch (error) {
            console.error("Error updating stage:", error);
        } finally {
            setLoading(false); // Set loading to false after the operation
        }
    };


    return(

        <div className={styles.statusContainer}>
                {currentStep === "1" && <>

                    <div className = {styles.header}>
                        <h3>Ready For Review</h3>
                    </div>

                    <div className = {styles.statusAction}>
                        {/* <button onClick = {() => handleUpdateStage("2")}>Send to a reviewer</button> */}
                        <button onClick={() => {
                            if (window.confirm("Are you sure you want to update the submission?")) {
                            handleUpdateStage("2");
                        }}}>Send to a reviewer</button>  
                        <button onClick={() => {
                            if (window.confirm("Are you sure you want to decline the submission?")) {
                            handleUpdateStage("0");
                        }}}>Decline submission</button>              
                    </div>
              </>}
                    
                {currentStep === "2" && <>

                    <div className = {styles.header}>
                        <h3>Sent To Reviewers</h3>
                    </div>

                    <div className = {styles.statusAction}>
                        {/* <button onClick = {() => handleUpdateStage("3")}>Send to Author</button> */}
                        <button onClick={() => {
                            if (window.confirm("Are you sure you want to update the submission?")) {
                            handleUpdateStage("3");
                        }}}>Send to Author</button>  
                        <button onClick={() => {
                            if (window.confirm("Are you sure you want to decline the submission?")) {
                            handleUpdateStage("0");
                        }}}>Decline submission</button>             
                    </div>
              </>}

                {currentStep === "3" && <>

                    <div className = {styles.header}>
                        <h3>Author Revision</h3>
                        <span className={styles.authorResubmit}>{loading ? "Loading..." : currSubmission.resubmitted ? "Resubmitted!": "Waiting"}</span>
                    </div>

                    <div className = {styles.statusAction}>
                        {/* <button onClick = {() => handleUpdateStage("4")}>Approve Submission</button>              */}
                        <button onClick={() => {
                            if (window.confirm("Are you sure you want to update the submission?")) {
                            handleUpdateStage("4");
                        }}}>Recieved Revised Submission</button>  
                        <button onClick={() => {
                            if (window.confirm("Are you sure you want to decline the submission?")) {
                            handleUpdateStage("0");
                        }}}>Decline submission</button>                 
                    </div>
              </>}

                {currentStep === "4" && <>

                    <div className = {styles.header}>
                        <h3>Approved</h3>
                    </div>

                    <div className = {styles.statusAction}>
                        {/* <button onClick={() => window.location.reload()}>Publish the Submission</button> */}
                        <button onClick={() => {
                            if (window.confirm("Are you sure you want to update the submission?")) {
                                handleUpdateStage("5");
                                window.location.reload();
                        }}}>Publish Submission</button>  
                        <button onClick={() => {
                            if (window.confirm("Are you sure you want to decline the submission?")) {
                            handleUpdateStage("0");
                        }}}>Decline submission</button>              
                    </div>
              </>}
            
        </div>
    );
}

export default SubmissionStatus;