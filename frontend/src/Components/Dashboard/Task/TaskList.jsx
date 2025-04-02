import styles from './Task.module.css';
import { MdAddTask } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { dashBoardContext } from '../Dashboard';
import { PiFinnTheHumanThin } from "react-icons/pi";

const taskList = [
    {   
        id: "67e577b2ae7a730c6b462c1a",
        firstName: "sda",
        lastName: 'fasfds',
        title: "asdanjdasd sdbs",
    },

    {   
        id: "67e577cfae7a730c6b462c22",
        firstName: "sda",
        lastName: 'fasfds',
        title: "asdanjdasd sdbs",
    },
];



const TaskPage = () => {

    const [editors, setEditors] = useState([]);

    const { user } = useContext(dashBoardContext);
    

// Fetch all editors
    useEffect(() => {
        const fetchEditors = async () => {
            try {
                const response = await fetch('http://localhost:8082/user/');
                if (!response.ok) throw new Error('Failed to fetch editors');
                
                const data = await response.json();
                const editorUsers = data.filter(user => user.isEditor);
                setEditors(editorUsers);
            } catch (error) {
                console.error("Error fetching editors:", error);
            }
        };
        fetchEditors();
    }, []);

    console.log(editors)

    return(


        <div className = {styles.taskContent}>
            <div className = {styles.right}>
                <div className = {styles.header}>
                    <h3>Your Editor colleagues</h3>
                    <span>Gotta Catch Them All!</span>
                </div>

            <ul className={styles.editorList}>
                {editors.map((editor, index) => (
                        <li key={index} className={styles.editorItem}>
                            <span className={styles.icon}><PiFinnTheHumanThin /></span>
                            <span className={styles.name}>{editor.name}</span>
                        </li>
                    ))}
            </ul>
        </div>

            <div className = {styles.left}>

                <div className = {styles.dateIntro}>
                    
                    <div className = {styles.date}>
                        <Today />
                    </div>

                    <div className = {styles.greeting}>
                        <div className={styles.eyes}>
                            <div className={styles.eye}></div>
                            <div className={styles.eye}></div>
                        </div>
                        <div className = {styles.hello}>
                            <h3>{`Hello ${user.name}`}</h3>
                            <p>Don't forget to hydrate and stay healthy!</p>
                            <span>Have a nice day &#x263B;</span>
                        </div>
                    </div>
                </div>

                <div className = {styles.taskListEd}>
                    <div className = {styles.taskHeader}>
                        <h2>Task for the Editor</h2>
                    </div>
                    <TaskList />
                </div>
                
            </div>       
        </div>

            
    )
}

export default TaskPage;


const TaskList = () => {
    return(
    
        <ul className = {styles.taskList}>
            {taskList.length >0 ? (taskList.map((task) =>
                <li key = {task.id}>
                    <Reminder task = {task}/>
                </li>)
            ) : (<span>Nooooooo Task! Yay!</span>)}
        </ul>
    
    );
}

const Reminder = ( {task} ) => {

    const navigate = useNavigate();

    return (
        <div className = {`${styles.taskIncomplete} ${task.isComplete ? styles.complete:''}`}>
            <div className = {styles.taskTitle}>
                <MdAddTask />
                <p>Author just Resubmitted</p>
                <p className = {styles.taskDescription}>{`This author ${task.firstName} ${task.lastName} just resubmitted. The title is ${task.title}`}</p>
            </div>
            <div className = {styles.taskButtons}>
                <button onClick={() => navigate(`/Dashboard/Editor/DocumentTab?submissionId=${task.id}`)}>View in Detail</button>
            </div>
        </div>
    );
};


const Today = () => {
    
    const today = new Date();
    // const month = ("0" + (today.getMonth() + 1)).slice(-2);

    let month;

    switch (today.getMonth()) {
        case 1: {
            month = "January";
            break;
        }
        case 2: {
            month = "February";
            break;
        }
        case 3: {
            month = "March";
            break;
        }
        case 4: {
            month = "April";
            break;
        }
        case 5: {
            month = "May";
            break;
        }
        case 6: {
            month = "June";
            break;
        }
        case 7: {
            month = "July";
            break;
        }
        case 8: {
            month = "August";
            break;
        }
        case 9: {
            month = "September";
            break;
        }
        case 10: {
            month = "October";
            break;
        }
        case 11: {
            month = "November";
            break;
        }
        case 12: {
            month = "December";
            break;
        }
    }

    const dateNumber = ("0" + today.getDate()).slice(-2);

    let dateName;
    switch (today.getDay()) {
        case 0: {
            dateName = "Sunday";
            break;
        }
        case 1: {
            dateName = "Monday";
            break;
        }
        case 2: {
            dateName = "Tuesday";
            break;
        }
        case 3: {
            dateName = "Wednesday";
            break;
        }
        case 4: {
            dateName = "Thursday";
            break;
        }
        case 5: {
            dateName = "Friday";
            break;
        }
        case 6: {
            dateName = "Saturday";
            break;
        }
    }

    const year = today.getFullYear();
    
    return (
        <div className = {styles.calendar}>

            <span className = {styles.month}>{month}</span>
            <span className = {styles.dateName}>{dateName}</span>
            <span className = {styles.dateNumber}>{dateNumber}</span>
            <span className = {styles.year}>{year}</span>

        </div>
    )
}