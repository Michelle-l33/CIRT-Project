import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
//import NavBar from './Components/NavBar'

function App() {
  return (
    <>
      <Router>
       {/* <NavBar/>  This makes it so that the navbar is constant on every page */}
        <Routes> {/* Routes are part of the URL; each route path is what takes you to the right component */}
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
