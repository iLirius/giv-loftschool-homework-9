import * as React from "react";
import { Route, Redirect } from "react-router-dom";

export default class UserProfile extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route>
          <Redirect to="/trade/" />
        </Route>
      </React.Fragment>
    );
  }
}
