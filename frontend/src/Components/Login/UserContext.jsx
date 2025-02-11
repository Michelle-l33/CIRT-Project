import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie';

// Create the context
const UserContext = createContext(); 

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On component mount, retrieve user data from cookies
  useEffect(() => {
    const userData = Cookies.get('user'); // Retrieve the user data from the cookie
    if (userData) {
      setUser(JSON.parse(userData)); // Parse and set user data if cookie exists
    }
  }, []);
    
  const handleLogout = () =>{
    Cookies.remove('user');
    setUser(null);
    window.location.href= "/login";
    };
    
  return (
    <UserContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);