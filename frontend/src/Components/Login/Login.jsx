// import NavBar from '../NavBar/NavBar';
// import DropDownBar from '../DropDownBar/DropDownBar'


import styles from './Login.module.css';

// const dropDownList = [
//     {
//         label: "Overall",
//         listOfDropDown: [

//         { label: "Option 1", url: "/option1" },
//         { label: "Option 2", url: "/option2" }

//         ]
//     },

//     {
//         label: "Gallery",
//         listOfDropDown: [

//         { label: "Option 1", url: "/option1" },
//         { label: "Option 2", url: "/option2" }
        
//         ]
//     },

//     {
//         label: "Document",
//         listOfDropDown: [

//             { label: "Option 1", url: "/option1" },
//             { label: "Option 2", url: "/option2" }
            
//             ]
//     }, 
// ]


const loginPage = () => {

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        // Add login logic here
        console.log("Login submitted");
    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        // Add registration logic here
        console.log("Registration submitted");
    };

    return (
        <div className={styles.container}>
            <div className={styles.accounts}>
                
                {/* Login Form */}
                <div className={styles.login}>
                    <h2>Login</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <label htmlFor="login-username">Enter your Username or Email:</label>
                        <input type="text" id="login-username" name="username" placeholder="Username" required />
                        
                        <label htmlFor="login-password">Enter your Password:</label>
                        <input type="password" id="login-password" name="password" placeholder="Password" required />
                        
                        <button id="loginButton" type="submit">Log In</button>
                    </form>
                </div>

                <div id="divider"></div>

                {/* Register Form */}
                <div className={styles.register}>
                    <h2>Register</h2>
                    <form onSubmit={handleRegisterSubmit}>
                        <label htmlFor="register-username">Enter your Username:</label>
                        <input type="text" id="register-username" name="username" placeholder="Username" required />
                        
                        <label htmlFor="register-email">Enter your Email:</label>
                        <input type="email" id="register-email" name="email" placeholder="you@example.com" required />
                        
                        <label htmlFor="account-type">Account Type:</label>
                        <select name="account_type" id="account-type" required>
                            <option value="reviewer">Reviewer</option>
                            <option value="editor">Editor</option>
                            <option value="author">Author</option>
                        </select>
                        
                        <label htmlFor="register-password">Enter your Password:</label>
                        <input type="password" id="register-password" name="password" placeholder="Password" required />
                        
                        <button id="registerButton" type="submit">Create Account</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default loginPage;