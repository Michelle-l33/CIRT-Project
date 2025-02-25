import styles from './Task.module.css';

import Task from './Task';

import { useTasks, TasksProvider, useTasksDispatch } from './TaskContext';

import { useState } from 'react';

// An example for taskList taken from https://react.dev/learn/scaling-up-with-reducer-and-context

const TaskPage = () => {
    return(
        <TasksProvider>
            <div className = {styles.taskListEd}>
                <div className = {styles.taskHeader}>
                    <h2>Task for the Editor</h2>
                    {/* definition for AddTask is down below */}
                    <AddTask />
                </div>

                {/* definition for TaskList is down below */}
                <TaskList />
            </div>
        </TasksProvider>
    )
}

export default TaskPage;


let nextID = 103;

export const AddTask = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const dispatch = useTasksDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch({
            type: "add",
            id: nextID++,
            title: title,
            description: description,
        })

        setIsOpen(false);
    }

    return (
        <>
        <button onClick = {() => setIsOpen(true)}>
            <span>Add a comment</span>
        </button>
        <div className = {`${styles.taskForm} ${isOpen ? styles.show : ""}`}>
            <h4>Add Task</h4>
            <form onSubmit = {handleSubmit}>
                <input type = "text" value = {title} placeholder = "Task Title" onChange = {(event) => setTitle(event.target.value)} />

                <textarea value = {description} placeholder = "Task Decription" onChange = {(event) => setDescription(event.target.value)}/>

                <button type = "submit">
                    Submit
                </button>
            </form>
            <button class = {styles.closeBtn} onClick = {() => setIsOpen(false)}>X</button>
        </div>
        </>
    )
}


export const TaskList = () => {

    const taskList = useTasks();
    
    return(
    
        <ul className = {styles.taskList}>
            {taskList.length >0 ? (taskList.map((task) =>
                <li key = {task.id}>
                    <Task task = {task}/>
                </li>)
            ) : (<span>Nooooooo Task! Yay!</span>)}
        </ul>
    
    );
}