import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Gallery.module.css';

const Gallery = () => {
    const posters = [
        { id: 1, title: "AI in Healthcare", author: "Dr. Smith", img: 'poster1.jpeg' },
        { id: 2, title: "Marine Biology", author: "Dr. Johnson", img: 'poster2.jpeg' },
        { id: 3, title: "Urban Development", author: "Dr. Williams", img: 'poster3.jpeg' },
        { id: 4, title: "Quantum Computing", author: "Dr. Brown", img: 'poster4.jpeg' },
        { id: 5, title: "Climate Change", author: "Dr. Davis", img: 'poster5.jpeg' },
        { id: 6, title: "Neuroscience", author: "Dr. Wilson", img: 'poster6.jpeg' }
    ];

    return (
        <div className={styles.galleryContainer}>
            {/* Top Navigation */}
            <nav className={styles.topNav}>
                <Link to="/" className={styles.homeLink}>
                    <span className={styles.homeIcon}></span>
                    <span>Criminology Institute for Research and Training Repository</span>
                </Link>
                <div className={styles.searchContainer}>
                    <input 
                        type="text" 
                        placeholder="Search research posters..." 
                        className={styles.searchInput}
                    />
                </div>
            </nav>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <img 
                        src="/assets/utampa_logo.png" 
                        alt="UT Logo" 
                        className={styles.logo}
                    />
                </div>
                <nav className={styles.sidebarNav}>
                    <Link to="/browse" className={styles.navItem}>All Posters</Link>
                    <Link to="/submit" className={styles.navItem}>Submit Research</Link>
                    <Link to="/guides" className={styles.navItem}>Author Guidelines</Link>
                    <Link to="/contact" className={styles.navItem}>Research Support</Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <div className={styles.posterGrid}>
                    {posters.map(poster => (
                        <article key={poster.id} className={styles.posterCard}>
                            <img 
                                src={`/assets/posters/${poster.img}`} 
                                alt={poster.title} 
                                className={styles.posterImage}
                            />
                            <div className={styles.posterInfo}>
                                <h3>{poster.title}</h3>
                                <p className={styles.author}>{poster.author}</p>
                                <div className={styles.actions}>
                                    <button className={styles.pdfButton}>View Study</button>
                                    <button className={styles.detailsButton}>Abstract</button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Gallery;