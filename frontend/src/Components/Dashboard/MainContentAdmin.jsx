import styles from './MainContentAdmin.module.css';

import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { dashBoardContext } from './Dashboard';

const MainContentAdmin = () => {

    const { isClose } = useContext(dashBoardContext);

    const mainContentClass = `${styles.mainContent} ${isClose ? styles.close : ''}`;
    return (
        <div className = {mainContentClass}>
            <main>

                <div className = {styles.header}>
                    <h1>Admin Dashboard</h1>                
                </div>

                <div className={styles.content}>
                    <Outlet />
                </div>
                
                
            </main>
        </div>
    );
};

export default MainContentAdmin;