import styles from './MainContentAuthor.module.css';
import { Link } from "react-router-dom";

import { FaRegSmileWink } from "react-icons/fa";
import { ImFilePicture } from "react-icons/im";
import { MdUploadFile } from "react-icons/md";
import { IoDocumentOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { BiTask } from "react-icons/bi";

import TrackBar from "./TrackBar/TrackBar";

import { dashBoardContext } from './Dashboard';
import { useState, useContext } from 'react';


const taskListToBeComplete = [
    {
        title: "Look at reviews",
        description: "You need to look at the reviewsssss"
    },

    {
        title: "Resubmit",
        description: "You need to Resubmitttttttttt"
    },

];


const CreateReminder = ({taskListToBeComplete}) => {
    const taskList = taskListToBeComplete.map((task, idx) =>
        <li key = {idx}>
            <div className = {styles.taskTitle}>
                <BiTask />
                <p>{task.title}</p>
            </div>
            <p>{task.description}</p>
        </li>
    )

    return taskList;
}

//geting Dates: https://www.shecodes.io/athena/7466-how-to-get-current-date-in-react
function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return `${month}/${date}`;
  }


const MainContentAuthor = () => {

    const { isClose } = useContext(dashBoardContext);
    
    const [ currentDate ] = useState(getDate());

    const mainContentClass = `${styles.mainContent} ${isClose ? styles.close : ''}`;
    return (
        <div className = {mainContentClass}>

            <main>
                <div className = {styles.header}>
                    <div className = {styles.left}>
                        <h1>Dashboard Author</h1>
                        <ul className = {styles.smallStuff}>
                            <li>
                                <Link to="#">New articles </Link>
                            </li>
                            /
                            <li>
                                <Link to="/"> Go to Homepage </Link> 
                            </li>
                        </ul>
                    </div>

                    <Link to="/" className = {styles.report}>
                        <MdUploadFile />
                        <span>Upload a Document</span>
                    </Link>
                </div>
            
            
                <ul className = {styles.insights}>
                    <li key = 'posters'>
                        <ImFilePicture />
                        <span class = {styles.info}>
                            <h3>10</h3>
                            <span>Num of Posters</span>
                        </span>
                    </li>
                    <li key = 'articles'>
                        <IoDocumentOutline />
                        <span class = {styles.info}>
                            <h3>10</h3>
                            <span>Num of Articles</span>
                        </span>
                    </li>
                    <li key = 'date'>
                        <MdOutlineDateRange />
                        <span class = {styles.info}>
                            <h3>{currentDate}</h3>
                            <span>Today Date</span>
                        </span>
                    </li>
                    <li key = 'happy'>
                        <FaRegSmileWink />
                        <span class = {styles.info}>
                            <h3>Smile xD</h3>
                            <span>Be Happy!</span>
                        </span>
                    </li>
                </ul>

                <div className = {styles.bottomData}>
                    <div className = {styles.trachBarContainer}>
                        <TrackBar currentStep = {2} />
                    </div>


                    <div className = {styles.reminders}>
                        <div className = {styles.header}>
                            <GrNotes />
                            <h3>Reminders</h3>
                        </div>

                        <ul className = {styles.taskList}>
                            <CreateReminder taskListToBeComplete = {taskListToBeComplete}/>
                        </ul>                                  
                    </div>

                </div>

            </main>
        </div>
    );
};

export default MainContentAuthor;