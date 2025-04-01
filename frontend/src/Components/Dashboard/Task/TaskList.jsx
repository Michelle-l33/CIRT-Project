import styles from './Task.module.css';
import { MdAddTask } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

// An example for taskList taken from https://react.dev/learn/scaling-up-with-reducer-and-context


const taskList = [
    {   
        id: "67e577b2ae7a730c6b462c1a",
        firstName: "sda",
        lastName: 'fasfds',
        title: "asdanjdasd sdbs",
    },

    {   
        id: "67e577cfae7a730c6b462c22",
        firstName: "sda",
        lastName: 'fasfds',
        title: "asdanjdasd sdbs",
    },
];

const TaskPage = () => {
    return(
            <div className = {styles.taskListEd}>
                <div className = {styles.taskHeader}>
                    <h2>Task for the Editor</h2>
                </div>
                <TaskList />
            </div>
    )
}

export default TaskPage;


const TaskList = () => {
    return(
    
        <ul className = {styles.taskList}>
            {taskList.length >0 ? (taskList.map((task) =>
                <li key = {task.id}>
                    <Reminder task = {task}/>
                </li>)
            ) : (<span>Nooooooo Task! Yay!</span>)}
        </ul>
    
    );
}

const Reminder = ( {task} ) => {

    const navigate = useNavigate();

    return (
        <div className = {`${styles.taskIncomplete} ${task.isComplete ? styles.complete:''}`}>
            <div className = {styles.taskTitle}>
                <MdAddTask />
                <p>Author just Resubmitted</p>
                <p className = {styles.taskDescription}>{`This author ${task.firstName} ${task.lastName} just resubmitted. The title is ${task.title}`}</p>
            </div>
            <div className = {styles.taskButtons}>
                <button onClick={() => navigate(`/Dashboard/Editor/DocumentTab?submissionId=${task.id}`)}>View in Detail</button>
            </div>
        </div>
    );
};