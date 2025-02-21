import styles from './TabNav.module.css';

import { useState, useEffect, useRef, useCallback } from 'react';
import { BsSearchHeart } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";



const TabHeader = ( { tabHeader, submissionList, setFilteredList } ) => {

    const categories = ["Submitted", "Under Review", "Reviewed", "Accepted"];

    return (
        <div className = {styles.tabHeader}>
              <h3>{tabHeader}</h3>

              <div className = {styles.left}>
                <form>
                    <div className = {styles.formInput}>
                        <input type = "search" placeholder = "Search"></input>
                        <button><BsSearchHeart /></button>
                    </div>
                </form>

                <FilterButton categories = {categories} submissionList = {submissionList} setFilteredList = {setFilteredList}/>
                <button>New Submission</button>  

            </div>
        </div>
    );
 };

 export default TabHeader;





// codes from handling Filtering logics taken from https://stackoverflow.com/questions/74584926/filtering-with-checkboxes-in-react
const FilterButton = ({ categories, submissionList, setFilteredList }) => {
    // this part is for controlling the filter open or not
    const [ filterOpen, setFilterOpen ] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    
    const handleClickOutside = useCallback((event) => {
        const isDropdownClicked = dropdownRef.current && dropdownRef.current.contains(event.target);
        const isButtonClicked = buttonRef.current && buttonRef.current.contains(event.target);

        if (isDropdownClicked || isButtonClicked) {
            // If the ref is not defined or the user clicked on these two, we don’t do anything.
            return;
        }

        setFilterOpen(false);
        }, [buttonRef, dropdownRef])

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
        document.removeEventListener("click", handleClickOutside);
        };
    }, [handleClickOutside]);




    // this part is for filtering the submissionList with the checkbox
    const categoryMapping = {
        "Submitted": 1,
        "Under Review": 2,
        "Reviewed": 3,
        "Accepted": 4
    };

    const [ selectedCheckboxes, setSelectedCheckboxes ] = useState([]);

    const filterProducts = (categories) => {
        const selectedStages = categories.map((category) => categoryMapping[category]);
        setFilteredList(submissionList.filter((submission) => 
            categories.length === 0 || selectedStages.includes(submission.stage)
        ));
    }

    const handleCheck = (option) => {
        const updatedCheckboxes = selectedCheckboxes.includes(option) ?
            selectedCheckboxes.filter((category) => category !== option)
            : [...selectedCheckboxes, option];

        setSelectedCheckboxes(updatedCheckboxes);
        filterProducts(updatedCheckboxes);
    }

    return (
        <>
        <button ref = {buttonRef} onClick = {() => setFilterOpen(!filterOpen)}><FiFilter /> Filters</button>
        <div ref = {dropdownRef} className={styles.filterDropdown}>
                        <div className = {`${styles.submissionOption} ${filterOpen ? styles.show : ''}`}>
                            {categories.map((option, idx) => (
                                <div className="option" id = {`filter${idx}`}>
                                    <input
                                        className="formCheck"
                                        type="checkbox"
                                        checked={selectedCheckboxes.includes(option)}
                                        onChange = {() => handleCheck(option)}
                                    />
                                    <label className="formCheckLabel" htmlFor={`filter${idx}`}>
                                            {option}
                                    </label>
                                </div>
                            ))}
                        </div>
        </div>
        </>
    );
};
