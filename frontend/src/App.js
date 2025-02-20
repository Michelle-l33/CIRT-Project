import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { UserProvider } from './Components/Login/UserContext';
import ProtectedRoutes from './Components/Routing/ProtectedRoutes';
import RedirectDashboard from './Components/Routing/DashboardRedirect';
import DashboardRoutes from './Components/Routing/DashboardRoutes';

import Home from './Components/HomePage/Home';
import Login from './Components/Login/Login';
import SubmissionReview from './Components/SubmissionReview/SubmissionReview';
import SubmissionAuthor from './Components/SubmissionAuthor/SubmissionAuthor';


// import Dashboard from './Components/Dashboard/Dashboard';

// import TabNav from './Components/Dashboard/TabNav/TabNav';
// import Task from './Components/Dashboard/Task/TaskList';
// import SubmissionRecord from './Components/Dashboard/SubmissionRecord/SubmissionRecord';
// import MainContentAuthor from './Components/Dashboard/MainContentAuthor';
// import MainContentEditor from './Components/Dashboard/MainContentEditor';

// import MyQueue from './Components/Dashboard/TabNav/MyQueue';
// import AllActive from './Components/Dashboard/TabNav/AllActive';
// import Unassigned from './Components/Dashboard/TabNav/Unassigned';
// import Archives from './Components/Dashboard/TabNav/Archives';

function App() {
  return (
    <>
    <UserProvider>
      <Router>

        <Routes> {/* Routes are part of the URL; each route path is what takes you to the right component */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SubmissionReview" element={<SubmissionReview />} />
          <Route path="/SubmissionAuthor" element={<SubmissionAuthor />} />
          <Route path="/Dashboard" element = {<ProtectedRoutes />}>
            <Route path="/Dashboard" element={<RedirectDashboard />} />
            <Route path="/Dashboard/*" element={<DashboardRoutes />}/>
          </Route>

            {/* <Route path="Author" element={<Dashboard 
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
            </Route> */}
        </Routes>
      </Router>
    </UserProvider>
    </>
  );
}

export default App;
