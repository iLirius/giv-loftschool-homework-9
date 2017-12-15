import React from "react";
import { AppRouter } from "../AppRouter";
import { PrivateRoute } from "../PrivateRoute";
import { shallow } from "enzyme";
import { Route, Redirect } from "react-router-dom";

describe("Компонент AppRouter", () => {
  const wrapper = shallow(<AppRouter />);
  describe("Проверить наличие:", () => {
    it("Содержит компонент Switch", () => {
      expect(wrapper.find("Switch")).toHaveLength(1);
    });
  });
  it('Содержит элемент <Route path="/login" />', () => {
    expect(
      wrapper.findWhere(
        el => el.type() === Route && el.props().path === "/login",
      ),
    ).toHaveLength(1);
  });

  it("Содержит редирект на '/profile'", () => {
    expect(
      wrapper.findWhere(
        el => el.type() === Redirect && el.props().to === "/profile",
      ),
    ).toHaveLength(1);
  });
});
