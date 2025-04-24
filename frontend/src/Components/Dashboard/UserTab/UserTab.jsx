import styles from './UserTab.module.css'
import sparLogo from '../../../Asset/spartanLogo.png'
import { dashBoardContext } from '../Dashboard';
import { useContext, useState } from 'react';

const UserTab = () => {
    const { user, isClose } = useContext(dashBoardContext);
    const [ isEditMode, setIsEditMode] = useState(false);
    const [ newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const handleUpdateProfile = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch("https://cirt-project-server.vercel.app/user/update-profile",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userID: user._id,
                    newName: newName,     // can be empty string if unchanged
                    newEmail: newEmail,   // can be empty string if unchanged
                })
            })
            const data = await response.json();
            if (response.ok) {
                alert("Profile updated!");
                window.location.reload(); // or update state if you're managing it
            }
        } catch (error) {
            window.alert("Error: " + error.message);
        }
        
    }

    const mainContentClass = `${styles.userTabContainer} ${isClose ? styles.close : ''}`;
    return (
        <div className={mainContentClass}>
            <div className={styles.bigContaner}>
                <div className={styles.userLeft}>

                    <img className={styles.logo} src = {sparLogo} alt = "Spartan Logo"/>

                </div>

                <div className = {styles.userRight}>
                   
                {isEditMode ? 
                    <form className={styles.emailChange} onSubmit={handleUpdateProfile}>
                        <div className={styles.inputRow}>
                            <h4>Username:</h4>
                            <input
                                type='text'
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder={user.name}
                                maxLength={50}
                                
                            />
                        </div>
                        <div className={styles.inputRow}>
                            <h4>Email:</h4>
                            <input
                                type='text'
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder={user.email}
                                maxLength={50}
                                
                            />
                        </div>
                        
                        <button type="submit">Submit</button>
                    </form>
                : 
                    <div>
                        <h2>Username: <span className={styles.userName}>{user.name}</span></h2>
                        <h3>Email: <span>{user.email}</span></h3> 
                    </div>
                }

                    <div className = {styles.header}>
                        <div>
                            <button onClick={() => setIsEditMode(!isEditMode)}>
                                {isEditMode ? "Stop Editting" : "Edit Profile"}
                            </button>
                            <button ><a href="/forgot-password">Change Password</a></button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserTab;