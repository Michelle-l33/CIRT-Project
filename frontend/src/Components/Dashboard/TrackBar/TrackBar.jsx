import styles from "./TrackBar.module.css";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";

import { dashBoardAuthorContext } from "../MainContentAuthor";
import { useContext, useRef, useState } from "react";

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
    
    // If we increase or decrease steps, our progress line will not overflow or shorten than steps container because of this formula
    const totalSteps = steps.length;
    const width = `${(100 / (totalSteps - 1)) * (currentStep - 1)}%`;

    const { nextSub, prevSub, submissionList, currSub } = useContext(dashBoardAuthorContext);
    const [ documents, setDocuments ] = useState({});

    const fileInputRef = useRef(null);

    const handleReuploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];

        setDocuments((prev_docs) => ({ ...prev_docs, [currSub]: uploadedFile }));

    };

    const handleSubmitClick = async() => {
        //change submission logic
        if (!documents[currSub]) {
            window.alert("Please upload a file first.");
            return;
        }
    
        const formData = new FormData();
        formData.append("document", documents[currSub]); // Attach the uploaded file
    
        try {
            const response = await fetch(`http://localhost:8082/submission/${submissionList[currSub]._id}/resubmit`, {
                method: "PUT",
                body: formData,
                credentials: "include",
            });
    
            const data = await response.json();
    
            if (response.ok) {
                window.alert("File resubmitted successfully!");
                window.location.reload(); // Reload to reflect changes
            } else {
                window.alert(data.error || "Something went wrong!");
                console.log(data.error);
            }
        } catch (error) {
            console.error("Error during file resubmission:", error);
            window.alert("Error: " + error.message);
        }
    }

    return (
        <div className = {styles.trackingContainer}>
            <h3>Your Progress</h3>
            {currentStep === "3" && (
                <div className = {styles.reUpload}>

                    {documents[currSub] != null ? (
                    <button onClick={handleSubmitClick} className = {styles.submitBtn}>Submit</button>
                    ) : (
                    <button onClick={handleReuploadClick}>Reupload</button>
                    )}

                    <input
                        type="file"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                    />
                    {documents[currSub] && <p>Uploaded file: <span>{documents[currSub]?.name}</span></p>}
                </div>
            )}
            <h4>{`For: ${title}`}</h4>
            <ol className = {styles.stepContainer}
                style = {{"--prog-width": width}}>
                {steps.map((step, idx) => (
                    <li key = {idx} className = {styles.stepWrapper}>
                        <div className = {`${styles.styleStep} ${currentStep >= step.step ? styles.completed : ''}`}>
                            { currentStep >= step.step ? <IoMdCheckmarkCircleOutline /> : <p>{step.step}</p>}
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