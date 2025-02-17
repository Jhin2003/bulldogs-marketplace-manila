import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";


const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded); // Store decoded user data
    }
    setIsLoading(false); // Set loading to false after checking token
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    const { iat, exp, ...userData } = decoded
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};