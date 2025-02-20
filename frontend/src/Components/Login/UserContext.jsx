import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie';

// Create the context
const UserContext = createContext(); 

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  // On component mount, retrieve user data from cookies
  useEffect(() => {
    const userID = Cookies.get('userID'); // Retrieve the user data from the cookie
    if (userID) {
      console.log("User ID: ", userID)
      fetchUserData(userID); // Parse and set user data if cookie exists
    }
    else{
      setLoading(false);
        }
  }, []);

  const fetchUserData = async (userID) => {
    try {
      const response = await fetch(`http://localhost:8082/user/${userID}`);
      const userData = await response.json();
      
      if (response.ok) {
        
        setUser(userData); // Update state with full user data
        console.log("User Set: ", userData);
      } else {
        console.log("Error fetching user data:", userData.error);
      }
    } catch (error) {
      console.log("Error fetching user:", error);
    } finally{
      setLoading(false);
    }
  };
    
  const handleLogout = () =>{
    Cookies.remove('userID');
    setUser(null);
    window.location.href= "/login";
    };

    if (loading) {
      return <div>Loading...</div>; 
    }
    
  return (
    <UserContext.Provider value={{ user, setUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);