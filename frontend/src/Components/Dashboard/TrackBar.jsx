import styles from "./TrackBar.module.css";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";

// const statuses = ["Submitted", "Under Review", "Reviewed", "Accepted"];
// const TrackBar = ({currentStatus}) => {
//     const currentIndex = statuses.indexOf(currentStatus);
//     return (
//         <div className={styles.trackingContainer}>
//           {statuses.map((status, index) => (
//             <div key={status} className={styles.trackingStep}>
//               {index !== 0 && <div className={`${styles.line} ${index <= currentIndex ? styles.lineActive : ""}`}></div>}
//               <div className={`circle ${index <= currentIndex ? styles.completed : ""}`}>
//                 <p className={index <= currentIndex ? styles.textActive : ""}>{status}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     };

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
const TrackBar = ({currentStep}) => {

    const activeStep = currentStep;
    
    // If we increase or decrease steps, our progress line will not overflow or shorten than steps container because of this formula
    const totalSteps = steps.length;
    const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

    return (
        <div className = {styles.trackingContainer}>
            <h3>Your Progress</h3>
            <ul className = {styles.stepContainer}
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
            </ul>
        </div>
    );
}

export default TrackBar;