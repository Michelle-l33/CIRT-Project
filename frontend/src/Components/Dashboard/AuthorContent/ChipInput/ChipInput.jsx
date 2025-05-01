import React, { useState } from "react";
import styles from "./ChipInput.module.css";

const ChipInput = ({ chip = [], setChip = () => {} }) => { // Default chip to an empty array
    const [inputValue, setInputValue] = useState("");


    // Handle input change
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    // Handle key press (Enter or Comma to add name)
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addChip();
        }
    };

    const formatChip = (text) => {
        return text
            .toLowerCase() // Convert everything to lowercase
            .replace(/\b\w/g, (char) => char.toUpperCase()); //Regex is so OP
    };
    
    const addChip = () => {
        const name = formatChip(inputValue.trim()); // Format input
        if (name && !chip.includes(name)) {
            setChip([...chip, name]);
        }
        setInputValue(""); // Clear input field
    };
    

    // Remove chip from list
    const removeChip = (index) => {
        setChip(chip.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.chipContainer}>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Hit Enter to Add"
                    className={styles.input}
                    maxLength={60}
                />
            </div>
            {(chip || []).map((name, index) => ( // Added fallback to prevent errors
                <div key={index} className={styles.chip}>
                    {name}
                    <button className={styles.removeButton} onClick={() => removeChip(index)}>×</button>
                </div>
            ))}
        </div>
    );
};

export default ChipInput;
