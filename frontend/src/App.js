// import logo from './logo.svg'; 
// import logo from './logo.svg'; 
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import SubmissionReview from './Components/SubmissionReview/SubmissionReview';
import SubmissionAuthor from './Components/SubmissionAuthor/SubmissionAuthor';
import { UserProvider } from './Components/Login/UserContext';

import TabNav from './Components/Dashboard/TabNav/TabNav';
import Task from './Components/Dashboard/Task/TaskList';
import SubmissionRecord from './Components/Dashboard/SubmissionRecord/SubmissionRecord';
import MainContentAuthor from './Components/Dashboard/MainContentAuthor';
import MainContentEditor from './Components/Dashboard/MainContentEditor';

import MyQueue from './Components/Dashboard/TabNav/MyQueue';
import AllActive from './Components/Dashboard/TabNav/AllActive';
import Unassigned from './Components/Dashboard/TabNav/Unassigned';
import Archives from './Components/Dashboard/TabNav/Archives';

const isEditor = true;
const isAuthor = false;

const Redirect = () => {
  if (isEditor) return <Navigate to="/Editor" replace />;
  if (isAuthor) return <Navigate to="/Author" replace />;
  return <Navigate to="/" replace />;
};

function App() {
  return (
    <>
    <UserProvider>
      <Router>
       {/* <NavBar/>  This makes it so that the navbar is constant on every page */}
        <Routes> {/* Routes are part of the URL; each route path is what takes you to the right component */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SubmissionReview" element={<SubmissionReview />} />
          <Route path="/SubmissionAuthor" element={<SubmissionAuthor />} />
          <Route path="/Dashboard" element={<Redirect />} />
          <Route path="Author" element={<Dashboard 
                              component={<MainContentAuthor />} 
                              isEditor={isEditor} 
                              isAuthor={isAuthor} 
                            />}/>
          <Route path="/Editor" element={<Navigate to="/Editor/Task" replace />} />

          <Route path="/Editor" element={<Dashboard 
                              component={<MainContentEditor />} 
                              isEditor={isEditor} 
                              isAuthor={isAuthor} 
                            />}>
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
      </Router>
      </UserProvider>
    </>
  );
}

export default App;
