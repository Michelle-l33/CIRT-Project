import styles from './MainContentEditor.module.css';

import { Outlet } from 'react-router-dom';


import { useContext } from 'react';
import { dashBoardContext } from './Dashboard';

//all the content decision is taken from https://docs.pkp.sfu.ca/learning-ojs/en/editorial-workflow.html


const MainContentEditor = () => {

    const { isClose } = useContext(dashBoardContext);

    const mainContentClass = `${styles.mainContent} ${isClose ? styles.close : ''}`;
    return (
        <div className = {mainContentClass}>
            <main>

                <div className = {styles.header}>
                    <h1>Dashboard Editor - A work In Progress</h1>                
                </div>

                <div className={styles.content}>
                    <Outlet />
                </div>
                
                
            </main>
        </div>
    );
};

export default MainContentEditor;