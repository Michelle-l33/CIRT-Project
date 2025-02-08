// the whole design is from https://www.youtube.com/watch?v=D88K1esxwuo&t=98s
import styles from './Dashboard.module.css'

import Sidebar from './Sidebar';
import MainContentNav from './MainContentNav'
import MainContentAuthor from './MainContentAuthor';

import { createContext, useState, useEffect } from 'react';

export const dashBoardContext = createContext(null);


const Dashboard = () => {


    //this part is for changing dark and white theme
    const [isChecked, setChecked] = useState(false);  
    const handleToggle = () => {
        setChecked((prev) => !prev);
    };


    //this part is to handle window resizing https://dev.to/musselmanth/re-rendering-react-components-at-breakpoint-window-resizes-a-better-way-4343
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        
        // Cleanup function to remove the event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (

        <dashBoardContext.Provider value = {{isChecked, handleToggle, windowWidth}}>
            <div className = {`${styles.dashBoardContainer} ${isChecked ? styles.dark : ''}`}>
                <Sidebar />
                <MainContentNav/>
                <MainContentAuthor />
            </div>      
        </dashBoardContext.Provider>
    );
};

export default Dashboard;