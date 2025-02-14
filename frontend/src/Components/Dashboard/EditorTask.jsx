import styles from './MainContentEditor.module.css';

import { BiTask } from "react-icons/bi";

const taskListToBeComplete = [
    {
        title: "Look at reviews",
        description: "You need to look at the reviewsssss"
    },

    {
        title: "Resubmit",
        description: "You need to Resubmitttttttttt"
    },
];

const TabNav = () => {

    
    return(
        <div className = {styles.taskListEd}>
        <h2>Task</h2>
        
        <ul className = {styles.taskList}>
            {taskListToBeComplete.map((task, idx) =>
                <li key = {idx}>
                    <div className = {styles.taskTitle}>
                        <BiTask />
                        <p>{task.title}</p>
                    </div>
                    <p>{task.description}</p>
                </li>
            )}
        </ul>
    </div>
    );
}

export default TabNav;