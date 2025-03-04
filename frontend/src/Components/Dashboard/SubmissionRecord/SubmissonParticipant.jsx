import React, { useEffect, useState } from 'react';
import styles from './SubmissionRecord.module.css';

const SubmissionParticipant = ({ submissionId }) => { // Pass submissionId as a prop
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

    // Handle "Assign Reviewer" button click
    const handleAssignReviewer = async (reviewerId) => {
        try {
            const response = await fetch(`http://localhost:8082/submission/${submissionId}/assign-reviewer`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reviewerId }),
            });

            if (!response.ok) {
                throw new Error('Failed to assign reviewer');
            }

            const updatedSubmission = await response.json();
            console.log('Reviewer assigned successfully:', updatedSubmission);
            alert('Reviewer assigned successfully!');
        } catch (error) {
            console.error('Error assigning reviewer:', error);
            alert('Error assigning reviewer. Please try again.');
        }
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
                <button onClick={() => setShowReviewers((prev) => !prev)}>
                    {showReviewers ? 'Hide Reviewers' : 'Assign'}
                </button>
            </div>

            <ul className={styles.participateList}>
                {displayedParticipants.map((participant) => (
                    <li key={participant._id}>
                        <span>{participant.isAuthor ? 'Author' : participant.isReviewer ? 'Reviewer' : 'Participant'}</span>
                        <span>{participant.name}</span>
                        <button onClick={() => handleAssignReviewer(participant._id)}>Assign Reviewer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubmissionParticipant;