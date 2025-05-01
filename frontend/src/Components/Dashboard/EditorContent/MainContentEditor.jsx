import styles from './MainContentEditor.module.css';

import { Outlet, Link } from 'react-router-dom';

import { useContext } from 'react';
import { dashBoardContext } from '../Dashboard';

//all the content decision is taken from https://docs.pkp.sfu.ca/learning-ojs/en/editorial-workflow.html


const MainContentEditor = () => {

    const { isClose } = useContext(dashBoardContext);

    const mainContentClass = `${styles.mainContent} ${isClose ? styles.close : ''}`;
    return (
        <div className = {mainContentClass}>
            <main>

                <div className = {styles.header}>
                    <h1>Editor Dashboard</h1>
                    <ul className={styles.smallStuff}>
                            <li>
                                <Link to="/">Homepage</Link> 
                            </li>
                            /
                            <li>
                                <Link to="/Papers">Gallery</Link>
                            </li>
                    </ul>                
                </div>

                <div className={styles.content}>
                    <Outlet />
                </div>
                
                
            </main>
        </div>
    );
};

export default MainContentEditor;