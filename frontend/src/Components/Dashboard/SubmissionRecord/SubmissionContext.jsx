import { createContext, useContext, useReducer } from 'react';

const SubmissionsContext = createContext(null);

const SubmissionsDispatchContext = createContext(null);

const initialSubmisssions = [
    {   authorID: 457,
        title: "sdhdsahd dhgs sda",
        firstName: "Smith",
        lastName: "John",
        document: "url",
        isPoster: false,
        isArticle: true,
        abstract: "shdsag fjbfh aegdashds aydgsayds sfdasds dgfafgds sdgvasgd asgdahdvagsdsadv",
        stage: 1,
    },
    {
        authorID: 458,
        title: "sdhdsahd dhgs sda",
        firstName: "Taylor",
        lastName: "John",
        document: "url",
        isPoster: false,
        isArticle: true,
        abstract: "shdsag fjbfh aegdashds aydgsayds sfdasds dgfafgds sdgvasgd asgdahdvagsdsadv",
        stage: 2,
    },
    {
        authorID: 459,
        title: "sdhdsahd dhgs sda",
        firstName: "Haha",
        lastName: "John",
        document: "url",
        isPoster: false,
        isArticle: true,
        abstract: "shdsag fjbfh aegdashds aydgsayds sfdasds dgfafgds sdgvasgd asgdahdvagsdsadv",
        stage: 3,
    },
    {
        authorID: 412,
        title: "sdhdsahd dhgs sda",
        firstName: "Abulu",
        lastName: "John",
        document: "url",
        isPoster: false,
        isArticle: true,
        abstract: "shdsag fjbfh aegdashds aydgsayds sfdasds dgfafgds sdgvasgd asgdahdvagsdsadv",
        stage: 4,
    },
    {
        authorID: 723,
        title: "sdhdsahd dhgs sda",
        firstName: "Kimberly",
        lastName: "John",
        document: "url",
        isPoster: false,
        isArticle: true,
        abstract: "shdsag fjbfh aegdashds aydgsayds sfdasds dgfafgds sdgvasgd asgdahdvagsdsadv",
        stage: 5,
    },


]

export function SubmissionsProvider( {children} ) {

    const [submissionList, dispatch] = useReducer(submissionReducer, initialSubmisssions);

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
        case "updateStage": {
            return submissionList.map((submission) => {
                if (submission.id === action.submission.id) {
                    return action.submission;
                } else {
                    return submission}
            })
        }
    }
}

export function useSubmissions() {
    return useContext(SubmissionsContext);
}
  
  export function useSubmissionsDispatch() {
    return useContext(SubmissionsDispatchContext);
}
  
