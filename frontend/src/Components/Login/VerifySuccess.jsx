import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../HomePage/Footer/Footer';

const VerifySuccess = () => {
  return (
    <div>
      <NavBar />
      <div className={styles.successContainer}>
        <h2>Email Verified Successfully! 🎉</h2>
        <p>Your email address has been successfully verified.</p>
        <Link to="/login" className={styles.successLink}>
          Proceed to Login
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default VerifySuccess;