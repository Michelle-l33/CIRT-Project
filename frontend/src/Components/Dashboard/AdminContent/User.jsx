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
    return (
        <>
            <form className={styles.userForm}>
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
                    />
                </div>

                <button type="submit">Save Changes</button>
            </form>

            <button className={styles.closeBtn} onClick={onClose}>&#215;</button>
        </>
    );
};

export default User;