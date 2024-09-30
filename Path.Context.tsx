import React, { createContext, ReactNode, useContext, useEffect, useState, useCallback } from 'react';

type NavigationContextType = {
  currentPath: string;
  navigate: (path: string, params?: Record<string, string>) => void;
  isAuthenticated: boolean;
  queryParams: Record<string, string>;
  setQueryParams: (newParams: Record<string, string> | ((prevParams: Record<string, string>) => Record<string, string>)) => void;
};

const parseQueryParams = (url: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const urlObj = new URL(url, window.location.origin);
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('authToken'));
  const [queryParams, setQueryParams] = useState<Record<string, string>>(parseQueryParams(window.location.href));

  const navigate = useCallback((path: string, params?: Record<string, string>) => {
    if (params) {
      const urlParams = new URLSearchParams(params).toString();
      path = urlParams ? `${path}?${urlParams}` : path;
    }

    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      setQueryParams(parseQueryParams(path));
    }
  }, [currentPath]);

  useEffect(() => {
    const handlePopState = () => {
      const newPath = window.location.pathname + window.location.search;
      setCurrentPath(newPath);
      setQueryParams(parseQueryParams(newPath));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, [currentPath]);

  useEffect(() => {
    if (isAuthenticated && currentPath === '/') {
      navigate('/home');
    } else if (!isAuthenticated && currentPath !== '/') {
      navigate('/');
    }
  }, [isAuthenticated, currentPath, navigate]);

  const updateQueryParams = useCallback((newParams: Record<string, string> | ((prevParams: Record<string, string>) => Record<string, string>)) => {
    setQueryParams(prevParams => {
      const updatedParams = typeof newParams === 'function' ? newParams(prevParams) : { ...prevParams, ...newParams };
      const newUrl = new URL(window.location.href);
      Object.entries(updatedParams).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          newUrl.searchParams.delete(key);
        } else {
          newUrl.searchParams.set(key, value);
        }
      });
      window.history.replaceState({}, '', newUrl.toString());
      return updatedParams;
    });
  }, []);

  return (
    <NavigationContext.Provider value={{
      currentPath,
      navigate,
      isAuthenticated,
      queryParams,
      setQueryParams: updateQueryParams
    }}>
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
