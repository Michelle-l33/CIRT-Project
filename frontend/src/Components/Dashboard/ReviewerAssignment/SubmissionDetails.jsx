import styles from "./ReviewerAssignment.module.css"
import { useUser } from "../../Login/UserContext";
import { useEffect, useState } from "react";

const SubDetail = ({submission, setIsOpen}) => {
    const {user} = useUser();
    const [commentList, setCommentList] = useState([]);
    const [loading,setLoading] = useState(true);
    
    const fetchComments = async () => {
        try {
            console.log("Fetching for: ", user._id);
            const response = await fetch(`http://localhost:8082/comment/${user._id}`,{
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
    },[submission]);

    const Comment = ({content, sender}) => {
        return(
            <>
                <p>{content}</p>
                <span>{`From: ${sender}`}</span>
            </>
        );
    };

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
                <form>
                    <textarea placeholder="Write your comment..."/>
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