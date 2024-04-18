import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Get user data from local storage
    const savedUserData = localStorage.getItem('userData');
    return savedUserData ? JSON.parse(savedUserData) : null;
  });

  useEffect(() => {
    // Update local storage when user state changes
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
    } else {
      localStorage.removeItem('userData');
    }
  }, [user]);

  const login = async (email, password, userType) => {
    try {
      let userData;
      if (userType === 'student') {
        userData = await axios.post('/api/students/login', { email, password });
      } else if (userType === 'faculty') {
        userData = await axios.post('/api/teachers/login', { email, password });
      }
      console.log(userData.data);
      setUser(userData.data); // Save user data to state
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw the error to be caught by the login component
    }
  };

  const logout = () => {
    setUser(null); // Clear user data from state and local storage (via useEffect)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
