import styles from './TabNav.module.css';
import Submission from "./Submission";
import TabHeader from './TabHeader';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Unassigned = () => {
    const [submissionList, setSubmissionList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUnassigned = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:8082/submission/unassigned');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch submissions');
                }
                
                const data = await response.json();
                
                if (!Array.isArray(data)) {
                    throw new Error('Unexpected data format from API');
                }

                setSubmissionList(data);
                setFilteredList(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching submissions:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchUnassigned();
    }, []);

    const optionList = [
        {
            name: "View in Detail",
            element: (submission) => (
                <Link to={`/Gallery/submission/${submission._id}`} target="_blank">
                    View in Detail
                </Link>
            )
        },
        {
            name: "Assign Editor",
            function: (submission) => {
                console.log("Assign editor clicked for", submission._id);
                // Add your assign editor logic here
            }
        }
    ];

    if (isLoading) return <div className={styles.loading}>Loading submissions...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;

    return (
        <div className={styles.tab}>
            <TabHeader 
                tabHeader="Unassigned Submissions" 
                submissionList={submissionList} 
                setFilteredList={setFilteredList}
            />

            <ul className={styles.submissionList}>
                {filteredList.length > 0 ? (
                    filteredList.map((submission) => (
                        <li key={submission._id}>
                            <Submission 
                                submission={submission} 
                                optionList={optionList}
                            />
                        </li>
                    ))
                ) : (
                    <span>No unassigned submissions found</span>
                )}
            </ul>
        </div>
    );
};

export default Unassigned;