import styles from './TabNav.module.css';

import TabHeader from './TabHeader';
import Submission from "./Submission";
import { useSubmissions } from '../SubmissionRecord/SubmissionContext';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const AllActive = () => {

  // const [ submissionList ] = useState(
  //   [
  //     {
  //       author: "Ben",
  //       title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
  //       stage: 4,
  //     },
  //     {
  //       author: "Bob",
  //       title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
  //       stage: 3,
  //     },
  //     {
  //       author: "Ban",
  //       title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
  //       stage: 2,
  //     },
  //     {
  //       author: "Bibi",
  //       title: "shdfasg hvd dgvasgd gdasv ahsd dhavd sdhvasnd hajsgdh hsdvs",
  //       stage: 1,
  //     }
  //   ]
  // );
  const [submissionList, setSubmissionList] = useState([]);
  const [ filteredList, setFilteredList] = useState([]);

  useEffect(()=>{
    const fetchAllActive = async () => {
      try {
          const response = await fetch("http://localhost:8082/submission/unpublished",{
              method: "GET"
          })
          if (!response.ok) {
              throw new Error("Failed to fetch submissions");
          }
          
          const data = await response.json();
          setSubmissionList(data);
          
      } catch (error) {
          console.error("Error fetching submissions:", error);
      }
    };
    fetchAllActive();
    setFilteredList(submissionList);
  
  },[]);



    const navigate = useNavigate();
    const optionList = [
      {
        name: "View in Detail",
        function: () => navigate("/")
      },
    ]
    return (
         <div className = {styles.tab}>
                  <TabHeader tabHeader="All Active" submissionList = {submissionList} setFilteredList = {setFilteredList}/>

                  <ul className = {styles.submissionList}>
             
                      {filteredList.length > 0 ? (filteredList.map((submission, idx)=>
                      <li key = {submission._id||idx}>
                          <Submission submission = {submission} optionList = {optionList}/>
                      </li>
                    )) : (<span>No Submission Found</span>)}
                      
                  </ul>
                      
        </div>
    );
};

export default AllActive;