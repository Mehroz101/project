import React, { createContext, useState, useContext } from 'react';

// Create a Context for the search input
const SearchContext = createContext();

// Create a provider component
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

// Create a custom hook to use the SearchContext
export const useSearch = () => useContext(SearchContext);
