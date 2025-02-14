
import styles from './SubmissionReview.module.css';
import { useState } from 'react';

const SubmissionReviewPage = () => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const handleAddComment = () => {
        if (comment.trim()) {
            setComments([...comments, comment]);
            setComment('');
        }
    };

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className={styles.bigContainer}>
            <div className={styles.pdfContainerLeft}>
                <div className={styles.fileUploadContainer}>
                    <h3>Submission Area</h3>
                    <ul>
                        <li><input type="text" placeholder="Submission Title"/></li>
                        <li><input type="text" placeholder="Author's name/alias"/></li>
                        <li>
                            <input type="radio" id="posterRadio"/>
                            <label htmlFor="posterRadio">Poster</label>
                        
                            <input type="radio" id="articleRadio"/>
                            <label htmlFor="articleRadio">Article</label>
                        </li>
                        <li><input type="file" onChange={handleFileChange} /></li>
                    </ul>
                    {file && <p>Uploaded file: <span>{file.name}</span></p>}
                </div>
            </div>

            <div className={styles.commentsContainer}>
                <div>
                    <h5>Comments</h5>
                    <textarea 
                        name="comments" 
                        id="comments" 
                        cols="30" 
                        rows="4" 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button onClick={handleAddComment}>Add Comment</button>
                </div>
                <div>
                    {comments.map((cmt, index) => (
                        <p key={index}>{cmt}</p>
                    ))}
                </div>
            </div>

            <div className={styles.rightContainer}>
                <div className={styles.submissionBox}>
                    <ul>
                        <h5>Submission Decision</h5>
                        <li><button>Send to Review</button></li>
                        <li><button>Decline Submission</button></li>
                    </ul>
                </div>
                
                <div className={styles.contributorsContainer}>
                    <ul>
                        <h5>Contributors</h5>
                        <li>Bob</li>
                        <li>Joe</li>
                        <li>Hanson</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SubmissionReviewPage