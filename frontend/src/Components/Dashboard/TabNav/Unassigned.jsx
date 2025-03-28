import styles from './TabNav.module.css';
import Submission from "./Submission";
import TabHeader from './TabHeader';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Unassigned = () => {
    const [submissionList, setSubmissionList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const optionList = [
        {
            name: "View in Detail",
            function: (id) => navigate(`/submission/${id}`) // Pass submission ID
        },
        {
            name: "Assign Editor",
            function: (id) => console.log("Assign editor clicked for", id)
        }
    ];

    useEffect(() => {
        const fetchUnassigned = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:8082/submission/unassigned');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch submissions');
                }
                
                const data = await response.json();
                console.log("API Response:", data); // Debug what's returned
                
                // Verify data is in expected format
                if (!Array.isArray(data)) {
                    throw new Error('Unexpected data format from API');
                }

                setSubmissionList(data);
                setFilteredList(data); // Initialize filtered list with all unassigned
                setError(null);
            } catch (error) {
                console.error("Error fetching submissions:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchUnassigned();
    }, []); // Empty dependency array to run once on mount

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
                                optionList={optionList.map(option => ({
                                    ...option,
                                    function: () => option.function(submission._id)
                                }))} 
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