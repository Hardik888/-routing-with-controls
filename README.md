🎉   My Navigation Sidekick For React!
## 🚀 How I use.
## Routing Config
```typescript
const config = {
  initialRoute: 'home',
  routes: ['home', 'about', 'contact'],
};

```
## Just add the config in the Provider
```typescript
const App: React.FC = () => {
  return (
    <NavigationProvider config={config}>
      <MainComponent /> 
    </NavigationProvider>
  );
};
```

## Sample Main Component
```typescript
import React from 'react';
const MainComponent: React.FC = () => {
  const { state, navigate } = useNavigation();
  const renderRoute = () => {
    switch (state.currentRoute) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <NotFound />;
    }
  };
  return (
    <div>
      <nav>
        <button onClick={() => navigate('home')}>Home</button>
        <button onClick={() => navigate('about')}>About</button>
        <button onClick={() => navigate('contact', { from: 'home', reason: 'info' })}>
          Contact
        </button>
      </nav>
      <div>Current Route: {state.currentRoute}</div>
      <div>{renderRoute()}</div>
    </div>
  );
};

const Home: React.FC = () => <div>Home Page</div>;

const About: React.FC = () => <div>About Us</div>;

const Contact: React.FC = () => {
  const { state } = useNavigation();
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Route Parameters: {JSON.stringify(state.routeParams)}</p>
    </div>
  );
};

const NotFound: React.FC = () => <div>404 - Not Found</div>;
```
