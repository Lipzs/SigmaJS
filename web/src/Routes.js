import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Cadastro from "./pages/register";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
      </Switch>
      <Switch>
        <Route exact path="/register" component={Cadastro} />
      </Switch>
    </BrowserRouter>
  );
}
