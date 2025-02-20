import { Navigate } from 'react-router-dom';

import { useUser } from '../Login/UserContext';

const RedirectDashboard = () => {
    
    const { user } = useUser();

    // if (!user) return <Navigate to="/" replace />;

    const isEditor = user.isEditor;
    const isAuthor = user.isAuthor;


    if (isEditor) return <Navigate to="Editor" replace />;
    if (isAuthor) return <Navigate to="Author" replace />;
    return <Navigate to="/" replace />;
};

export default RedirectDashboard;