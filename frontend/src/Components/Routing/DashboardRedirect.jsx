// import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useUser } from '../Login/UserContext';


const RedirectDashboard = () => {
    const { user } = useUser();
    // const [isPublic, setIsPublic] = useState(false);
    // const [isAuthor, setIsAuthor] = useState(false);
    // const [isEditor, setIsEditor] = useState(false);
    // const [isReviewer, setIsReviewer] = useState(false);


    // useEffect(() => { // use effect makes sure user is rendered before acting on it
    //     if (user) {
    //         // console.log("User issss: ",user); // checks if user is loaded correctly
    //         if (user.isEditor) {
    //             setIsAuthor(false);
    //             setIsEditor(true);
    //             setIsReviewer(false);
    //         } else if (user.isAuthor) {
    //             setIsAuthor(true);
    //             setIsEditor(false);
    //             setIsReviewer(false);
    //         } else if (user.isReviewer) {
    //             setIsAuthor(false);
    //             setIsEditor(false);
    //             setIsReviewer(true);
    //         }
    //     }
    //     else {
    //         console.log("No User");
    //     }
    // }, [user]);
    // console.log( "Author: ",isAuthor);
    // console.log("Editor: ",isEditor);
 
    console.log("Admin: ",user);
    if (user.isEditor) return <Navigate to="Editor" replace />;
    else if (user.isAuthor) return <Navigate to="Author" replace />;
    else if (user.isReviewer) return <Navigate to="Reviewer" replace />;
    else if (user.isAdmin) return <Navigate to="Admin" replace />;
    return <Navigate to="/Login" replace />;
};

export default RedirectDashboard;