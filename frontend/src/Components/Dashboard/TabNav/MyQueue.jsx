import styles from './TabNav.module.css';
import Submission from "./Submission";
import TabHeader from './TabHeader';
import { useState, useEffect } from 'react';
import {useUser} from '../../Login/UserContext';
import { Link } from "react-router-dom";
import { useSubmissions } from '../SubmissionRecord/SubmissionContext';

const MyQueue = () => {
    const {user} = useUser();
    const [submissionList, setSubmissionList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
      const fetchMyQueue = async () => {
        try { 
          const response = await fetch(`http://localhost:8082/submission/myQueue/${user._id}`, {
            method: "GET"
          });
          if (!response.ok) {
            throw new Error("Failed to fetch submissions");
          }
          const data = await response.json();
          setSubmissionList(data);
        } catch (error) {
          console.error("Error fetching submissions:", error);
        }
      };
      fetchMyQueue();
    }, [user._id]);

    useEffect(() => {
      setFilteredList(submissionList);
    }, [submissionList]);

    const optionList = [
      {
        name: "View in Detail",
        element: (submission) => (
          <Link to={`/Gallery/submission/${submission._id}`} target="_blank">
            View in Detail
          </Link>
        )
      },
      // Add other options as needed
      // {
      //   name: "Another Action",
      //   function: (submission) => { /* action */ }
      // }
    ];

    return (
      <div className={styles.tab}>
        <TabHeader tabHeader="My Assigned" submissionList={submissionList} setFilteredList={setFilteredList}/>

        <ul className={styles.submissionList}>
          {filteredList.length > 0 ? (
            filteredList.map((submission) => (
              <li key={submission._id}>
                <Submission submission={submission} optionList={optionList}/>
              </li>
            ))
          ) : (
            <span>No Submission Found</span>
          )}
        </ul>
      </div>
    );
};

export default MyQueue;