import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './Components/Login/UserContext';
import RedirectDashboard from './Components/Routing/DashboardRedirect';
import DashboardRoutes from './Components/Routing/DashboardRoutes';

import Home from './Components/HomePage/Home';
import Login from './Components/Login/Login';
import ForgotPassword from './Components/Login/ForgotPassword';
import ResetPassword from './Components/Login/ResetPassword';
import ArticleView from './Components/ArticleView/ArticleView';
import Gallery from './Components/Gallery/Gallery';
import Papers from './Components/Gallery/Papers/Papers';
import ArticleViewPage from './Components/ArticleView/ArticleView';
import SearchResults from './Components/Gallery/SearchResults/SearchResults';
import AboutUs from './Components/AboutUs/AboutUs';
import FellowPage from './Components/FellowPage/FellowPage';

function App() {

  return (
    <>
      <UserProvider>
        <Router>
          <Routes> {/* Routes are part of the URL; each route path is what takes you to the right component */}
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/ArticleView" element={<ArticleView />} />
            <Route path="/Gallery" element={<Gallery />} />
            <Route path="/Papers" element={<Papers />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/Dashboard" >
              <Route path="/Dashboard" element={<RedirectDashboard />} />
              <Route path="/Dashboard/*" element={<DashboardRoutes />} />
            </Route>
            <Route path="Gallery/submission/:id" element={<ArticleViewPage />}></Route>
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Fellowship" element={<FellowPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
