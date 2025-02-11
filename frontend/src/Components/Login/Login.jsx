// import NavBar from '../NavBar/NavBar';
// import DropDownBar from '../DropDownBar/DropDownBar'

import React, { useState } from "react";
import styles from './Login.module.css';
import Cookies from  'js-cookie';
import { useUser } from "./UserContext";


const LoginPage = () => {
    // State to manage form data
    const {handleLogout} = useUser();
    const {user, setUser} = useUser(); //gets current user info
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthor, setIsAuthor] = useState(false);
    const [isEditor, setIsEditor] = useState(false);
    const [isReviewer, setIsReviewer] = useState(false);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPass] = useState("");
    const [alertMessage, setAlertMessage] = useState('');
   

   

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const userData = { email: loginEmail, password: loginPassword };
    
        try {
            const response = await fetch("http://localhost:8082/user/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
              });
    
          const data = await response.json();
    
          if (response.ok){
            const userObj = {name:data.name, email:loginEmail, token:data.token};
            Cookies.set('user', JSON.stringify(userObj),{expires:7}) // sets cookies; expires in 7 days
            setUser(userObj)
            setAlertMessage("Login Successful!");
            setTimeout(()=>{
              setAlertMessage('');
            },2000);
            window.location.href = "/dashboard"; 
          }
          else{
            window.alert("Invalid Credentials. Please Try Again!");
            console.log(data.error);
          }
      }
      catch(error){
        window.alert("Error!!!")
        console.log(error.message)
      }
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
    
        const userData = { name, email, password, isAuthor, isEditor, isReviewer};

    
        try {
          const response = await fetch("http://localhost:8082/user/register", {
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
            window.alert( data.error||"Something went wrong!");
            console.log(data.error);
          }
        } catch (error) {
          window.alert("Error: " + error.message);
        }
      
    }
      
    
       const handleAccountType =(e) =>{

        const type = e.target.value;
        // Reset all role states
        setIsAuthor(false);
        setIsEditor(false);
        setIsReviewer(false);

        // Set the selected role
        if (type === "author") setIsAuthor(true);
        else if (type === "editor") setIsEditor(true);
        else if (type === "reviewer") setIsReviewer(true);
        

      }

      
    
 
    return (
      
        <div className={styles.loginContainer}>
          {alertMessage && (
                  <div className={styles.alert}>
                    {alertMessage}
                  </div>
                )}
        <div className={styles.loginContainer}>
            <div className={styles.accounts}>
                
                {/* Login Form */}
                <div className={styles.login}>
                    <h2>Login</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <label htmlFor="login-username">Enter your Email:</label>
                        <input type="text" id="login-username" name="username" placeholder="Username" onChange={(e)=>setLoginEmail(e.target.value)} required />
                        
                        <label htmlFor="login-password">Enter your Password:</label>
                        <input type="password" id="login-password" name="password" placeholder="Password" onChange={(e)=>setLoginPass(e.target.value)} required />
                        
                        <button id="loginButton" type="submit">Log In</button>
                    </form>
                </div>

                <div id="divider"></div>

                {/* Register Form */}
                <div className={styles.register}>
                  
                    <h2>Register</h2>
                    <form onSubmit={handleRegisterSubmit}>
                        <label htmlFor="register-username">Enter your Username:</label>
                        <input type="text" id="register-username" name="username" placeholder="Username" onChange={(e)=>setName(e.target.value)} required />
                        
                        <label htmlFor="register-email">Enter your Email:</label>
                        <input type="email" id="register-email" name="email" placeholder="you@example.com" onChange={(e)=>setEmail(e.target.value)} required />
                        
                        <label htmlFor="account-type">Account Type:</label>
                        <select name="account_type" id="account-type" onChange={(handleAccountType)}required>
                            <option value="none">Select Account Type</option>
                            <option value="author">Author</option>
                            <option value="editor">Editor</option>
                            <option value="reviewer" >Reviewer</option>
                            
                            
                        </select>
                        
                        <label htmlFor="register-password">Enter your Password:</label>
                        <input type="password" id="register-password" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required />
                        
                        <button id="registerButton" type="submit">Create Account</button>
                    </form>
                </div>
            </div>
          
          
        </div>
    </div>
    );
};


export default LoginPage;