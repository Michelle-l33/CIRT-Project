import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie';

// Create the context
const UserContext = createContext(); 

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On component mount, retrieve user data from cookies
  useEffect(() => {
    const userID = Cookies.get('userId'); // Retrieve the user data from the cookie
    if (userID) {
      fetchUserData(userID); // Parse and set user data if cookie exists
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8082/user/${userId}`);
      const userData = await response.json();
      
      if (response.ok) {
        setUser(userData); // Update state with full user data
      } else {
        console.log("Error fetching user data:", userData.error);
      }
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };
    
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