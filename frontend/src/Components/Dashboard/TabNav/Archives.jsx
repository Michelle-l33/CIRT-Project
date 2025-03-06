import styles from './TabNav.module.css';

import TabHeader from './TabHeader';

import Submission from "./Submission";

import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Archives = () => {

    const [ submissionList ] = useState([
        {
            author: "Ben",
            title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
            stage: 4,
        },
    ]);

    const [filteredList, setFilteredList] = useState(submissionList);


    const navigate = useNavigate();
    const optionList = [
      {
        name: "View in Detail",
        function: () => navigate("")
      },
    ]

    return (
         <div className = {styles.tab}>
                  <TabHeader tabHeader="Archives" submissionList = {submissionList} setFilteredList = {setFilteredList}/>

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

export default Archives;