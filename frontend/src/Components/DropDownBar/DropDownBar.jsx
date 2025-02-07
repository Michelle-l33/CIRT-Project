import styles from './DropDownBar.module.css';
import { useState } from 'react';



const DropDownBar = ({dropDownList}) => {
    //javascript funcs go here
    const [visibleIndex, setVisibleIndex] = useState(null);

    const handleMouseEnter = (idx) => setVisibleIndex(idx);
    const handleMouseLeave = () => setVisibleIndex(null);

    function Label( { dropDownList }){
        const dropDowns =  dropDownList.map((dropDown, idx) => 
            <li key = {idx}
                className = {styles.dropDownContainer}
                onMouseEnter = { () => handleMouseEnter(idx)}
                onMouseLeave = {handleMouseLeave}>

                <label htmlFor = {`dropDown${idx}`}>{dropDown.label}</label>
                <div className = {styles.theDropDown} id = {`dropDown${idx}`} style = {{ display: visibleIndex === idx ? 'flex':'none'}}>
                    {dropDown.listOfDropDown.map((option, optionIdx) => {
                        return <a key = {optionIdx} href = {option.url}>{option.label}</a>
                    })}
                </div>
            </li>
        );
    
        return dropDowns;
    }

    return( // html goes in the return()
        <ul className = {styles.bigDropDownContainer}>
            <Label dropDownList = {dropDownList}/>
        </ul>
    );
};


export default DropDownBar; //make sure to export the function