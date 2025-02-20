import { Navigate, Outlet } from "react-router-dom";

// Doing routing taken from https://www.youtube.com/watch?v=z5s28GAgB1M&list=PLKCKR7UvRUkcapZSs9S8WDylr5qX0mHFq&index=6

const useAuth = () => {
    return true;
}

const ProtectedRoutes = () => {

    const auth = useAuth();

    if (auth) return <Outlet />;
    return <Navigate to="/" replace />;
};

export default ProtectedRoutes;