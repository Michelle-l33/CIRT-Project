import React, { useState } from "react";
import styles from "./CollaboratorsInput.module.css";

const CollaboratorsInput = ({ collaborators, setCollaborators }) => {
    const [inputValue, setInputValue] = useState("");

    // Handle input change
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    // Handle key press (Enter or Comma to add name)
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addCollaborator();
        }
    };

    // Add collaborator to list
    const addCollaborator = () => {
        const name = inputValue.trim();
        if (name && !collaborators.includes(name)) {
            setCollaborators([...collaborators, name]);
        }
        setInputValue(""); // Clear input field
    };

    // Remove collaborator from list
    const removeCollaborator = (index) => {
        setCollaborators(collaborators.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.chipContainer}>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Collaborators ( , or enter)"
                    className={styles.input}
                />
            </div>
                {collaborators.map((name, index) => (
                    <div key={index} className={styles.chip}>
                        {name}
                        <button className={styles.removeButton} onClick={() => removeCollaborator(index)}>×</button>
                    </div>
                ))}
        </div>
    );
};

export default CollaboratorsInput;