import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

import Dashboard from '../Dashboard/Dashboard';
import MainContentAuthor from '../Dashboard/MainContentAuthor';
import MainContentEditor from '../Dashboard/MainContentEditor';
import MainContentReviewer from '../Dashboard/MainContentReviewer';
import TaskPage from '../Dashboard/Task/TaskList';
import TabNav from '../Dashboard/TabNav/TabNav';
import MyQueue from '../Dashboard/TabNav/MyQueue';
import AllActive from '../Dashboard/TabNav/AllActive';
import Unassigned from '../Dashboard/TabNav/Unassigned';
import Archives from '../Dashboard/TabNav/Archives';
import SubmissionRecord from '../Dashboard/SubmissionRecord/SubmissionRecord';
import SubmissionAuthorPage from '../Dashboard/SubmissionAuthor/SubmissionAuthor';
import Current from '../Dashboard/ReviewerAssignment/Current';
import UserTab from '../Dashboard/UserTab/UserTab';


const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/Dashboard"/>

                <Route element={<ProtectedRoutes role="Author" />}>
                    <Route path="Author" element={
                        <Dashboard component={<MainContentAuthor />} />
                    } />
                </Route>

                <Route element={<ProtectedRoutes role="Reviewer" />}>
                    <Route path="Reviewer" element={<Dashboard 
                                        component={<MainContentReviewer />}/>}>
                        <Route index element={<Navigate to="Current" replace />}/>
                        <Route path = "Current" element={<Current />} />
                        
                    </Route>
                </Route>
                
                <Route element={<ProtectedRoutes role="Editor" />}>
                    <Route path="Editor" element={<Dashboard 
                                        component={<MainContentEditor />}/>}>
                    <Route index element={<Navigate to="Task" replace />}/>
                
                        <Route path="TabNav" element={<TabNav />}>
                            <Route index element={<Navigate to="MyQueue" replace />}  />
                            <Route path="MyQueue" element={<MyQueue />} />
                            <Route path="AllActive" element={<AllActive />} />
                            <Route path="Unassigned" element={<Unassigned />} />
                            <Route path="Archives" element={<Archives />} />
                        </Route>
                        <Route path="Task" element={<TaskPage />} />
                        <Route path="DocumentTab" element={<SubmissionRecord />}>
                            <Route path=":id"></Route>
                        </Route>
                    </Route>
                </Route>
            <Route path="/SubmissionAuthor" element={<SubmissionAuthorPage />} />
            <Route path="/User" element={<Dashboard 
                                component={<UserTab />}/>}></Route>
        </Routes>
    )
}

export default DashboardRoutes;