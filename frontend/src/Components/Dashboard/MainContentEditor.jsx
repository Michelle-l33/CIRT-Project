import { Outlet, Link, useLocation } from 'react-router-dom';
import styles from './MainContentEditor.module.css';

const MainContentEditor = () => {

    const location = useLocation();

    return (
        <div className = {styles.mainContent}>
            <main>

                <div className = {styles.header}>
                    <Link to = "/Dashboard"><h1>Dashboard</h1></Link>                       
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
                

            </main>
        </div>
    );
};

export default MainContentEditor;