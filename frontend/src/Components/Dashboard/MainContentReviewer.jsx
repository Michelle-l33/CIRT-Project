import styles from './MainContentReviewer.module.css';


import { useContext } from 'react';
import { dashBoardContext } from './Dashboard';

//all the content decision is taken from https://docs.pkp.sfu.ca/learning-ojs/en/editorial-workflow.html


const MainContentReviewer = () => {

    const { isClose } = useContext(dashBoardContext);

    const mainContentClass = `${styles.mainContent} ${isClose ? styles.close : ''}`;
    return (
        <div className = {mainContentClass}>
            <main>

                <div className = {styles.header}>
                    <h1>Dashboard Reviewer - This is so painful</h1>                
                </div>

                {/* <div className={styles.content}>
                    <Outlet />
                </div> */}
                
                
            </main>
        </div>
    );
};

export default MainContentReviewer;