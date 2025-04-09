import React, { createContext, useContext, useState } from 'react';
import { mockUsers } from './mockUsers';
import useStore from '../store/store';
import { optimizeDB } from '../services/db/index';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const clearStore = useStore((state) => state.clearStore);

  const login = (email, password) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setError(null);

      return true;
    }
    setError('Invalid email or password');
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    clearStore();
  };

  const value = {
    currentUser,
    login,
    logout,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };