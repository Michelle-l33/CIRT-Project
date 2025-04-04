import styles from './SubmissionRecord.module.css';
import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { IoIosClose } from "react-icons/io";
import {useUser} from "../../Login/UserContext";


const SubmissionDiscussion = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const originalSubmissionID = queryParams.get('submissionId'); // Pulls the submissionId query parameter
    // console.log("ID CHECK", originalSubmissionID);
    const [comment, setComment] = useState("");
    //const {originalSubmissionID} = useParams(); // pulls ID from URL
    const [loading, setLoading]=useState(true);
    const [commentList, setCommentList] = useState([]);
    const {user} = useUser();
    const commentorID = user._id;
    const role = user.isEditor ? "Editor" : "Reviewer";

 // fetches comments
    const fetchComments = async () => {
        try {
            console.log("Fetching for: ", originalSubmissionID);
            const response = await fetch(`https://cirt-project-server.vercel.app/comment/${originalSubmissionID}`,{
                method: "GET"
            })
            if (!response.ok) {
                throw new Error("Failed to fetch comments");
            }
    
            const comments = await response.json();
            setCommentList(comments);
            console.log("Comments",commentList);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(()=>{
        fetchComments();
    },[originalSubmissionID]);

    if (loading) {
        return <div>Loading...</div>;
    }


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            return window.alert("Please enter a comment.");
        }
        if (!originalSubmissionID) {
            console.error("Submission ID is missing!");
            return;
        }
        console.log("Submitting comment:", { originalSubmissionID, comment, commentorID, role });
        try{
            const commentData = {originalSubmissionID, comment, commentorID, role };
            
            const response = await fetch("https://cirt-project-server.vercel.app/comment/",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentData),
                mode: 'cors',
            });

            const data = await response.json();
            
            if (response.ok) {
                window.alert("Comment Saved!")
                setComment("");
                fetchComments();
            
            } else {
                window.alert(data.error || "Something went wrong!");
                console.log(data.error);
            }
        } catch (error) {
            window.alert("Error: " + error.message);
        }

    };


    return(
        <div className = {styles.commentContainer}>
            
            
            <div className = {styles.header}>
                <h3>Submission Comments</h3>

                <ButtonWithCommentForm
                        // the code for ButtonWithCommentForm component is down below
                        comment={comment} 
                        setComment={setComment} 
                        handleCommentSubmit={handleCommentSubmit} />
            </div>

            <ul className = {styles.contentList}>

                {commentList.map((comment, idx) => 
                    <li key = {idx} className = {styles.listItem}>
                        {/* the code for Comment component is down below */}
                        <Comment content = {comment.comment} sender = {comment.role}/>
                    </li>
                )}

            </ul>
        </div>
    )
    ;
};

export default SubmissionDiscussion;

const Comment = ({content, sender}) => {
    return(
        <>
            <p>{content}</p>
            <span>{`From: ${sender}`}</span>
        </>
    );
};

const ButtonWithCommentForm = ({ comment, setComment, handleCommentSubmit }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
    <>
        <button onClick = {() => setIsOpen(true)}>
            <span>Add a comment</span>
        </button>

        <div className = {`${styles.commentForm} ${isOpen ? styles.show : ""}`}>
            <h4>Add Comments</h4>
            <form onSubmit={handleCommentSubmit} >
                <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)} // Update the comment state
                placeholder="Write your comment..."/>
                <button>
                    Submit
                </button>
            </form>
            <button className = {styles.closeBtn} onClick = {() => setIsOpen(false)}>
                &times;
            </button>
        </div>
    </>)
}