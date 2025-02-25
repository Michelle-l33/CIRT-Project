import styles from './Task.module.css';

import { FaCircleXmark, FaCircleCheck } from "react-icons/fa6";

import { useTasksDispatch } from './TaskContext';


const Task = ( {task} ) => {

    const dispatch = useTasksDispatch(); //grab the function

    return (
        <div className = {`${styles.taskIncomplete} ${task.isComplete ? styles.complete:''}`}>
            <div className = {styles.taskTitle}>
                {task.isComplete ? <FaCircleCheck /> : <FaCircleXmark />}
                <p>{task.title}</p>
                <p className = {styles.taskDescription}>{task.description}</p>
            </div>
            <div className = {styles.taskButtons}>
                <button onClick = {e => dispatch({
                    type: "change",
                    task: {
                        ...task,
                        isComplete: !task.isComplete
                    }
                })} >Mark as Complete</button>
                <button onClick = {() => dispatch({
                    type: "hide",
                    id: task.id
                })} >Hide Task</button>
            </div>
        </div>
    );
};

export default Task;