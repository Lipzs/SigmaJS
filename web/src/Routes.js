import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { isAuthenticated } from './services/auth';
import Login from "./pages/login";
import Register from "./pages/register";
import Home from './pages/home';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    ))}
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/home" component={Home} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
