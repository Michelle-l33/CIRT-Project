import styles from "./AdminContent.module.css";
import { BsSearchHeart } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { useState } from "react";

const UserList = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };
    return (
        <div className= {styles.adminContent}>
            <div className = {styles.tabHeader}>
                    <h3>List of User</h3>

                    <div className = {styles.left}>

                        <form onSubmit = {(event) => event.preventDefault()}>
                            <div className = {styles.formInput}>
                                <input  type = "search" 
                                        placeholder = "Search"
                                        value = {search}
                                        onChange = {handleSearchChange}></input>
                                <button type = "submit" ><BsSearchHeart /></button>
                            </div>
                        </form>

                    </div>

                    {/* the code for addUserBtn is defined down below */}
                    <AddUserBtn />

                    {totalPages >= 1 && (
                        <div className={styles.pagination}>
                            <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}><GrPrevious/></button>
                            <span>{page}/{totalPages}</span>
                            <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}><GrNext /></button>
                        </div>
                    )}

            </div>
    </div>
    )
}

const AddUserBtn = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={styles.addUser}>
            <button className= {styles.addUserBtn} onClick={() => setIsOpen(true)}><AiOutlineUserAdd /></button>

            <div className = {`${styles.userFormContainer} ${isOpen ? styles.show : ""}`}>
                <h4>Add User</h4>
                
                <form className = {styles.userForm}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            maxLength={50}
                            required
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                            maxLength={50}
                            required
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="text" 
                            id="password"
                            name="password"
                            placeholder="Password"
                            maxLength={25}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="accountType">Account Type:</label>
                            <select
                                name="accountType"
                                id="accountType"
                                required
                            >
                            <option value="author">Author</option>
                            <option value="editor">Editor</option>
                            <option value="reviewer">Reviewer</option>
                            <option value="admin">Admin</option>
                        </select>
                     </div>

                    <button type="submit">Create User</button>
                </form>

                <button className={styles.closeBtn} onClick = {() => setIsOpen(null)}>&#215;</button>
            </div>
        </div>
    )
}

export default UserList;