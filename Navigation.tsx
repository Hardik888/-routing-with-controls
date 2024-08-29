import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import {
  NavigationState,
  Action,
  NavigationConfig,
  NavigationContextType,
} from './Navigation.type';

const initialState: NavigationState = {
  currentRoute: '',
  routeParams: {},
};
const navigationReducer = (state: NavigationState, action: Action): NavigationState => {
  switch (action.type) {
    case 'NAVIGATE':
      return {
        ...state,
        currentRoute: action.data.route,
        routeParams: action.data.params || {},
      };
    default:
      return state;
  }
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);
export const NavigationProvider: React.FC<{ config: NavigationConfig; children: ReactNode }> = ({
  config,
  children,
}) => {
  const [state, dispatch] = useReducer(navigationReducer, {
    ...initialState,
    currentRoute: config.initialRoute,
  });
  const navigate = (route: string, params?: Record<string, any>) => {
    dispatch({
      type: 'NAVIGATE',
      data: { route, params },
    });
  };

  return (
    <NavigationContext.Provider value={{ state, navigate }}>
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
