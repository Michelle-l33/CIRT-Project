import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../HomePage/Footer/Footer';
import styles from './Login.module.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://cirt-project-server.vercel.app/user/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message);
                setError('');
            } else {
                setError(data.error);
                setMessage('');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setMessage('');
        }
    };

    return (
        <div>
            <NavBar isLoggedIn={false} />
            <div className={styles.accounts}>
                <div className={styles.login}>
                    <h2>Reset Password</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Enter your Email:</label>
                        <div className={styles.emailContainer}>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Send Reset Link</button>
                    </form>
                    {message && <div className={styles.alert}>{message}</div>}
                    {error && <div className={styles.error}>{error}</div>}
                    <p>
                        Remember your password?{' '}
                        <button className={styles.toggleFormButton} onClick={() => navigate('/login')}>
                            Login
                        </button>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForgotPassword;