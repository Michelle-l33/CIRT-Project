import styles from './MainContentEditor.module.css';

import { Link, Outlet, useLocation } from 'react-router-dom';



const TabNav = () => {

    const location = useLocation();

    return(
        <>
                <div className={styles.tabNav}>
                    <Link to="MyQueue" className = {`${location.pathname === '/Editor/TabNav/MyQueue' ? styles.tabActive : ''}`}>My Queue</Link>
                    <Link to="AllActive" className={`${location.pathname === '/Editor/TabNav/AllActive' ? styles.tabActive : ''}`}>All Active</Link>
                    <Link to="Unassigned" className={`${location.pathname === '/Editor/TabNav/Unassigned' ? styles.tabActive : ''}`}>Unassigned</Link>
                    <Link to="Archives" className={`${location.pathname === '/Editor/TabNav/Archives' ? styles.tabActive : ''}`}>Archives</Link>       
                </div>
        
                <div className={styles.content}>
                    <Outlet />
                </div>
        </>
        
    );
}

export default TabNav;