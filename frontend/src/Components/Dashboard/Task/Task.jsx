import styles from './Task.module.css';

import { FaCircleXmark, FaCircleCheck } from "react-icons/fa6";

import { useState } from 'react';

const Task = ( {title, description} ) => {

    const [ isComplete, setIsComplete] = useState(false);

    return (
        <div className = {`${styles.taskIncomplete} ${isComplete ? styles.complete:''}`}>
            <div className = {styles.taskTitle}>
                {isComplete? <FaCircleCheck /> : <FaCircleXmark />}
                <p>{title}</p>
                <p className = {styles.taskDescription}>{description}</p>
            </div>
            <div className = {styles.taskButtons}>
                <button onClick = {() => setIsComplete(true)}>Mark as Complete</button>
                <button>Hide Task</button>
            </div>
        </div>
    );
};

export default Task;