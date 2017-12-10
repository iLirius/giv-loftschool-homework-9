import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import LoginForm from "../LoginForm";
import UserProfile from "../UserProfile";

class AppRouter extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/login" exact={true} component={LoginForm} />
          <PrivateRoute path="/profile" component={UserProfile} />
          <Redirect to="/login" />
        </Switch>
      </div>
    );
  }
}
export default AppRouter;
