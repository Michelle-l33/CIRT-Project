import styles from './TabNav.module.css';
import TabHeader from './TabHeader';
import Submission from "./Submission";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const AllActive = () => {
  const [submissionList, setSubmissionList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const fetchAllActive = async () => {
      try {
        const response = await fetch("http://localhost:3000/submission/unpublished", {
          method: "GET"
        });
        if (!response.ok) {
          throw new Error("Failed to fetch submissions");
        }
        
        const data = await response.json();
        setSubmissionList(data);
        setFilteredList(data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };
    fetchAllActive();
  }, []);

  // This is where we define the options for each submission
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
    {
      name: "Download",
      function: (submission) => {
        const link = document.createElement("a");
        link.href = submission.document;
        link.setAttribute("download", "");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  ];

  return (
    <div className={styles.tab}>
      <TabHeader tabHeader="All Active" submissionList={submissionList} setFilteredList={setFilteredList} />

      <ul className={styles.submissionList}>
        {filteredList.length > 0 ? (
          filteredList.map((submission) => (
            <li key={submission._id}>
              <Submission 
                submission={submission} 
                optionList={optionList}  // Passing the options to Submission
              />
            </li>
          ))
        ) : (
          <span>No Submission Found</span>
        )}
      </ul>
    </div>
  );
};

export default AllActive;