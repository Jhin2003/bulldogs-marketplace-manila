import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initially no user is logged in

  const login = (userData) => {
    setUser(userData); // Update the user state
  };

  const logout = () => {
    setUser(null); // Clear the user state when logged out
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};