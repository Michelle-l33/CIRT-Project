import styles from "../MainContentAuthor.module.css"

import { IoDocumentOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { FaRegSmileWink } from "react-icons/fa";
import { ImFilePicture } from "react-icons/im";

import TrackBar from "../TrackBar/TrackBar";

import { useState, useEffect, createContext } from 'react';
import { useUser } from '../../../Login/UserContext';


//geting Dates: https://www.shecodes.io/athena/7466-how-to-get-current-date-in-react
function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return `${month}/${date}`;
}


export const dashBoardAuthorContext = createContext(null);

const Home = () => {
    const [ currentDate ] = useState(getDate());
    const [submissionList, setSubmissionList] = useState([]);
    const [posterList, setPosterList] = useState([]);
    const {user} = useUser();
    useEffect(()=>{
        const fetchSubmissions = async () =>{
            try{
                const response = await fetch(`https://cirt-project-server.vercel.app/submission/authorArt/${user._id}`, {
                    method: "GET"
                })
                if (!response.ok){
                    throw new Error("Failed to fetch submissions");
                  }
                  const data = await response.json();
                  setSubmissionList(data);
                }  catch (error) {
                  console.error("Error fetching submissions:", error);
                }
        };
        fetchSubmissions();
    },[user._id]);

    const [currSub, setCurrSub] = useState(0);

    const nextSub = () => {
        if (submissionList.length > 0) {
          setCurrSub((prev) => (prev + 1) % submissionList.length);
        }
      };
      
    const prevSub = () => {
        if (submissionList.length > 0) {
          setCurrSub((prev) => (prev === 0 ? submissionList.length - 1 : prev - 1));
        }
      };

    useEffect(()=>{
        const fetchPosters = async () =>{
            try{
                const response = await fetch(`https://cirt-project-server.vercel.app/submission/authorPos/${user._id}`, {
                    method: "GET"
                })
                if (!response.ok){
                    throw new Error("Failed to fetch posters");
                  }
                  const data = await response.json();
                  setPosterList(data);
                }  catch (error) {
                  console.error("Error fetching posters:", error);
                }
        };
        fetchPosters();
    },[user._id]);
    return (
        <>
            <ul className={styles.insights}>
                    <li key='posters'>
                        <ImFilePicture />
                        <span className={styles.info}>
                            <h3>{posterList.length}</h3>
                            <span>Num of Posters</span>
                        </span>
                    </li>
                    <li key='articles'>
                        <IoDocumentOutline />
                        <span className={styles.info}>
                            <h3>{submissionList.length}</h3>
                            <span>Num of Articles</span>
                        </span>
                    </li>
                    <li key='date'>
                        <MdOutlineDateRange />
                        <span className={styles.info}>
                            <h3>{currentDate}</h3>
                            <span>Today Date</span>
                        </span>
                    </li>
                    <li key='happy'>
                        <FaRegSmileWink />
                        <span className={styles.info}>
                            <h3>Smile xD</h3>
                            <span>Be Happy!</span>
                        </span>
                    </li>
                </ul>

                <dashBoardAuthorContext.Provider value = {{currSub, nextSub, prevSub, submissionList}}>
                    <div className={styles.bottomData}>
                        <div className={styles.trachBarContainer}>
                        {submissionList.length > 0 ? (
                            <TrackBar currentStep={submissionList[currSub].stage} title={submissionList[currSub].title}/>
            
                        ) : (
                            <p>No submissions found.</p>
                        )}
                        </div>
                        
                        {/* The code for this is defined down below */}
                        <CommentList submissionId={submissionList[currSub]?._id} />
                    </div>
                </dashBoardAuthorContext.Provider>
        </>
    )
}

export default Home;




const Comment = ({content, sender}) => {
    return(
        <>
            <p>{content}</p>
            <span>{`From: ${sender}`}</span>
        </>
    );
};

const CommentList = ({ submissionId }) => {
    const [commentList, setCommentList] = useState([]);
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        const fetchComments = async () => {

            try {
                setLoading(true);
                const response = await fetch(`https://cirt-project-server.vercel.app/comment/${submissionId}`,{
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
    },[submissionId]);

    return (
        <div className={styles.comment}>
            <div className={styles.header}>
                <GrNotes />
                <h3>Comments</h3>
            </div>

            <ul className={styles.commentList}>
            {loading ? (
                        <p>Loading comments...</p>
                    ) : commentList.length > 0 ? (
                        commentList.map((comment, idx) => (
                            <li key={idx} className={styles.listItem}>
                                <Comment content={comment.comment} sender={comment.role} />
                            </li>
                        ))
                    ) : (
                        <p className={styles.noComment}>
                            No Comment: Abracadabra, abracadabra
                        </p>
                    )}
            </ul>
        </div>
    );
};