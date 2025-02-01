import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage when the app starts
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Save user to localStorage
    } else {
      localStorage.removeItem("user"); // Remove user if logged out
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData); // Update the user state
  };

  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem("user"); // Remove from localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};