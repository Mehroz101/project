import React, { createContext, useState, useContext } from 'react';

// Create a Context for the Auth input
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [resetForm, setResetForm] = useState(false);

  return (
    <AuthContext.Provider value={{ resetForm, setResetForm}}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
