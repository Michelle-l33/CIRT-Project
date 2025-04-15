import styles from './UserTab.module.css'
import sparLogo from '../../../Asset/Spartans.logo.png'
import { dashBoardContext } from '../Dashboard';
import { useContext, useState } from 'react';

const UserTab = () => {
    const { user, isClose } = useContext(dashBoardContext);
    const [ isEditMode, setIsEditMode] = useState(false);

    const mainContentClass = `${styles.userTabContainer} ${isClose ? styles.close : ''}`;
    return (
        <div className={mainContentClass}>
            <div className={styles.bigContaner}>
                <div className={styles.userLeft}>

                    <img className={styles.logo} src = {sparLogo} alt = "Spartan Logo"/>

                </div>

                <div className = {styles.userRight}>
                    <div className = {styles.header}>
                        <h2>Username: <span className={styles.userName}>{user.name}</span></h2>
                        <button onClick={() => setIsEditMode(!isEditMode)}>
                            {isEditMode ? "Stop Editting" : "Edit Profile"}
                        </button>
                    </div>

                    <div className = {styles.emailContainer}>
                        <h3>Your email</h3>

                        {isEditMode ? 
                            <form className={styles.emailChange}>
                                <input  type='text'
                                        placeholder="Enter your new email"></input>
                            </form>
                        : 
                            <span>{user.email}</span>}
                    </div>

                    {/* <div className = {styles.pwContainer}>
                        <h3>Your password</h3>
                        <span>{user.password}</span>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default UserTab;