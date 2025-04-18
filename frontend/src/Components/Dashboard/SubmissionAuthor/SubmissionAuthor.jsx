
import styles from './SubmissionAuthor.module.css';
import { useState } from 'react';
import {useUser} from '../../Login/UserContext';
import Cookies from 'js-cookie';
import ChipInput from '../ChipInput/ChipInput';

const SubmissionAuthorPage = () => {

    const [document, setDocument] = useState(null);
    const [title, setTitle] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [collaborators, setCollaborators] = useState([]); // Convernt into array
    const [tags, setTags] = useState([]); // Convernt into array
    const [submissionType, setSubmissionType] = useState("");
    const [stage, setStage]= useState("1");
    const [authorID, setAuthorID] = useState("");
    const [placeholderInput, setPlaceholderInput] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const [abstract, setAbstract] = useState("");
    const {user} = useUser();
    const predefinedTags = [
        "Corrections", "Courts/Sentencing", "White Collar Crime", "Mental Health",
        "Victimology", "Criminal Theory", "Statistics/Methodology",
        "Policing", "Crime Prevention", "Policy"
      ];
    const [selectedTags, setSelectedTags] = useState([]);


    const handleFileChange = (e) => {
        setDocument(e.target.files[0]);
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if (!document) {
            return window.alert("Please upload a file.");
        }
        

        setLoading(true);

        const isPoster = submissionType === "poster";
        const isArticle = submissionType === "article";

        const authorID = user._id;
        console.log("sdijwoij ", authorID);
        if (!authorID){
            return window.alert("You must be logged in to submit an article.");
        } 
        const allTags = [...new Set([...tags, ...selectedTags])];
        const formData = new FormData();
        formData.append("authorID", authorID); // Make sure authorID is included
        formData.append("title", title);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        collaborators.forEach((c) => formData.append("collaborators[]", c));
        formData.append("document", document); // Use the document state here
        formData.append("isPoster", isPoster);
        formData.append("isArticle", isArticle);
        formData.append("abstract",abstract);
        allTags.forEach((tag) => formData.append("tags[]", tag));
        formData.append("stage", stage);
        formData.append("placeholderInput", placeholderInput); // Conditional Input


        try{
            const response = await fetch("https://cirt-project-server.vercel.app/submission/upload", {
                method: "POST",
                body: formData,
                credentials: 'include',
                mode: 'cors',
                
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
        } finally {
            setLoading(false);
        }
        }
    


    return (
        <div className={styles.bigContainer}>
            <form className={styles.form} onSubmit = {handleSubmit}>
                <h1>Submission Area</h1>
                <div className={styles.boxInput}>
                    <input type="text" onChange={(e)=>setTitle(e.target.value)} maxLength={100} required placeholder="Title"/>
                </div>
                <div className={styles.boxInput}>
                    <input type="text" onChange={(e)=>setFirstName(e.target.value)} maxLength={100} required placeholder="First/alias"/>
                </div>
                <div className={styles.boxInput}>
                    <input type="text" onChange={(e)=>setLastName(e.target.value)} maxLength={100} required placeholder="Last/alias"/>
                </div>
                <div className={styles.boxInput}>
                    Collaborators
                    <ChipInput chip={collaborators} setChip={setCollaborators} />
                </div>
                <div className={styles.boxInput}>
                    Tags
                    <ChipInput chip={tags} setChip={setTags} />
                    <div className={styles.tagGrid}>
                        {predefinedTags.map((tag) => (
                        <button
                            key={tag}
                            type="button"
                            className={`${styles.tagButton} ${selectedTags.includes(tag) ? styles.selected : ""}`}
                            onClick={() => {
                            setSelectedTags((prev) =>
                                prev.includes(tag)
                                ? prev.filter((t) => t !== tag)
                                : [...prev, tag]
                            );
                            }}
                        >
                            {tag}
                        </button>
                        ))}
                    </div>
                </div>
                <div className={styles.radioInput}>
                    <input type="radio" id="articleRadio" name="submissionType" value="article"
                        checked={submissionType === "article"}
                        onChange={(e) => setSubmissionType(e.target.value)}
                        required />
                    <label htmlFor="articleRadio">Article</label>
                    <input type="radio" id="posterRadio" name="submissionType" value="poster"
                        checked={submissionType === "poster"}
                        onChange={(e) => setSubmissionType(e.target.value)}
                        required />
                    <label htmlFor="posterRadio">Poster</label>
                </div>

                {/* Conditional Input */}
                {submissionType === "article" && (
                    <div className={styles.boxInput}>
                        <textarea className={styles.abstractInput} value={abstract} maxLength={1000} onChange={(e) => setAbstract(e.target.value)} placeholder="Abstract" />
                    </div>
                )}
                {submissionType === "poster" && (
                    <div className={styles.boxInput}>
                        <textarea className={styles.posterDescription} value={abstract} maxLength={1000} onChange={(e) => setAbstract(e.target.value)} placeholder="Description of poster" />
                    </div>
                )}

                <div className={styles.uploadInput}><input type="file" accept="application/pdf" onChange={handleFileChange} /></div>
                {document && <p>Uploaded file: <span>{document.name}</span></p>}
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </div>
    );
};

export default SubmissionAuthorPage