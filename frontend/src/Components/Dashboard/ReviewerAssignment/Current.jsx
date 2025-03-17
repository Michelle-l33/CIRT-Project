import { useState } from "react";
import styles from "./ReviewerAssignment.module.css"
import SubDetail from "./SubmissionDetails";

const listOfSubmission = [
    {
        title: "1 fsdfh sdjgfdfh dfhgs asdgasf sdfhg",
        dateAssigned: new Date("2025-10-23"),
        editorFName: "John",
        editorLName: "Smith",
        dueDate: new Date("2025-10-27"),
    },
    {
        title: "2 fsdfh sdjgfdfh dfhgs asdgasf sdfhg",
        dateAssigned: new Date("2025-10-24"),
        editorFName: "Jack",
        editorLName: "Smith",
        dueDate: new Date("2025-10-27"),
    },
    {
        title: "3 fsdfh sdjgfdfh dfhgs asdgasf sdfhg",
        dateAssigned: new Date("2025-10-23"),
        editorFName: "Jay",
        editorLName: "Smith",
        dueDate: new Date("2025-10-25"),
    },
    {
        title: "4 fsdfh sdjgfdfh dfhgs asdgasf sdfhg",
        dateAssigned: new Date("2025-10-26"),
        editorFName: "Jacky",
        editorLName: "Smith",
        dueDate: new Date("2025-10-27"),
    },
    {
        title: "5 fsdfh sdjgfdfh dfhgs asdgasf sdfhg",
        dateAssigned: new Date("2025-10-21"),
        editorFName: "Jishy",
        editorLName: "Smith",
        dueDate: new Date("2025-10-27"),
    },
    {
        title: "6 fsdfh sdjgfdfh dfhgs asdgasf sdfhg",
        dateAssigned: new Date("2025-10-26"),
        editorFName: "Jojo",
        editorLName: "Smith",
        dueDate: new Date("2025-10-24"),
    },
    {
        title: "6 fsdfh sdjgfdfh dfhgs asdgasf sdfhg",
        dateAssigned: new Date("2025-10-26"),
        editorFName: "Jojo",
        editorLName: "Smith",
        dueDate: new Date("2025-10-24"),
    },
    {
        title: "6 fsdfh sdjgfdfh dfhgs asdgasf sdfhg",
        dateAssigned: new Date("2025-10-26"),
        editorFName: "Jojo",
        editorLName: "Smith",
        dueDate: new Date("2025-10-24"),
    },

]

const Current = () => {
    function getDate(date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${month}/${day}`;
    }

    const [currSubmission, setCurrSubmission] = useState(null)

    return (
        <div className={styles.currentAssignemt}>
            <ul className={styles.listHeader}>
                <li>Title</li>
                <li>Date Assigned</li>
                <li>Editor</li>
                <li>Due Date?</li>
            </ul>

            <ul className = {styles.submissionContainer}>
                {listOfSubmission.map((sub, idx) => (
                    <li className = {styles.submission} key = {idx} onClick = {(() => setCurrSubmission(sub))}>
                        <h4>{sub.title}</h4>
                        <time>{getDate(sub.dateAssigned)}</time>
                        <p>{sub.editorFName +" "+ sub.editorLName}</p>
                        <time>{getDate(sub.dueDate)}</time>
                    </li>
                ))}
            </ul>
            { currSubmission != null && <SubDetail submission = {currSubmission} setIsOpen={setCurrSubmission}/> }
        </div>
    )
}

export default Current;