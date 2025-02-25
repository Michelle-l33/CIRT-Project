import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext(null);

const TasksDispatchContext = createContext(null);

const initialTasks = [
    {   
        id: 101,
        title: "Look at reviews",
        description: "You need to look at the reviewsssss sjdb ashdba hasdbashdab sahdbasdhb sahdb",
        isComplete: false,
    },

    {   
        id: 102,
        title: "Resubmit",
        description: "You need to Resubmitttttttttt",
        isComplete: false,
    },
];

export function TasksProvider({ children }) {
    const [taskList, dispatch] = useReducer(tasksReducer, initialTasks);

    return (
        <TasksContext.Provider value = {taskList}>
            <TasksDispatchContext.Provider value = {dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
};

function tasksReducer(taskList, action) {
    switch(action.type) {
        case "add": {
            return [...taskList, {
                
                id: action.id,
                title: action.title,
                description: action.description,
                isComplete: false,
                }
            ];
        };

        case "change": {
            return taskList.map((task) => {
                if (task.id === action.task.id) {
                    return action.task;
                } else {
                    return task;
                }
            });
        };

        case "hide": {
            return taskList.filter((task) => task.id !== action.id);
        };

        default: {
            throw Error("What is the action? " + action.type);
        };
    }
}


export function useTasks() {
    return useContext(TasksContext);
}
  
  export function useTasksDispatch() {
    return useContext(TasksDispatchContext);
}
  