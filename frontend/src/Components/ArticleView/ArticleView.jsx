import NavBar from '../NavBar/NavBar';
import styles from './ArticleView.module.css';
import { useState } from 'react';


const ArticleViewPage = () => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const handleAddComment = () => {
        if (comment.trim()) {
            setComments([...comments, comment]);
            setComment('');
        }
    };

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

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