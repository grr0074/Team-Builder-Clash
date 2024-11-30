import React, { createContext, useContext, useState } from 'react';

// Create the context
const PageContext = createContext();

// Create a provider component
export const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home'); // Default to 'home'

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};

// Custom hook to use the PageContext
export const usePage = () => useContext(PageContext);
