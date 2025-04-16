import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [selectedProject, setSelectedProjectState] = useState(null);

  // On mount, try to load from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem('selectedProject');
    if (stored && !selectedProject) {
      setSelectedProjectState(JSON.parse(stored));
    }
    // eslint-disable-next-line
  }, []);

  // When setting, also save to sessionStorage
  const setSelectedProject = (project) => {
    setSelectedProjectState(project);
    if (project) {
      sessionStorage.setItem('selectedProject', JSON.stringify(project));
    } else {
      sessionStorage.removeItem('selectedProject');
    }
  };

  return (
    <PortfolioContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </PortfolioContext.Provider>
  );
};
