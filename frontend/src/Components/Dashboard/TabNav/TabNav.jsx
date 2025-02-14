import styles from './TabNav.module.css';

import { Link, Outlet, useLocation } from 'react-router-dom';
import { dashBoardContext } from '../Dashboard';
import { useContext } from 'react';

//routing to the MyQueue when clicked tabNav learned from https://stackoverflow.com/questions/32706913/react-router-what-is-the-purpose-of-indexroute

const TabNav = () => {

    const location = useLocation();

    const { isClose } = useContext(dashBoardContext);

    return(
        <div className = {`${styles.tabNavContainer} ${isClose ? styles.close : ''}`}>
                <div className={styles.tabNav}>
                    <Link to="MyQueue" className = {`${location.pathname === '/Editor/TabNav/MyQueue' ? styles.tabActive : ''}`}>My Queue</Link>
                    <Link to="AllActive" className={`${location.pathname === '/Editor/TabNav/AllActive' ? styles.tabActive : ''}`}>All Active</Link>
                    <Link to="Unassigned" className={`${location.pathname === '/Editor/TabNav/Unassigned' ? styles.tabActive : ''}`}>Unassigned</Link>
                    <Link to="Archives" className={`${location.pathname === '/Editor/TabNav/Archives' ? styles.tabActive : ''}`}>Archives</Link>       
                </div>
        
                <div className={styles.content}>
                    <Outlet />
                </div>
        </div>
        
    );
}

export default TabNav;