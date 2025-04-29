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
    const [loading, setLoading] = useState(false);


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
                setLoading(true);
                const response = await fetch('https://cirt-project-server.vercel.app/user/',{
                    method: "GET",
                })
                if(!response.ok){
                    throw new Error ("Failed to fetch users");
                }
                const data = await response.json();
                setListOfUsers(data);
                setFilteredList(data);
                console.log(data);
            } catch (error){
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
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

                    {loading ? (
                        <span>Loading users...</span> 
                    ) : filteredList.length > 0 ? (
                        filteredList.map((oneUser) => (
                            <User key={oneUser._id} user={oneUser} />
                        ))
                    ) : (
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
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [isAuthor, setIsAuthor] = useState(true);
    const [isEditor, setIsEditor] = useState(false);
    const [isReviewer, setIsReviewer] = useState(false);
    const handleAccountType = (e) => {
        const type = e.target.value;
        // Reset all role states
        setIsAuthor(false);
        setIsEditor(false);
        setIsReviewer(false);
        setIsPublic(false);

        // Set the selected role
        if (type === "author") setIsAuthor(true);
        else if (type === "editor") setIsEditor(true);
        else if (type === "reviewer") setIsReviewer(true);
        else if (type === "public") setIsPublic(true);
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        // Check if all password requirements are met
        const allRequirementsMet = Object.values(passwordRequirements).every(requirement => requirement === true);
        if (!allRequirementsMet) {
            window.alert("Please ensure your password meets all requirements.");
            return;
        }

        const capitalizedName = capitalizeName(name);
        const userData = { name: capitalizedName, email, password, isPublic, isAuthor, isEditor, isReviewer };

        try {
            const response = await fetch("https://cirt-project-server.vercel.app/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                window.alert("User registered successfully!");
                window.location.reload();
            } else {
                window.alert(data.error || "Something went wrong!");
                console.log(data.error);
            }
        } catch (error) {
            window.alert("Error: " + error.message);
        }
    };
    const capitalizeName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };
    const [passwordRequirements, setPasswordRequirements] = useState({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });

    // Function to validate password and update requirements
    const validatePassword = (password) => {
        setPasswordRequirements({
            minLength: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        });
    };


    return (
        <>
            <form className={styles.userForm} onSubmit={handleRegisterSubmit}>
                <div className={styles.inputDiv}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            maxLength={50}
                            onChange={(e)=>setName(e.target.value)}
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
                            onChange={(e)=>setEmail(e.target.value)}
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
                            onChange={(e)=>{
                                setPassword(e.target.value);
                                validatePassword(e.target.value);
                            }}
                            required
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <label htmlFor="accountType">Account Type:</label>
                        <select
                            name="accountType"
                            id="accountType"
                            required
                            onChange={handleAccountType}
                        >
                            <option value="author">Author</option>
                            <option value="editor">Editor</option>
                            <option value="reviewer">Reviewer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
                <div className={styles.requirements}>
                    <div className={styles.passwordRequirements}>
                            <p style={{ fontSize: "0.85rem" }}>Password Requirements:</p>
                            <ul style={{ fontSize: "0.8rem", marginLeft: "1rem" }}>
                                <li style={{ color: passwordRequirements.minLength ? "green" : "#c1121f" }}>
                                    At least 8 characters long
                                </li>
                                <li style={{ color: passwordRequirements.hasUppercase ? "green" : "#c1121f" }}>
                                    At least one uppercase letter
                                </li>
                                <li style={{ color: passwordRequirements.hasLowercase ? "green" : "#c1121f" }}>
                                    At least one lowercase letter
                                </li>
                                <li style={{ color: passwordRequirements.hasNumber ? "green" : "#c1121f" }}>
                                    At least one number
                                </li>
                                <li style={{ color: passwordRequirements.hasSpecialChar ? "green" : "#c1121f" }}>
                                    At least one special character
                                </li>
                            </ul>
                        </div>
                </div>

            

                <button type="submit">Submit</button>
            </form>

            <button className={styles.closeBtn} onClick={onClose}>&#215;</button>
        </>
    );
};

export default UserList;