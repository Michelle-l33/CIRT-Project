import NavBar from '../NavBar/NavBar';
import Footer from '../HomePage/Footer/Footer';
import React, { useState } from "react";
import styles from './Login.module.css';
import Cookies from 'js-cookie';
import { useUser } from "./UserContext";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { handleLogout } = useUser();
    const { user, setUser } = useUser();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [isAuthor, setIsAuthor] = useState(true);
    const [isEditor, setIsEditor] = useState(false);
    const [isReviewer, setIsReviewer] = useState(false);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPass] = useState("");
    const [alertMessage, setAlertMessage] = useState('');
    const [showPasswordRegister, setShowPasswordRegister] = useState(false);
    const [showPasswordLogin, setShowPasswordLogin] = useState(false);
    const [toggleCardVisibility, setToggleCardVisibility] = useState(false);
    const [togglePassWordRequirementsVisibility, setTogglePassWordRequirementsVisibility] = useState(false);
    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
    const navigate = useNavigate();

    const [passwordRequirements, setPasswordRequirements] = useState({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });

    const validatePassword = (password) => {
        setPasswordRequirements({
            minLength: password.length >= 8,
            hasUppercase: /[A-Z]/.test(password),
            hasLowercase: /[a-z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const userData = { email: loginEmail, password: loginPassword };

        try {
            const response = await fetch("https://cirt-project-server.vercel.app/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
                mode: 'cors',
            });

            const data = await response.json();

            if (response.ok) {
                Cookies.set('userID', data._id, { expires: 7, path: '/' });
                setAlertMessage("Login Successful!");
                setTimeout(() => setAlertMessage(''), 3000);
                window.location.href = "/Dashboard";
            } else {
                window.alert("Invalid Credentials. Please Try Again!");
                console.log(data.error);
            }
        } catch (error) {
            window.alert("Error!!!");
            console.log(error.message);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const allRequirementsMet = Object.values(passwordRequirements).every(req => req);

        if (!allRequirementsMet) {
            window.alert("Please ensure your password meets all requirements.");
            return;
        }

        const userData = { 
            name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
            email, password, isPublic, isAuthor, isEditor, isReviewer 
        };

        try {
            const response = await fetch("https://cirt-project-server.vercel.app/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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

    const togglePasswordVisibilityRegister = () => {
        setShowPasswordRegister(!showPasswordRegister);
    };
    
    const togglePasswordVisibilityLogin = () => {
        setShowPasswordLogin(!showPasswordLogin);
    };

    const toggleFormVisibility = () => {
        setToggleCardVisibility(prev => !prev);
    };

    return (
        <div>
            <header>
                <NavBar />
            </header>

            {alertMessage && (
                <div className={styles.alert}>
                    {alertMessage}
                </div>
            )}

            <div className={styles.accounts}>
                <div className={styles.formWrapper}>

                    {/* Login Form */}
                    <div className={`${styles.login} ${toggleCardVisibility ? styles.hidden : ''}`}>
                        <form onSubmit={handleLoginSubmit}>
                            <label htmlFor="login-email">Enter your Email:</label>
                            <div className={styles.emailContainer}>
                                <input
                                    type="text"
                                    id="login-email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    maxLength={50}
                                    required
                                />
                            </div>

                            <label htmlFor="login-password">Enter your Password:</label>
                            <div className={styles.passwordContainer}>
                                <input
                                    type={showPasswordLogin ? "text" : "password"}
                                    id="login-password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={(e) => setLoginPass(e.target.value)}
                                    maxLength={25}
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.togglePasswordButton}
                                    onClick={togglePasswordVisibilityLogin}
                                >
                                    {showPasswordLogin ? <PiEyeBold size={20}/> : <PiEyeClosedBold size={20}/>}
                                </button>
                            </div>

                            <button type="submit">Log In</button>

                            <p className={styles.forgotPassword}>
                                <a href="/forgot-password">Forgot Password?</a>
                            </p>
                        </form>
                    </div>

                    {/* Register Form */}
                    <div className={`${styles.register} ${!toggleCardVisibility ? styles.hidden : ''}`}>
                        <form onSubmit={handleRegisterSubmit}>
                            <label htmlFor="register-username">Enter your Username:</label>
                            <div className={styles.emailContainer}>
                                <input
                                    type="text"
                                    id="register-username"
                                    name="username"
                                    placeholder="Username"
                                    onChange={(e) => setName(e.target.value)}
                                    maxLength={50}
                                    required
                                />
                            </div>

                            <label htmlFor="register-email">Enter your Email:</label>
                            <div className={styles.emailContainer}>
                                <input
                                    type="email"
                                    id="register-email"
                                    name="email"
                                    placeholder="you@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    maxLength={50}
                                    required
                                />
                            </div>

                            <label htmlFor="register-password">Enter your Password:</label>
                            <div className={styles.passwordContainer}>
                                <input
                                    type={showPasswordRegister ? "text" : "password"}
                                    id="register-password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        validatePassword(e.target.value);
                                    }}
                                    onFocus={() => setShowPasswordRequirements(true)}
                                    onBlur={() => setShowPasswordRequirements(false)}
                                    maxLength={25}
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.togglePasswordButton}
                                    onClick={togglePasswordVisibilityRegister}
                                >
                                    {showPasswordRegister ? <PiEyeBold size={20}/> : <PiEyeClosedBold size={20}/>}
                                </button>
                            </div>

                            <button type="submit">Create Account</button>
                        </form>
                    </div>

                    {/* Toggle Card */}
                    <div className={`${styles.toggleCardContainer} ${toggleCardVisibility ? styles.active : ''}`}>
                    {toggleCardVisibility ? (
                        showPasswordRequirements ? (
                        // Password Requirements List
                        <div className={styles.passwordRequirements}>
                            <h3>Password Requirements:</h3>
                            <ul>
                            <li style={{ color: passwordRequirements.minLength ? 'green' : '#c1121f' }}>
                                At least 8 characters long
                            </li>
                            <li style={{ color: passwordRequirements.hasUppercase ? 'green' : '#c1121f' }}>
                                At least one uppercase letter
                            </li>
                            <li style={{ color: passwordRequirements.hasLowercase ? 'green' : '#c1121f' }}>
                                At least one lowercase letter
                            </li>
                            <li style={{ color: passwordRequirements.hasNumber ? 'green' : '#c1121f' }}>
                                At least one number
                            </li>
                            <li style={{ color: passwordRequirements.hasSpecialChar ? 'green' : '#c1121f' }}>
                                At least one special character
                            </li>
                            </ul>
                        </div>
                        ) : (
                        <div className={styles.toggleText}>
                            <h1>Hey There!</h1>
                            <p>Welcome to CIRT! Already have an account?</p>
                            <button
                            type="button"
                            onClick={toggleFormVisibility}
                            className={styles.toggleFormButton}
                            >
                            Log In
                            </button>
                        </div>
                    )) : (
                        <div className={styles.toggleText}>
                        <h1>Welcome Back!</h1>
                        <p>Don't have an account yet?</p>
                        <button
                            type="button"
                            onClick={toggleFormVisibility}
                            className={styles.toggleFormButton}
                        >
                            Register
                        </button>
                        </div>
                    )}
                    </div>

                </div>
            </div>

            <footer className={styles.footer}>
                <Footer />
            </footer>
        </div>
    );
};

export default LoginPage;
