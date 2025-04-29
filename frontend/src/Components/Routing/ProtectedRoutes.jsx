import { Navigate, Outlet } from "react-router-dom";

import { useUser } from "../Login/UserContext";

// Doing routing taken from https://www.youtube.com/watch?v=z5s28GAgB1M&list=PLKCKR7UvRUkcapZSs9S8WDylr5qX0mHFq&index=6

const ProtectedRoutes = ({ role }) => {
    const {user} = useUser();

    if (!user.isEditor && !user.isAuthor && !user.isReviewer && !user.isAdmin) { 
        return <Navigate to="/Login" replace />;
    }

    switch (role) {
        case "Author":
            if (!user.isAuthor) return <Navigate to="/" replace />;
            break;
        case "Editor":
            if (!user.isEditor) return <Navigate to="/" replace />;
            break;
        case "Reviewer":
            if (!user.isReviewer) return <Navigate to="/" replace />;
            break;
        case "Admin":
            if (!user.isAdmin) return <Navigate to="AboutUs" replace />;
            break;
        default:
            return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;