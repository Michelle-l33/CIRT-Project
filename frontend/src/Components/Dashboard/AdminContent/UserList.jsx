import styles from "./AdminContent.module.css";
import { BsSearchHeart } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

import User from "./User";

import { useState,useEffect } from "react";

const UserList = () => {
    const[listOfUsers,setListOfUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filteredList, setFilteredList] = useState(listOfUsers);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearch(value);
    
        const filteredResults = listOfUsers.filter(user =>
            user.name.toLowerCase().includes(value.toLowerCase()) ||
            user.email.toLowerCase().includes(value.toLowerCase())
        );
    
        setFilteredList(filteredResults);
    };

    useEffect(()=>{
        const fetchUsers = async()=> {
            try{
                const response = await fetch('https://cirt-project-server.vercel.app/user/',{
                    method: "GET",
                })
                if(!response.ok){
                    throw new Error ("Failed to fetch users");
                }
                const data = response.json();
                setListOfUsers(data);
            } catch (error){
                console.error("Error fetching users:", error);
              }
        }
        fetchUsers();
    },[])

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
            
            <section>
                
                <ul className={styles.userListHeader}>
                    <li>Name</li>
                    <li>Email</li>
                </ul>

                <ul className={styles.userList}>

                    {filteredList.length > 0 ? (
                        filteredList.map((oneUser) => (
                            (<User key={oneUser._id} user = {oneUser}/>)
                        ))) : (
                        <span>No Submission Found</span>
                    )}
                </ul>
            </section>
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
                
                {/* the code for UserForm is defined down below */}
                {isOpen && <AddUserForm onClose={() => setIsOpen(false)} />}
            </div>
        </div>
    )
}
 
const AddUserForm = ({ onClose }) => {
    return (
        <>
            <form className={styles.userForm}>
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

                <div className={styles.inputContainer}>
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

                <button type="submit">Submit</button>
            </form>

            <button className={styles.closeBtn} onClick={onClose}>&#215;</button>
        </>
    );
};

export default UserList;