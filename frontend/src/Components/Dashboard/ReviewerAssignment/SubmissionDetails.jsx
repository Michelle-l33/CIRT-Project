import styles from "./ReviewerAssignment.module.css"
import { useUser } from "../../Login/UserContext";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SubDetail = ({submission, setIsOpen}) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const {user} = useUser();
    const [commentList, setCommentList] = useState([]);
    const [loading,setLoading] = useState(true);
    const [comment, setComment] = useState("");
    const commentorID = user._id;
    const role = user.isEditor ? "Editor" : "Reviewer";
    const originalSubmissionID = queryParams.get('submission');
    const [ searchParams, setSearchParams ] = useSearchParams();
   
    
    const fetchComments = async () => {
        try {
            console.log("Fetching for: ", user._id);
            const response = await fetch(`https://cirt-project-server.vercel.app/comment/reviewer/${user._id}/${originalSubmissionID}`,{
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

    const Comment = ({content, sender}) => {
        return(
            <>
                <p>{content}</p>
                <span>{`From: ${sender}`}</span>
            </>
        );
    };


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

    const handleSubmissionChange = (submission) => {
        // navigate(`?submissionId=${submission._id}`);
        //setCurrSubmission(submission);
        setSearchParams({ submissionId: submission._id });
    }

    return(
        <div className = {styles.commentContainer}>                
            <div className = {styles.header}>
                <h3>Submission Comments</h3>
            </div>

            <ul className = {styles.contentList}>
                {commentList.map((comment, idx) => 
                    <li key = {idx} className = {styles.listItem}>
                        {/* the code for Comment component is down below */}
                        <Comment content = {comment.comment} sender = {comment.role}/>
                    </li>
                )}
            </ul>
            
            <div className = {styles.commentForm}>
                <h4>Add Comments</h4>
                <form onSubmit={handleCommentSubmit} >
                    <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment..."/>
                    <button>
                        Submit
                    </button>
                </form>
                <button  onClick = {() => setIsOpen(null)}>X</button>
             </div>
        </div>
    )
}

export default SubDetail;