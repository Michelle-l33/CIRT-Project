import styles from "./ReviewerAssignment.module.css"

const Current = () => {
    return (
        <div className={styles.currentAssignemt}>
            <ul className={styles.listHeader}>
                <li>Title</li>
                <li>Date Assigned</li>
                <li>Editor</li>
                <li>Due Date?</li>
            </ul>

            <ul className = {styles.submissionContainer}>
                <li className = {styles.submission}>
                    <h4>fsdfh sdjgfdfh dfhgs asdgasf sdfhg</h4>
                    <span>10/23</span>
                    <p>Editor's name</p>
                    <time>10/27</time>
                </li>
                <li className = {styles.submission}>
                    <h4>fsdfh sdjgfdfh dfhgs asdgasf sdfhg</h4>
                    <span>10/23</span>
                    <p>Editor's name</p>
                    <time>10/27</time>
                </li>
                <li className = {styles.submission}>
                    <h4>fsdfh sdjgfdfh dfhgs asdgasf sdfhg</h4>
                    <span>10/23</span>
                    <p>Editor's name</p>
                    <time>10/27</time>
                </li>
            </ul>
        </div>
    )
}

export default Current;