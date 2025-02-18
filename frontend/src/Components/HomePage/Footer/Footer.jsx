    import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt} from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>

                {/*Contact Info*/}
                <div className={styles.contactInfo}>
                    <h3>Contact Us</h3>
                    <p><FaMapMarkerAlt />404 W Kennedy St, Tampa, Fl</p>
                    <p><FaPhone/> (813) 360-5544</p>
                    <p><FaEnvelope /> contact@cirt.org</p>
                </div>

                {/*Social Media Icons */}
                <div className={styles.socialIcons}>
                    <h3>Follow Us</h3>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                
                </div>

                {/*Copyright section*/}
                <div className={styles.copyright}>
                    <p>&copy; {new Date().getFullYear()} Criminology Institute for Research and Training (CIRT). All Rights Reserved.</p>
                </div>
            </div>
        </footer>
        );
    };
export default Footer;

                    
    
