import styles from './TabNav.module.css';

import TabHeader from './TabHeader';
import Submission from "./Submission";

import { useState } from 'react';

const AllActive = () => {

  const [ submissionList ] = useState(
    [
      {
        author: "Ben",
        title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
        stage: 4,
      },
      {
        author: "Bob",
        title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
        stage: 3,
      },
      {
        author: "Ban",
        title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
        stage: 2,
      },
      {
        author: "Bibi",
        title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
        stage: 1,
      }
    ]
  );


    const [filteredList, setFilteredList] = useState(submissionList);

    return (
         <div className = {styles.tab}>
                  <TabHeader tabHeader="All Active" submissionList = {submissionList} setFilteredList = {setFilteredList}/>

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

export default AllActive;