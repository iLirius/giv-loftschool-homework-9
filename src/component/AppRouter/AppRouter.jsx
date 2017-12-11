import * as React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import PrivateRoute from "../PrivateRoute";
import LoginForm from "../LoginForm";
import UserProfile from "../UserProfile";
import Trade from "../Trade";
import { getIsAuthorized } from "../../reducers/auth";

export class AppRouter extends React.Component {
  render() {
    const { isAuthorized } = this.props;
    return (
      <Switch>
        <PrivateRoute path="/profile" component={UserProfile} />
        <PrivateRoute path="/trade/" component={Trade} />
        <PrivateRoute path="/trade/:name" component={Trade} />
        {!isAuthorized && <Route path="/login" component={LoginForm} />}
        <Redirect to="/profile" />
      </Switch>
    );
  }
}
const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
});

export default withRouter(connect(mapStateToProps)(AppRouter));
