import styles from './MainContentAdmin.module.css';

import { Outlet, Link } from 'react-router-dom';
import { useContext } from 'react';
import { dashBoardContext } from '../Dashboard';

const MainContentAdmin = () => {

    const { isClose } = useContext(dashBoardContext);

    const mainContentClass = `${styles.mainContent} ${isClose ? styles.close : ''}`;
    return (
        <div className = {mainContentClass}>
            <main>

                <div className = {styles.header}>
                    <h1>Admin Dashboard</h1>
                    <ul className={styles.smallStuff}>
                            <li>
                                <Link to="/">Homepage</Link> 
                            </li>
                            /
                            <li>
                                <Link to="/Gallery">Gallery</Link>
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

export default MainContentAdmin;