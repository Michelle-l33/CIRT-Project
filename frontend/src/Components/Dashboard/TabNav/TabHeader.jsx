import styles from './TabNav.module.css';

import { useState, useEffect, useRef, useCallback } from 'react';
import { BsSearchHeart } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";


const TabHeader = ( { tabHeader, submissionList, setFilteredList } ) => {

    const categories = ["Submitted", "Under Review", "Reviewed", "Accepted"];

    const [selectedCategory, setSelectedCategory] = useState([]);

    const [search, setSearch] = useState("");

    const categoryMapping = {
        "Submitted": 1,
        "Under Review": 2,
        "Reviewed": 3,
        "Accepted": 4
    };

    useEffect(() => {
        let filteredResults = submissionList;

        // Apply category filter
        if (selectedCategory.length > 0) {
            const selectedStages = selectedCategory.map((category) => categoryMapping[category]);
            filteredResults = filteredResults.filter(submission =>
                selectedStages.includes(submission.stage)
            );
        }

        // Apply search filter
        if (search) {
            filteredResults = filteredResults.filter(submission =>
                submission.author.toLowerCase().includes(search.toLowerCase()) ||
                submission.title.toLowerCase().includes(search.toLowerCase()));
        }

        // Set the filtered list
        setFilteredList(filteredResults);
    }, [search, selectedCategory, submissionList]);
    
    return (
        <div className = {styles.tabHeader}>
              <h3>{tabHeader}</h3>

              <div className = {styles.left}>

                {/* tabSearchBar component is defined down below */}
                <TabSearchBar search = {search} setSearch = {setSearch}/>
                {/* FilterButton component is defined down below */}
                <FilterButton categories = {categories} selectedCategory = {selectedCategory} setSelectedCategory = {setSelectedCategory}/>
                <button >New Submission</button>  

            </div>
        </div>
    );
 };

 export default TabHeader;




const TabSearchBar = ({search, setSearch}) => {

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    return(
    <form onSubmit = {(event) => event.preventDefault()}>
        <div className = {styles.formInput}>
            <input  type = "search" 
                    id = 'tabSearchBox'
                    placeholder = "Search"
                    value = {search}
                    onChange = {handleSearchChange}></input>
            <button type = "submit" ><BsSearchHeart /></button>
        </div>
    </form>
    );
};


const FilterButton = ({ categories, selectedCategory, setSelectedCategory}) => {

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


    // this part is for getting checkbox
    const handleCheck = (option) => {
        const updatedCheckboxes = selectedCategory.includes(option) ?
        selectedCategory.filter((category) => category !== option)
            : [...selectedCategory, option];

        setSelectedCategory(updatedCheckboxes);
        // filterProducts(updatedCheckboxes);
    }



    return (
        <>
        <button ref = {buttonRef} onClick = {() => setFilterOpen(!filterOpen)}><FiFilter /> Filters</button>
        <div ref = {dropdownRef} className={styles.filterDropdown}>
                        <div className = {`${styles.submissionOption} ${filterOpen ? styles.show : ''}`}>
                            {categories.map((option, idx) => (
                                <div className={styles.option} >
                                    <input
                                        className= {styles.formCheck}
                                        type="checkbox"
                                        checked={selectedCategory.includes(option)}
                                        onChange = {() => handleCheck(option)}
                                        id = {`filter${idx}`}
                                    />
                                    <label className={styles.formCheckLabel} htmlFor={`filter${idx}`}>
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
        </div>
        </>
    );
};

