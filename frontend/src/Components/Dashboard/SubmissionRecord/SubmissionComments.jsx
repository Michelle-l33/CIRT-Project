import styles from './SubmissionRecord.module.css';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';


/* const commentList = [
    {
        comment: "James Stephen \"Jimmy\" Donaldson[a] (born May 7, 1998), better known by his online alias MrBeast, is an American YouTuber, media personality, and businessman. He is known for his fast-paced and high-production YouTube videos, where he often hosts elaborate challenges and donates large amounts of money.",
        sender: "Mr.Beast"
    },

    {
        comment: "Taylor Alison Swift (born December 13, 1989) is an American singer-songwriter. Known for her autobiographical songwriting, artistic reinventions, and cultural impact, Swift is a leading figure in popular music and the subject of extensive media coverage, with a vast fanbase known as Swifties.",
        sender: "Taylor Swift"
    }
] */


const SubmissionDiscussion = () => {
    const [comment, setComment] = useState("");
    const {originalSubmissionID} = useParams(); // pulls ID from URL
    const [loading, setLoading]=useState(true);
    const [commentList, setCommentList] = useState([]);

    useEffect(()=>{
        const fetchComments = async () => {
            try {
                console.log("ID", originalSubmissionID);
                const response = await fetch(`http://localhost:8082/comment/retrieve/${originalSubmissionID}`,{
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

        try{
            const commentData = { originalSubmissionID, comment };
            const response = await fetch(`http://localhost:8082/comment/record`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentData),
            });

            const data = await response.json();
            
            if (response.ok) {
                window.alert("Comment Saved!")
                setComment("");
                setCommentList((prevList) => [
                    ...prevList,
                    { comment, sender: "Your Name" } // You can modify sender as needed
                ]);
                
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

                 <div className = {styles.left}>
                    <ButtonWithCommentForm 
                        comment={comment} 
                        setComment={setComment} 
                        handleCommentSubmit={handleCommentSubmit} />
                </div>
            </div>

            <ul className = {styles.contentList}>

                {commentList.map((comment, idx) => 
                    <li key = {idx} className = {styles.listItem}>
                        {/* the code for Comment component is down below */}
                        <Comment content = {comment.comment} sender = {comment.sender}/>
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
            <button class = {styles.closeBtn} onClick = {() => setIsOpen(false)}>X</button>
        </div>
    </>)
}