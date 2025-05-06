import { Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

import Dashboard from '../Dashboard/Dashboard';
import MainContentAuthor from '../Dashboard/AuthorContent/MainContentAuthor';
import MainContentEditor from '../Dashboard/EditorContent/MainContentEditor';
import MainContentReviewer from '../Dashboard/ReviewerContent/MainContentReviewer';
import MainContentAdmin from '../Dashboard/AdminContent/MainContentAdmin';
import TaskPage from '../Dashboard/EditorContent/Task/TaskList';
import TabNav from '../Dashboard/EditorContent/TabNav/TabNav';
import MyQueue from '../Dashboard/EditorContent/TabNav/MyQueue';
import AllActive from '../Dashboard/EditorContent/TabNav/AllActive';
import Unassigned from '../Dashboard/EditorContent/TabNav/Unassigned';
import Archives from '../Dashboard/EditorContent/TabNav/Archives';
import SubmissionRecord from '../Dashboard/EditorContent/SubmissionRecord/SubmissionRecord';
import SubmissionAuthorPage from '../Dashboard/AuthorContent/SubmissionAuthor/SubmissionAuthor';
import Current from '../Dashboard/ReviewerContent/Current';
import UserList from '../Dashboard/AdminContent/UserList';
import UserTab from '../Dashboard/UserTab/UserTab';
import FellowTab from '../Dashboard/AdminContent/FellowTab';
import Archive from '../Dashboard/AuthorContent/Archive/Archive';
import Home from '../Dashboard/AuthorContent/Home/Home';

const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/Dashboard"/>

                <Route element={<ProtectedRoutes role="Author" />}>
                    <Route path="Author" element={
                        <Dashboard component={<MainContentAuthor />} />}>
                        
                        <Route index element={<Navigate to = "Home" replace/>}/>
                        <Route path = "Home" element={<Home />} />
                        <Route path = "Archive" element={<Archive />} />
                    </Route>
                </Route>

                <Route element={<ProtectedRoutes role="Reviewer" />}>
                    <Route path="Reviewer" element={<Dashboard 
                                        component={<MainContentReviewer />}/>}>
                        <Route index element={<Navigate to="Current" replace />}/>
                        <Route path = "Current" element={<Current />} />
                    </Route>
                </Route>
                
                <Route element={<ProtectedRoutes role="Admin" />}>
                    <Route path = "Admin" element={<Dashboard 
                                        component={<MainContentAdmin />}/>}>
                            <Route index element={<Navigate to="UserList" replace />}/>
                            <Route path = "UserList" element={<UserList />} />
                            <Route path = "Fellowship" element={<FellowTab />}/>
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