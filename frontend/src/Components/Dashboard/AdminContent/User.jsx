import styles from "./AdminContent.module.css";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";

const User = ({key, user}) => {
    const [isEditing, setIsEditing] = useState(false);
    
    return(
        <>
            <li key = {key} className={styles.user}>
                <p>{user.name}</p>
                <p>{user.email}</p>  
                <button className = {styles.editBtn} onClick={() => setIsEditing(true)}><FaEdit/></button>
            </li>

            {isEditing && (
                <div className={`${styles.userFormContainer} ${styles.show}`}>
                    <div className={styles.userFormWrapper}>
                        <h4>Edit User</h4>
                        <EditUserForm user={user} onClose={() => setIsEditing(false)} />
                    </div>
                </div>
            )}
        </>
    )
}

const EditUserForm = ({ user, onClose }) => {
    const [ newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const handleUpdateProfile = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch(`https://cirt-project-server.vercel.app/user/update-profile/${user._id}`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userID: user._id,
                    newName: newName.charAt(0).toUpperCase()+newName.slice(1),     // can be empty string if unchanged
                    newEmail: newEmail,   // can be empty string if unchanged
                }),
                mode: 'cors',
            })
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                alert("Profile updated!");
                window.location.reload(); // or update state if you're managing it
            }
        } catch (error) {
            window.alert("Error: " + error.message);
        }
        
    }
    return (
        <>
            <form className={styles.userForm} onSubmit={handleUpdateProfile}>
                <div className={styles.inputContainer}>
                    <label htmlFor="editUsername">Username:</label>
                    <input
                        type="text"
                        id="editUsername"
                        name="username"
                        defaultValue={user.name}
                        placeholder="Username"
                        maxLength={50}
                        required
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="editEmail">Email:</label>
                    <input
                        type="email"
                        id="editEmail"
                        name="email"
                        defaultValue={user.email}
                        placeholder="you@example.com"
                        maxLength={50}
                        required
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                </div>

                <button type="submit">Save Changes</button>
            </form>

            <button className={styles.closeBtn} onClick={onClose}>&#215;</button>
        </>
    );
};

export default User;