import styles from './TabNav.module.css';

import Submission from "./Submission";
import TabHeader from './TabHeader';
import { useState } from 'react';

const MyQueue = () => {

    const [ submissionList ] = useState(
      [
        {
          id: 101,
          author: "Ben",
          title: "1shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 1,
        },
        { 
          id: 102,
          author: "Bob",
          title: "2shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 2,
        },
        {
          id: 103,
          author: "Ban",
          title: "3shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 3,
        },
        {
          id: 104,
          author: "Bibi",
          title: "4shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 4,
        },
        {
          id: 105,
          author: "Bibi",
          title: "5shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 4,
        },
        {
          id: 106,
          author: "Bibi",
          title: "6shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 1,
        },
        {
          id: 107,
          author: "Bibi",
          title: "7shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 4,
        },
        {
          id: 108,
          author: "Bibi",
          title: "8shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 3,
        },
        {
          id: 109,
          author: "Bibi",
          title: "9shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 2,
        },
        {
          id: 110,
          author: "Bibi",
          title: "4shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 4,
        },
        {
          id: 111,
          author: "Bibi",
          title: "7shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
          stage: 3,
        },
      ]
    );


    const [filteredList, setFilteredList] = useState(submissionList);


    return (

          <div className = {styles.tab}>
            <TabHeader tabHeader="My Asssigned" submissionList = {submissionList} setFilteredList = {setFilteredList}/>

            <ul className = {styles.submissionList}>
              
                {filteredList.length > 0 ? (filteredList.map((submission)=>
                  <li key = {submission.id}>
                      <Submission submission = {submission}/>
                  </li>
                )) : (<span>No Submission Found</span>)}
                
            </ul>
          </div>

    );
};

export default MyQueue;