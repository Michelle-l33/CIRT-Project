import styles from './TabNav.module.css';

import TabHeader from './TabHeader';

import Submission from "./Submission";

import { useState } from 'react';



const Unassigned = () => {

    const [ submissionList ] = useState([]);

    const [filteredList, setFilteredList] = useState(submissionList);

    return (
         <div className = {styles.tab}>
                  <TabHeader tabHeader="Unassigned" submissionList = {submissionList} setFilteredList = {setFilteredList}/>

                  <ul className = {styles.submissionList}>
             
                      {filteredList.map((submission, idx  )=>
                        <li key = {idx}>
                            <Submission submission = {submission}/>
                        </li>
                      )}
                      
                  </ul>
                      
        </div>
    );
};

export default Unassigned;