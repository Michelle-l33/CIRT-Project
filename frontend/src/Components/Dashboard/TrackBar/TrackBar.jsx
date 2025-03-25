import styles from "./TrackBar.module.css";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";


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

    return (
        <div className = {styles.trackingContainer}>
            <h3>Your Progress</h3>
            <h4>For: title sd asnd sd aksdnwn</h4>
            <div className = {styles.carouselContainer}>
                <FaRegArrowAltCircleLeft className={styles.sliddingButton}/>
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
                <FaRegArrowAltCircleRight className={styles.sliddingButton}/>
            </div>
        </div>
    );
}

export default TrackBar;