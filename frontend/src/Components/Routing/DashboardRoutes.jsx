
import { Route, Routes, Navigate } from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';
import MainContentAuthor from '../Dashboard/MainContentAuthor';
import MainContentEditor from '../Dashboard/MainContentEditor';
import Task from '../Dashboard/Task/TaskList';
import TabNav from '../Dashboard/TabNav/TabNav';
import MyQueue from '../Dashboard/TabNav/MyQueue';
import AllActive from '../Dashboard/TabNav/AllActive';
import Unassigned from '../Dashboard/TabNav/Unassigned';
import Archives from '../Dashboard/TabNav/Archives';
import SubmissionRecord from '../Dashboard/SubmissionRecord/SubmissionRecord';


const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/Dashboard"/>
                <Route path="Author" element={<Dashboard 
                                    component={<MainContentAuthor />}/>}/>
                <Route path="Editor" element={<Dashboard 
                                    component={<MainContentEditor />}/>}>
                <Route index element={<Navigate to="Task" replace />} />
            
                <Route path="TabNav" element={<TabNav />}>
                    <Route index element={<Navigate to="MyQueue" replace />}  />
                    <Route path="MyQueue" element={<MyQueue />} />
                    <Route path="AllActive" element={<AllActive />} />
                    <Route path="Unassigned" element={<Unassigned />} />
                    <Route path="Archives" element={<Archives />} />
                </Route>
                <Route path="Task" element={<Task />} />
                <Route path="DocumentTab" element={<SubmissionRecord />} />
            </Route>
        </Routes>
    )
}

export default DashboardRoutes;