// This file merges the functionality and UI structure of both LoginPage versions into one clean component.

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
    const [formVisibility, setFormVisibility] = useState(true);
    const [resendEmail, setResendEmail] = useState("");
    const [showResendVerification, setShowResendVerification] = useState(false);
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
                if (data.error === 'Email not verified') {
                    setShowResendVerification(true);
                    window.alert("Please verify your email first. Check your inbox.");
                } else {
                    window.alert(data.error || "Login failed. Please try again.");
                }
            }
        } catch (error) {
            window.alert("Error!!!");
            console.log(error.message);
        }
    };

    const handleResendVerification = async () => {
        try {
            const response = await fetch('https://cirt-project-server.vercel.app/user/resend-verification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: resendEmail })
            });

            const data = await response.json();
            if (response.ok) {
                window.alert('Verification email resent! Check your inbox.');
                setShowResendVerification(false);
            } else {
                window.alert(data.error || 'Error resending verification email');
            }
        } catch (error) {
            window.alert('Error resending verification email');
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
                window.alert("Registration successful! Please check your email to verify your account.");
                window.location.reload();
            } else {
                window.alert(data.error || "Something went wrong!");
                console.log(data.error);
            }
        } catch (error) {
            window.alert("Error: " + error.message);
        }
    };

    return (
        <div>
            <header>
                <NavBar />
            </header>

            {alertMessage && <div className={styles.alert}>{alertMessage}</div>}

            <div className={styles.accounts}>
                {formVisibility ? (
                    <div className={styles.login}>
                        <h2>Login</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <label htmlFor="login-email">Enter your Email:</label>
                            <input type="text" id="login-email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />

                            <label htmlFor="login-password">Enter your Password:</label>
                            <div className={styles.passwordContainer}>
                                <input type={showPasswordLogin ? "text" : "password"} id="login-password" value={loginPassword} onChange={(e) => setLoginPass(e.target.value)} required />
                                <button type="button" onClick={() => setShowPasswordLogin(!showPasswordLogin)}>
                                    {showPasswordLogin ? <PiEyeBold size={20} /> : <PiEyeClosedBold size={20} />}
                                </button>
                            </div>

                            <button type="submit">Log In</button>
                            <p><a href="/forgot-password">Forgot Password?</a></p>

                            {showResendVerification && (
                                <div>
                                    <p>Didn't receive the email?</p>
                                    <input type="email" value={resendEmail} onChange={(e) => setResendEmail(e.target.value)} />
                                    <button onClick={handleResendVerification}>Resend Verification Email</button>
                                </div>
                            )}
                        </form>
                        <p>Don't have an account? <button onClick={() => setFormVisibility(false)}>Create Account</button></p>
                    </div>
                ) : (
                    <div className={styles.register}>
                        <h2>Register</h2>
                        <form onSubmit={handleRegisterSubmit}>
                            <label htmlFor="register-username">Username:</label>
                            <input type="text" id="register-username" value={name} onChange={(e) => setName(e.target.value)} required />

                            <label htmlFor="register-email">Email:</label>
                            <input type="email" id="register-email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                            <label htmlFor="register-password">Password:</label>
                            <div className={styles.passwordContainer}>
                                <input type={showPasswordRegister ? "text" : "password"} id="register-password" value={password} onChange={(e) => { setPassword(e.target.value); validatePassword(e.target.value); }} required />
                                <button type="button" onClick={() => setShowPasswordRegister(!showPasswordRegister)}>
                                    {showPasswordRegister ? <PiEyeBold size={20} /> : <PiEyeClosedBold size={20} />}
                                </button>
                            </div>

                            <div className={styles.passwordRequirements}>
                                <ul>
                                    <li style={{ color: passwordRequirements.minLength ? 'green' : 'red' }}>At least 8 characters</li>
                                    <li style={{ color: passwordRequirements.hasUppercase ? 'green' : 'red' }}>One uppercase letter</li>
                                    <li style={{ color: passwordRequirements.hasLowercase ? 'green' : 'red' }}>One lowercase letter</li>
                                    <li style={{ color: passwordRequirements.hasNumber ? 'green' : 'red' }}>One number</li>
                                    <li style={{ color: passwordRequirements.hasSpecialChar ? 'green' : 'red' }}>One special character</li>
                                </ul>
                            </div>

                            <button type="submit">Create Account</button>
                        </form>
                        <p>Already have an account? <button onClick={() => setFormVisibility(true)}>Login</button></p>
                    </div>
                )}
            </div>

            <footer className={styles.footer}>
                <Footer />
            </footer>
        </div>
    );
};

export default LoginPage;
