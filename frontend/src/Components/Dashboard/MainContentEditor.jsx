import { Outlet, Link, useLocation } from 'react-router-dom';
import styles from './MainContentEditor.module.css';

import { BiTask } from "react-icons/bi";

import { useContext } from 'react';
import { dashBoardContext } from './Dashboard';

//all the content decision is taken from https://docs.pkp.sfu.ca/learning-ojs/en/editorial-workflow.html

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

const MainContentEditor = () => {

    const location = useLocation();

    const { isClose } = useContext(dashBoardContext);

    const mainContentClass = `${styles.mainContent} ${isClose ? styles.close : ''}`;
    return (
        <div className = {mainContentClass}>
            <main>

                <div className = {styles.header}>
                    <Link to = "/Dashboard"><h1>Dashboard Editor - A work In Progress</h1></Link>                       
                </div>

                <div className={styles.tabNav}>
                    <Link to="MyQueue" className = {`${location.pathname === '/Dashboard/MyQueue' ? styles.tabActive : ''}`}>My Queue</Link>
                    <Link to="AllActive" className={`${location.pathname === '/Dashboard/AllActive' ? styles.tabActive : ''}`}>All Active</Link>
                    <Link to="Unassigned" className={`${location.pathname === '/Dashboard/Unassigned' ? styles.tabActive : ''}`}>Unassigned</Link>
                    <Link to="Archives" className={`${location.pathname === '/Dashboard/Archives' ? styles.tabActive : ''}`}>Archives</Link>       
                </div>

                <div className={styles.content}>
                    <Outlet />
                </div>
                
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
            </main>
        </div>
    );
};

export default MainContentEditor;