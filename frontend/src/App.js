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
        </Routes>
      </Router>
    </UserProvider>
    </>
  );
}

export default App;
