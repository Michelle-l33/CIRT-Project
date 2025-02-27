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

                <div className={styles.content}>
                    <ul className={styles.listHeader}>
                        <li>Title</li>
                        <li>Date Assigned</li>
                        <li>Editor</li>
                        <li>Due Date?</li>
                    </ul>

                    <ul className = {styles.submissionContaniner}>
                        <li className = {styles.submission}>
                            <h4>fsdfh sdjgfdfh dfhgs asdgasf sdfhg</h4>
                            <span>10/23</span>
                            <p>Editor's name</p>
                            <time>10/27</time>
                        </li>
                        <li className = {styles.submission}>
                            <h4>fsdfh sdjgfdfh dfhgs asdgasf sdfhg</h4>
                            <span>10/23</span>
                            <p>Editor's name</p>
                            <time>10/27</time>
                        </li>
                        <li className = {styles.submission}>
                            <h4>fsdfh sdjgfdfh dfhgs asdgasf sdfhg</h4>
                            <span>10/23</span>
                            <p>Editor's name</p>
                            <time>10/27</time>
                        </li>
                    </ul>
                </div>
                
                
            </main>
        </div>
    );
};

export default MainContentReviewer;