import { createContext, useContext, useReducer, useState, useTransition, useEffect } from 'react';

import { useUser } from '../../Login/UserContext';
const SubmissionsContext = createContext(null);

const SubmissionsDispatchContext = createContext(null);



export function SubmissionsProvider( {children} ) {
    const {user} = useUser();
    const [isPending, startTransition] = useTransition();
    const [initialSubmissions, setInitialSubmissions] = useState([]);
    const [submissionList, dispatch] = useReducer(submissionReducer, initialSubmissions);


   useEffect(()=>{
    startTransition( () => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch(`https://cirt-project-server.vercel.app/submission/myQueue/${user._id}`,{
                    method: "GET"
                })
                if (!response.ok) {
                    throw new Error("Failed to fetch submissions");
                }
                
                const data = await response.json();
                setInitialSubmissions(data);
                dispatch({ type: "setMyQueueSubmissions", submissions: data });
                
            } catch (error) {
                console.error("Error fetching submissions:", error);
            }
        };
        fetchSubmissions();
    })}, []);

    if (isPending) {
        return <div>Loading...</div>;
    }
    const updateSubmissionStage = async (submission, newStage) => {
        try {
            const response = await fetch(`https://cirt-project-server.vercel.app/submission/${submission._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ stage: newStage }),
            });

            if (!response.ok) {
                throw new Error("Failed to update submission stage");
            }

            const updatedSubmission = await response.json();
            dispatch({ type: "updateStageSuccess", submission: updatedSubmission });
        } catch (error) {
            console.error("Error updating stage:", error);
        }
    };

    return (
        <SubmissionsContext.Provider value = {submissionList}>
            <SubmissionsDispatchContext.Provider value = {{dispatch, updateSubmissionStage}}>
                {children}
            </SubmissionsDispatchContext.Provider>
        </SubmissionsContext.Provider>
    );
};

function submissionReducer(submissionList, action) {
    switch(action.type) {
        case "setMyQueueSubmissions": {
            return action.submissions;
        }
        case "updateStageSuccess": {
            return submissionList.map((submission) => {
                if (submission._id === action.submission._id) {
                    return action.submission;
                } else {
                    return submission}
            })
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

export function useSubmissions() {
    return useContext(SubmissionsContext);
}
  
  export function useSubmissionsDispatch() {
    return useContext(SubmissionsDispatchContext);
}
  
