import React, { createContext, ReactNode, useContext, useEffect, useState, useCallback } from 'react';
type NavigationContextType = {
  currentPath: string;
  navigate: (path: string) => void;
};
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);
export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  /**
   * Function to navigate to a different path.
   * It uses the browser's history API to update the URL without reloading the page,
   * and updates the state to reflect the new current path.
   */
  const navigate = useCallback((path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
  }, [currentPath]);
  /**
  * Effect hook to handle browser's back and forward navigation.
  * Adds an event listener for the `popstate` event, which is triggered when the user
  * navigates using the browser's back/forward buttons, to update the state accordingly.
  */
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname); // Update state with the new current path
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  return (
    <NavigationContext.Provider value={{ currentPath, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};
export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
