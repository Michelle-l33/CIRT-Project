import styles from './Task.module.css';

import Task from './Task';

import { useState } from 'react';



const TaskList = () => {

    const [ taskList ] = useState([
        {
            title: "Look at reviews",
            description: "You need to look at the reviewsssss sjdb ashdba hasdbashdab sahdbasdhb sahdb"
        },
    
        {
            title: "Resubmit",
            description: "You need to Resubmitttttttttt"
        },
    ])
    
    return(
        <div className = {styles.taskListEd}>
        <h2>Task</h2>
        
        <ul className = {styles.taskList}>
            {taskList.map((task, idx) =>
                <li key = {idx}>
                    <Task title = {task.title} description = {task.description}/>
                </li>
            )}
        </ul>
    </div>
    );
}

export default TaskList;