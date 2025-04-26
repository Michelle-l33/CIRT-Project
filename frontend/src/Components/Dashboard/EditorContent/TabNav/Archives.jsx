import styles from './TabNav.module.css';
import Submission from "./Submission";
import TabHeader from './TabHeader';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Archives = () => {
    const [submissionList, setSubmissionList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const optionList = [
        {
            name: "View in Detail",
            function: (id) => navigate(`/submission/${id}`) // Pass submission ID
        }
    ];

    useEffect(() => {
        const fetchArchives = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://cirt-project-server.vercel.app/submission/archives');
                
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
                setFilteredList(data); // Initialize filtered list with all Archives
                setError(null);
            } catch (error) {
                console.error("Error fetching submissions:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchArchives();
    }, []); // Empty dependency array to run once on mount

    if (isLoading) return <div className={styles.loading}>Loading submissions...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;

    return (
        <div className={styles.tab}>
            <TabHeader 
                tabHeader="Archives Submissions" 
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
                    <span>No archived submissions found</span>
                )}
            </ul>
        </div>
    );
};

export default Archives;