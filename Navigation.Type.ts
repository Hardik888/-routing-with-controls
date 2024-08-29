export type NavigationState = {
  currentRoute: string;
  routeParams?: Record<string, any>; // Optional You can Add data to your route like some UserInfo | which component are you coming from
}
export type Action = {
  type: string; //  start an action to switch route like from home -> contacts , contacts -> profile
  data?: any; // Optional You can add data here
}
export type NavigationConfig = {
  initialRoute: string;
  routes: string[]; // Contains all the routes
}
export type NavigationContextType = {
  state: NavigationState;
  navigate: (route: string, params?: Record<string, any>) => void;
}
