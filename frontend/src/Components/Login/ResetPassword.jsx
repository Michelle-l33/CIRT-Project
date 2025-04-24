import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../HomePage/Footer/Footer';
import styles from './Login.module.css';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://cirt-project-server.vercel.app/user/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword }) // Ensure no typos here
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Password reset failed');
            }

            const data = await response.json();
            setMessage(data.message);
            setError('');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
            setMessage('');
        }
    };

    return (
        <div>
            <NavBar isLoggedIn={false} />
            <div className={styles.accounts}>
                <div className={styles.login}>
                    <h2>Set New Password</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="newPassword">New Password:</label>
                        <div className={styles.passwordContainer}>
                            <input
                                type="password"
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Reset Password</button>
                    </form>
                    {message && <div className={styles.alert}>{message}</div>}
                    {error && <div className={styles.error}>{error}</div>}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ResetPassword;