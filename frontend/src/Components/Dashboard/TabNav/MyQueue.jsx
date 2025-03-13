import styles from './TabNav.module.css';

import Submission from "./Submission";
import TabHeader from './TabHeader';
import { useState, useEffect } from 'react';
import {useUser} from '../../Login/UserContext';
import { useNavigate } from "react-router-dom";
import { useSubmissions } from '../SubmissionRecord/SubmissionContext';


const MyQueue = () => {
    const {user} = useUser();
    const [submissionList, setSubmissionList] = useState([]);
    const [ filteredList, setFilteredList ] = useState([]);
    //console.log("LIST: ",submissionList);

    const navigate = useNavigate();
    const optionList = [
      {
        name: "View in Detail",
        function: () => navigate("")
      },
    ]

    useEffect(()=>{
      const fetchMyQueue = async () =>{
       try { 
        const response = await fetch(`http://localhost:8082/submission/myQueue/${user._id}`,{
          method: "GET"
        })
        if (!response.ok){
          throw new Error("Failed to fetch submissions");
        }
        const data = await response.json();
        setSubmissionList(data);
      }  catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };
    fetchMyQueue();

    }, [user._id]);

    useEffect(() => {
      // Update filteredList when submissionList is fetched
      setFilteredList(submissionList);
  }, [submissionList]);

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