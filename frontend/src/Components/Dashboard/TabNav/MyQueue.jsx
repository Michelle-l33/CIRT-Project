import styles from './TabNav.module.css';

import Submission from "./Submission";
import TabHeader from './TabHeader';
import { useState, useEffect } from 'react';
import {useUser} from '../../Login/UserContext';
import { useNavigate } from "react-router-dom";


const MyQueue = () => {
    const {user} = useUser();
    const [submissionList, setSubmissionList] = useState([]);


    const fetchEditorAssignments = async () =>{
      try{
        const response = await fetch(`http://localhost:8082/submission/myQueue/${user.id}`,{
          method:"GET"
        }
          
        )
        if (!response.ok){
          throw new Error("Failed to fetch editor assigned submissions");
        }
        const data = await response.json();
        setSubmissionList(data);

      }
      catch (error) {
        console.error("Error fetching submissions:", error);
      }
    }

    const [filteredList, setFilteredList] = useState(submissionList);

    const navigate = useNavigate();
    const optionList = [
      {
        name: "View in Detail",
        function: () => navigate=("")
      },
    ]

    return (

          <div className = {styles.tab}>
            <TabHeader tabHeader="My Asssigned" submissionList = {submissionList} setFilteredList = {setFilteredList}/>

            <ul className = {styles.submissionList}>
              
                {filteredList.length > 0 ? (filteredList.map((submission)=>
                  <li key = {submission.id}>
                      <Submission submission = {submission} optionList= {optionList}/>
                  </li>
                )) : (<span>No Submission Found</span>)}
                
            </ul>
          </div>

    );
};

export default MyQueue;