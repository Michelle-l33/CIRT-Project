import { createContext, useContext, useReducer, useState, useTransition, useEffect } from 'react';

const SubmissionsContext = createContext(null);

const SubmissionsDispatchContext = createContext(null);

// const initialSubmisssions = [
//     {   authorID: 457,
//         title: "sdhdsahd dhgs sda",
//         firstName: "Smith",
//         lastName: "John",
//         document: "url",
//         isPoster: false,
//         isArticle: true,
//         abstract: "shdsag fjbfh aegdashds aydgsayds sfdasds dgfafgds sdgvasgd asgdahdvagsdsadv",
//         stage: 1,
//     },
//     {
//         authorID: 458,
//         title: "sdhdsahd dhgs sda",
//         firstName: "Taylor",
//         lastName: "John",
//         document: "url",
//         isPoster: false,
//         isArticle: true,
//         abstract: "shdsag fjbfh aegdashds aydgsayds sfdasds dgfafgds sdgvasgd asgdahdvagsdsadv",
//         stage: 2,
//     },
//     {
//         authorID: 459,
//         title: "sdhdsahd dhgs sda",
//         firstName: "Haha",
//         lastName: "John",
//         document: "url",
//         isPoster: false,
//         isArticle: true,
//         abstract: "shdsag fjbfh aegdashds aydgsayds sfdasds dgfafgds sdgvasgd asgdahdvagsdsadv",
//         stage: 3,
//     },
//     {
//         authorID: 412,
//         title: "sdhdsahd dhgs sda",
//         firstName: "Abulu",
//         lastName: "John",
//         document: "url",
//         isPoster: false,
//         isArticle: true,
//         abstract: "shdsag fjbfh aegdashds aydgsayds sfdasds dgfafgds sdgvasgd asgdahdvagsdsadv",
//         stage: 4,
//     },
//     {
//         authorID: 723,
//         title: "sdhdsahd dhgs sda",
//         firstName: "Kimberly",
//         lastName: "John",
//         document: "url",
//         isPoster: false,
//         isArticle: true,
//         abstract: "shdsag fjbfh aegdashds aydgsayds sfdasds dgfafgds sdgvasgd asgdahdvagsdsadv",
//         stage: 5,
//     },


// ]



export function SubmissionsProvider( {children} ) {
    const [isPending, startTransition] = useTransition();
    const [initialSubmissions, setInitialSubmissions] = useState([]);
    const [submissionList, dispatch] = useReducer(submissionReducer, initialSubmissions);

   useEffect(()=>{
    startTransition( () => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch("http://localhost:8082/submission/unpublished",{
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

    return (
        <SubmissionsContext.Provider value = {submissionList}>
            <SubmissionsDispatchContext.Provider value = {dispatch}>
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
        case "updateStage": {
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
  
