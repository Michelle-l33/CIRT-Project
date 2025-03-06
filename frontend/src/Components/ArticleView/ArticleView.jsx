import NavBar from '../NavBar/NavBar';
import styles from './ArticleView.module.css';
import { useState } from 'react';


const ArticleViewPage = () => {

    return (
        <div className={styles.bigContainer}>
            <NavBar/>
            <main>
                <div className={styles.title}>
                    Climate Change and Global Security
                </div>
                <section className={styles.pdfWrapper}>PDF Viewer</section>
            </main>
        </div>

    );
};

export default ArticleViewPage