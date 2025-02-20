import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useUser } from '../Login/UserContext';


const RedirectDashboard = () => {
    const { user } = useUser();
    // const [isPublic, setIsPublic] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isEditor, setIsEditor] = useState(false);
    // const [isReviewer, setIsReviewer] = useState(false);


    useEffect(() => { // use effect makes sure user is rendered before acting on it
        if (user) {
            // console.log("User issss: ",user); // checks if user is loaded correctly
            if (user.isEditor) {
                setIsEditor(true);
                setIsAuthor(false);
            } else if (user.isAuthor) {
                setIsAuthor(true);
                setIsEditor(false);
            }
        }
        else {
            console.log("No User");
        }
    }, [user]);
    console.log( "Author: ",isAuthor);
    console.log("Editor: ",isEditor);
 

    if (isEditor) return <Navigate to="Editor" replace />;
    if (isAuthor) return <Navigate to="Author" replace />;
    return <Navigate to="/" replace />;
};

export default RedirectDashboard;