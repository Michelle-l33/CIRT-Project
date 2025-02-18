
import styles from './SubmissionAuthor.module.css';
import { useState } from 'react';

const SubmissionAuthorPage = () => {

    const [document, setDocument] = useState(null);
    const [title, setTitle] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [submissionType, setSubmissionType] = useState("");
    const [stage, setStage]= useState("1");
    const [authorID, setAuthorID] = useState("");
    


    const handleFileChange = (e) => {
        setDocument(e.target.files[0]);
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const isPoster = submissionType === "poster";
        const isArticle = submissionType === "article";

        const formData = new FormData();
        formData.append("authorID", authorID); // Make sure authorID is included
        formData.append("title", title);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("document", document); // Use the document state here
        formData.append("isPoster", isPoster);
        formData.append("isArticle", isArticle);
        formData.append("stage", stage);


        try{
            const response = await fetch("http://localhost:8082/submission/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                window.alert("Uploaded successfully!");
                window.location.reload();
            } else {
                window.alert(data.error || "Something went wrong!");
                console.log(data.error);
            }
        } catch (error) {
            window.alert("Error: " + error.message);
        }
        }
    


    return (
        <div className={styles.bigContainer}>
            <div className={styles.pdfContainerLeft}>
                <div className={styles.fileUploadContainer}>
                    <h3>Submission Area</h3>
                    <form onSubmit = {handleSubmit}>
                        <ul>
                            <li><input type="text" placeholder="Submission Title" onChange={(e)=>setTitle(e.target.value)} required/></li>
                            <li><input type="text" placeholder="Author's First name/alias"onChange={(e)=>setFirstName(e.target.value)} required/></li>
                            <li><input type="text" placeholder="Author's Last name/alias" onChange={(e)=>setLastName(e.target.value)} required/></li>
                            <li>
                                <input type="radio" id="posterRadio" name="submissionType" value="poster" checked={submissionType === "poster"} onChange={(e) => setSubmissionType(e.target.value)} required />
                                <label htmlFor="posterRadio">Poster</label>
                            
                                <input type="radio" id="articleRadio" name="submissionType" value="article" checked={submissionType === "article"} onChange={(e) => setSubmissionType(e.target.value)} required/>
                                <label htmlFor="articleRadio">Article</label>
                            </li>
                            <li><input type="file" onChange={handleFileChange} /></li>
                        </ul>
                        {document && <p>Uploaded file: <span>{document.name}</span></p>}
                        <button type="submit" className={styles.submitButton}>
                            Submit
                        </button>
                    </form>
                    
                </div>
            </div>
        </div>
    );
};

export default SubmissionAuthorPage