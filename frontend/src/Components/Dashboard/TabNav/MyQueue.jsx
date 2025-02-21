import styles from './TabNav.module.css';

import Submission from "./Submission";
import TabHeader from './TabHeader';
import { useState } from 'react';

const MyQueue = () => {

    const [ submissionList ] = useState(
      [
        {
          author: "Ben",
          title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 1,
        },
        {
          author: "Bob",
          title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 2,
        },
        {
          author: "Ban",
          title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 3,
        },
        {
          author: "Bibi",
          title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 4,
        },
        {
          author: "Bibi",
          title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 4,
        },
        {
          author: "Bibi",
          title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 1,
        },
        {
          author: "Bibi",
          title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 4,
        },
        {
          author: "Bibi",
          title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 3,
        },
        {
          author: "Bibi",
          title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 2,
        },
        {
          author: "Bibi",
          title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 4,
        },
        {
          author: "Bibi",
          title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 3,
        },
      ]
    );


    const [filteredList, setFilteredList] = useState(submissionList);

    return (

          <div className = {styles.tab}>
            <TabHeader tabHeader="My Asssigned" submissionList = {submissionList} setFilteredList = {setFilteredList}/>

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

export default MyQueue;