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


const loginPage=() => {

    return (
        <div className={styles.container}>
            {/* <div className={styles.loginNavBar}>
                <NavBar isLoggedIn = {true}/>
                <DropDownBar dropDownList = {dropDownList}/>
            </div> */}
            <div className={styles.accounts}>
                <div className={styles.login}>
                    <h2>Login</h2>
                    <ul>
                        <li>Enter your Username or Email:</li>
                        <li><input type="text" placeholder=" Username"/></li>
                        <li>Enter your Password:</li>
                        <li><input type="password" placeholder=" Password"/></li>
                        <li><button id="loginButton" type="button">Log In</button></li>
                    </ul>
                    
                </div>

                <div id="divider"></div>

                <div className= {styles.register}>
                    <h2>Register</h2>
                    <ul>
                        <li>Enter your Username:</li>
                        <li><input type="text" placeholder=" Username"/></li>
                        <li>Enter your Email:</li>
                        <li><input type="text" placeholder=" deez@nuts.com"/></li>
                        <li>Account type:</li>
                        <li>
                            <select name="account_type" id="">
                                <option value="reviewer">Reviewer</option>
                                <option value="editor">Editor</option>
                                <option value="author">Author</option>
                            </select>
                        </li>
                        <li>Enter your Password:</li>
                        <li><input type="password" placeholder=" Password"/></li>
                        <li><button id="registerButton" type="button">Create Account</button></li>
                    </ul>
                </div>
            </div>
            
    </div>
    );
};

export default loginPage;