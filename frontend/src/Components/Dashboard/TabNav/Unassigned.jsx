import styles from './TabNav.module.css';

import TabHeader from './TabHeader';

import Submission from "./Submission";

import { useState } from 'react';

import { useNavigate } from "react-router-dom";

const Unassigned = () => {

    const [ submissionList ] = useState([
        {
            firstName: "Ben",
            lastName: "Ben",
            title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
            stage: 4,
        },
    ]);

    const [filteredList, setFilteredList] = useState(submissionList);

    const navigate = useNavigate();

    const handleAssignEditor = () => {};
    const optionList = [
      {
        name: "View in Detail",
        function: () => navigate("")
      },
      {
        name: "Edit Submission",
        funtion: handleAssignEditor
      }
    ]

    return (
         <div className = {styles.tab}>
                  <TabHeader tabHeader="Unassigned" submissionList = {submissionList} setFilteredList = {setFilteredList}/>

                  <ul className = {styles.submissionList}>
             
                        {filteredList.length > 0 ? (filteredList.map((submission, idx)=>
                        <li key = {idx}>
                            <Submission submission = {submission} optionList = {optionList}/>
                        </li>
                        )) : (<span>No Submission Found</span>)}
                      
                  </ul>
                      
        </div>
    );
};

export default Unassigned;