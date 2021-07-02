import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { useAuth } from './contexts/authContext';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import Play from './pages/play';

const ProtectedRoute = ({ children, ...rest }) => {
  
  const { currentUser } =  useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        )
      }
    />
  );
};

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path="/home">
          <Home/>
        </ProtectedRoute>
        <ProtectedRoute exact path="/play">
          <Play/>
        </ProtectedRoute>
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
