export type NavigationState = {
  currentRoute: string;
  routeParams?: Record<string, any>; // Optional You can Add data to your route like some UserInfo | which component are you coming from
}
export type Action = {
  type: string; // This will a Trigger Action that will start an action to switch route
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
