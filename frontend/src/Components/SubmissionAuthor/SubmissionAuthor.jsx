
import styles from './SubmissionAuthor.module.css';
import { useState } from 'react';

const SubmissionAuthorPage = () => {

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className={styles.bigContainer}>
            <div className={styles.pdfContainerLeft}>
                <div className={styles.fileUploadContainer}>
                    <h3>Submission Area</h3>
                    <ul>
                        <li><input type="text" placeholder="Submission Title"/></li>
                        <li><input type="text" placeholder="Author's name/alias"/></li>
                        <li>
                            <input type="radio" id="posterRadio"/>
                            <label htmlFor="posterRadio">Poster</label>
                        
                            <input type="radio" id="articleRadio"/>
                            <label htmlFor="articleRadio">Article</label>
                        </li>
                        <li><input type="file" onChange={handleFileChange} /></li>
                    </ul>
                    {file && <p>Uploaded file: <span>{file.name}</span></p>}
                </div>
            </div>
        </div>
    );
};

export default SubmissionAuthorPage