import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/login';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}
