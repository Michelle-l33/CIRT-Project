import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../HomePage/Footer/Footer';

const TokenError = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleResend = async () => {
    try {
      const response = await fetch('https://cirt-project-server.vercel.app/user/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      if (response.ok) {
        alert('Verification email resent! Check your inbox.');
        navigate('/login');
      } else {
        alert(data.error || 'Error resending verification email');
      }
    } catch (error) {
      alert('Error resending verification email');
    }
  };

  return (
    <div>
      <NavBar />
      <div className={styles.errorContainer}>
        <h2>Verification Link Expired ⏰</h2>
        <p>The verification link has expired. Please enter your email to receive a new one.</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.resendInput}
        />
        <button onClick={handleResend} className={styles.resendButton}>
          Resend Verification Email
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default TokenError;