type RouteConfig = {
  path: string;
  component: React.FC<any>;
  props?: any;
}

export const routes: RouteConfig[] = [
  {
    path: '/home',
    component: Landing,
    props: { message: 'Welcome to Home Page!' }
  },
  {
    path: '/',
    component: Login,
    props: { message: 'Login' }
  },
];

type RouteProps = {
  href: string;
  component: React.FC<any>;
  props?: any;
}
export const Route: React.FC<RouteProps> = ({ href, component: Component, props }) => {
  const { currentPath } = useNavigation();
  return currentPath === href ? <Component {...props} /> : null;
};
