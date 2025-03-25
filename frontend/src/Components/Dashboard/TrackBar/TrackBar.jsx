import styles from "./TrackBar.module.css";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";

import { dashBoardAuthorContext } from "../MainContentAuthor";
import { useContext } from "react";

const steps = [
    {
        label: "Submitted",
        step: 1,
    },
    {
        label: "Under Review",
        step: 2,
    },
    {
        label: "Reviewed",
        step: 3,
    },
    {
        label: "Accepted",
        step: 4,
    }
]


//the design is copied and learned from https://www.codevertiser.com/creating-reusable-progress-steps-component-in-reactjs/
const TrackBar = ({currentStep, title}) => {

    const activeStep = currentStep;
    
    // If we increase or decrease steps, our progress line will not overflow or shorten than steps container because of this formula
    const totalSteps = steps.length;
    const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

    const { nextSub, prevSub, submissionList, currSub } = useContext(dashBoardAuthorContext);


    return (
        <div className = {styles.trackingContainer}>
            <h3>Your Progress</h3>
            <h4>{`For: ${title}`}</h4>
                
            <ol className = {styles.stepContainer}
                style = {{"--prog-width": width}}>
                {steps.map((step, idx) => (
                    <li key = {idx} className = {styles.stepWrapper}>
                        <div className = {`${styles.styleStep} ${activeStep >= step.step ? styles.completed : ''}`}>
                            { activeStep >= step.step ? <IoMdCheckmarkCircleOutline /> : <p>{step.step}</p>}
                        </div>
                        <div className = {styles.stepLabel}>
                            <p>{step.label}</p>
                        </div>
                    </li>
                ))}
            </ol>
            
            {submissionList.length >= 1 &&
                <div className={styles.buttons}>
                    <FaRegArrowAltCircleLeft className={styles.sliddingButton} onClick={() => prevSub()} />
                        <span className = {styles.indicators}>
                            {
                                submissionList.map((_, idx) => (
                                    <button key = {idx} onClick={null} className={`${styles.indicator} ${currSub === idx? styles.active:""}`}></button>
                                ))
                            }
                        </span>
                    <FaRegArrowAltCircleRight className={styles.sliddingButton} onClick={() => nextSub()} />
                </div>
            }

        </div>
    );
}

export default TrackBar;