import styles from './SubmissionRecord.module.css';

import { sumissionContext } from './SubmissionRecord'
import { useContext, useState, useEffect, useCallback } from 'react';

const SubmissionSatus = () => {

    const { currSubmission } = useContext(sumissionContext);

    const [currentStep, setCurrentStep] = useState(0);

    const updateCurrStep = useCallback(() => {
        if (currSubmission) {
            setCurrentStep(currSubmission.currentStep || 0);
        }
    }, [currSubmission]);

    useEffect(() => {
        updateCurrStep();
    }, [updateCurrStep]);

    if (!currSubmission) {
        return <div className={styles.noStaus}>No submission selected</div>;
    }

    return(

        <div className={styles.statusContainer}>
                {currentStep === 1 && <>

                    <div className = {styles.header}>
                        <h3>Submission accepted for review</h3>
                    </div>

                    <div className = {styles.statusAction}>
                        <button>Send to a reviewer</button>
                        <button>Decline submission</button>           
                    </div>
              </>}
                    
                {currentStep === 2 && <>

                    <div className = {styles.header}>
                        <h3>Submission sent to reviewers</h3>
                    </div>

                    <div className = {styles.statusAction}>
                        <button>Decline submission</button>           
                    </div>
              </>}

                {currentStep === 3 && <>

                    <div className = {styles.header}>
                        <h3>Submission sent back to Editor </h3>
                    </div>

                    <div className = {styles.statusAction}>
                        <button>Approve Submission</button>
                        <button>Decline submission</button>           
                    </div>
              </>}

                {currentStep === 4 && <>

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

export default SubmissionSatus;