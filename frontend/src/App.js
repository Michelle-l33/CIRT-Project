// import logo from './logo.svg'; 
// import logo from './logo.svg'; 
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import { UserProvider } from './Components/Login/UserContext';
//import NavBar from './Components/NavBar'
import MyQueue from './Components/Dashboard/MyQueue';
import AllActive from './Components/Dashboard/AllActive';
import Unassigned from './Components/Dashboard/Unassigned';
import Archives from './Components/Dashboard/Archives';
function App() {
  return (
    <>
    <UserProvider>
      <Router>
       {/* <NavBar/>  This makes it so that the navbar is constant on every page */}
        <Routes> {/* Routes are part of the URL; each route path is what takes you to the right component */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />

          <Route path="/Dashboard" element={<Dashboard />}>
            <Route path="MyQueue" element={<MyQueue />} />
            <Route path="AllActive" element={<AllActive />} />
            <Route path="Unassigned" element={<Unassigned />} />
            <Route path="Archives" element={<Archives />} />
          </Route>
          
        </Routes>
      </Router>
      </UserProvider>
    </>
  );
}

export default App;
