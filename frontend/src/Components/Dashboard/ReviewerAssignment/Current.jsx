import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./ReviewerAssignment.module.css"
import SubDetail from "./SubmissionDetails";
import { useUser } from "../../Login/UserContext";
import { useLocation } from "react-router-dom";

// const listOfSubmission = [
//     {
//         title: "1 fsdfh sdjgfdfh dfhgs asdgasf sdfhg",
//         dateAssigned: new Date("2025-10-23"),
//         editorFName: "John",
//         editorLName: "Smith",
//         dueDate: new Date("2025-10-27"),
//     },
//     {
//         title: "2 fsdfh sdjgfdfh dfhgs asdgasf sdfhg",
//         dateAssigned: new Date("2025-10-24"),
//         editorFName: "Jack",
//         editorLName: "Smith",
//         dueDate: new Date("2025-10-27"),
//     },
//     {
//         title: "3 fsdfh sdjgfdfh dfhgs asdgasf sdfhg",
//         dateAssigned: new Date("2025-10-23"),
//         editorFName: "Jay",
//         editorLName: "Smith",
//         dueDate: new Date("2025-10-25"),
//     },
//     {
//         title: "4 fsdfh sdjgfdfh dfhgs asdgasf sdfhg",
//         dateAssigned: new Date("2025-10-26"),
//         editorFName: "Jacky",
//         editorLName: "Smith",
//         dueDate: new Date("2025-10-27"),
//     },
//     {
//         title: "5 fsdfh sdjgfdfh dfhgs asdgasf sdfhg",
//         dateAssigned: new Date("2025-10-21"),
//         editorFName: "Jishy",
//         editorLName: "Smith",
//         dueDate: new Date("2025-10-27"),
//     },
//     {
//         title: "6 fsdfh sdjgfdfh dfhgs asdgasf sdfhg",
//         dateAssigned: new Date("2025-10-26"),
//         editorFName: "Jojo",
//         editorLName: "Smith",
//         dueDate: new Date("2025-10-24"),
//     },
//     {
//         title: "6 fsdfh sdjgfdfh dfhgs asdgasf sdfhg",
//         dateAssigned: new Date("2025-10-26"),
//         editorFName: "Jojo",
//         editorLName: "Smith",
//         dueDate: new Date("2025-10-24"),
//     },
//     {
//         title: "6 fsdfh sdjgfdfh dfhgs asdgasf sdfhg",
//         dateAssigned: new Date("2025-10-26"),
//         editorFName: "Jojo",
//         editorLName: "Smith",
//         dueDate: new Date("2025-10-24"),
//     },

// ]


const Current = () => {
    // function getDate(date) {
    //     const month = date.getMonth() + 1;
    //     const day = date.getDate();
    //     return `${month}/${day}`;
    // }

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [currSubmission, setCurrSubmission] = useState(null);
    const [submissionList, setSubmissionList] = useState([]);
    const {user} = useUser();
    const originalSubmissionID = queryParams.get('submission');
    
    const fetchSubmissions = async () => {
        try {
            const response = await fetch(`https://cirt-project-server.vercel.app/submission/reviewerSubs/${user._id}/${originalSubmissionID}`,{
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
                <li>Closer Look</li>
            </ul>

            <ul className = {styles.submissionContainer}>
                {submissionList.map((sub, idx) => (
                    <li className = {styles.submission} key = {idx} onClick={() => handleSubmissionClick(sub)}>
                        <h4>{sub.title}</h4>
                        <p>{sub.firstName +" "+ sub.lastName}</p>
                        <a href={`/gallery/submission/${sub._id}`} >View Article</a>
                    </li>
                ))}
            </ul>
            { currSubmission != null && <SubDetail submission = {currSubmission} setIsOpen={handleCloseDetail}/> }
        </div>
    )
}

export default Current;