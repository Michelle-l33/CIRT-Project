import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./ReviewerAssignment.module.css"
import SubDetail from "./SubmissionDetails";
import { useUser } from "../../Login/UserContext";


const Current = () => {

    // const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [currSubmission, setCurrSubmission] = useState(null);
    const [submissionList, setSubmissionList] = useState([]);
    const {user} = useUser();

    
    const fetchSubmissions = async () => {
        try {
            const response = await fetch(`https://cirt-project-server.vercel.app/submission/reviewerSubs/${user._id}`,{
                method: "GET"
            })
            if (!response.ok) {
                throw new Error("Failed to fetch submissions");
            }
            
            const data = await response.json();
            setSubmissionList(data);       
        } catch (error) {
            console.error("Error fetching submissions:", error);
        }
    };

    useEffect(()=>{
        fetchSubmissions();
    },[]);

    const handleSubmissionClick = (sub) => {
        setCurrSubmission(sub);
        // Update URL with submission ID
        navigate(`?submission=${sub._id}`, { replace: true });
    };

    const handleCloseDetail = () => {
        setCurrSubmission(null);
        // Remove submission ID from URL
        navigate('', { replace: true });
    };

    return (
        <div className={styles.currentAssignemt}>
            <ul className={styles.listHeader}>
                <li>Title</li>
                <li>Editor</li>
            </ul>

            <ul className = {styles.submissionContainer}>
                {submissionList.map((sub, idx) => (
                    <li className = {styles.submission} key = {idx} onClick={() => handleSubmissionClick(sub)}>
                        <h4>{sub.title}</h4>
                        <p>{sub.firstName +" "+ sub.lastName}</p>
                    </li>
                ))}
            </ul>
            { currSubmission != null && <SubDetail submission = {currSubmission} setIsOpen={handleCloseDetail}/> }
        </div>
    )
}

export default Current;