import React from "react";
import { AppRouter } from "../AppRouter/AppRouter";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { shallow } from "enzyme";
import { Route, Redirect } from "react-router-dom";

describe("Компонент AppRouter", () => {
  const wrapper = shallow(<AppRouter />);
});
