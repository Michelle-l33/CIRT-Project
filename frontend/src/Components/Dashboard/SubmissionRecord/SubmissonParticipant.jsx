import React, { useEffect, useState } from 'react';
import styles from './SubmissionRecord.module.css';

const SubmissionParticipant = () => {
    const [participants, setParticipants] = useState([]);
    const [showReviewers, setShowReviewers] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch participants from the backend
    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await fetch('http://localhost:8082/user'); // Replace with your backend URL
                if (!response.ok) {
                    throw new Error('Failed to fetch participants');
                }
                const data = await response.json();
                setParticipants(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchParticipants();
    }, []);

    // Handle "Assign" button click
    const handleAssignClick = () => {
        setShowReviewers((prev) => !prev); // Toggle between true and false
    };

    // Filter participants to only include reviewers if `showReviewers` is true
    const displayedParticipants = showReviewers
        ? participants.filter((participant) => participant.isReviewer)
        : []; // Empty array when `showReviewers` is false

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.participateContainer}>
            <div className={styles.header}>
                <h3>Submission Participants</h3>
                <button onClick={handleAssignClick}>
                    {showReviewers ? 'Hide Reviewers' : 'Assign'}
                </button>
            </div>

            <ul className={styles.participateList}>
                {displayedParticipants.map((participant) => (
                    <li key={participant._id}>
                        <span>{participant.isAuthor ? 'Author' : participant.isReviewer ? 'Reviewer' : 'Participant'}</span>
                        <span>{participant.name}</span>
                        <button>Assign Reviewer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubmissionParticipant;