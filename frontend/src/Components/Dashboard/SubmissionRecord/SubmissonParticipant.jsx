import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import styles from './SubmissionRecord.module.css';
import { FaHandPointLeft } from "react-icons/fa";


const SubmissionParticipant = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const originalSubmissionID = queryParams.get('submissionId'); // Pulls the submissionId query parameter
    console.log("ID CHECK", originalSubmissionID);

    const [participants, setParticipants] = useState([]);
    const [showReviewers, setShowReviewers] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentReviewer, setCurrentReviewer] = useState(null); // State to store the current reviewer

    // Fetch participants and current reviewer from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all participants
                const participantsResponse = await fetch('http://localhost:8082/user');
                if (!participantsResponse.ok) {
                    throw new Error('Failed to fetch participants');
                }
                const participantsData = await participantsResponse.json();
                setParticipants(participantsData);

                // Fetch the current submission to get the reviewerID
                const submissionResponse = await fetch(`http://localhost:8082/submission/${originalSubmissionID}`);
                const submissionData = await submissionResponse.json();

                // If the submission has a reviewerID, find the reviewer in the participants list
                if (submissionData.reviewerID) {
                    const reviewer = participantsData.find((participant) => participant._id === submissionData.reviewerID);
                    setCurrentReviewer(reviewer);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [originalSubmissionID]);

    // Handle "Assign Reviewer" button click
    const handleAssignReviewer = async (reviewerId) => {
        try {
            const response = await fetch(`http://localhost:8082/submission/${originalSubmissionID}/assign-reviewer`, {
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

            // Update the current reviewer in the state
            const reviewer = participants.find((participant) => participant._id === reviewerId);
            setCurrentReviewer(reviewer);

            alert('Reviewer assigned successfully!');
        } catch (error) {
            console.error('Error assigning reviewer:', error);
            alert('Error assigning reviewer. Please try again.');
        }
    };

    // Filter participants to only include reviewers if `showReviewers` is true
    const displayedParticipants = showReviewers
        ? participants.filter((participant) => participant.isReviewer)
        : currentReviewer
        ? [currentReviewer] // Show the current reviewer if one exists
        : []; // Empty array if no reviewer is assigned

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
                        {showReviewers && ( // Only show the "Assign Reviewer" button when reviewers are visible
                            <button onClick={() => handleAssignReviewer(participant._id)}><FaHandPointLeft /></button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubmissionParticipant;