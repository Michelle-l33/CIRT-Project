import styles from "./ReviewerAssignment.module.css"

const SubDetail = ({submission, setIsOpen}) => {
    return(
        <div className = {styles.commentContainer}>                
            <div className = {styles.header}>
                <h3>Submission Comments</h3>
            </div>

            <ul className = {styles.contentList}>
                    <li className = {styles.listItem}>
                        <p>{submission.title}</p>
                        <span>From: Editor</span>
                    </li>

                    <li className = {styles.listItem}>
                        <p>{submission.title}</p>
                        <span>From: Editor</span>
                    </li>
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