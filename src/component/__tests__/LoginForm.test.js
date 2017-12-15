import React from "react";
import { LoginForm } from "../LoginForm";
import { shallow } from "enzyme";
import { Form, Button } from "semantic-ui-react";
import { styled } from "styled-components";

describe("Components LoginForm", () => {
  const wrapper = shallow(
    <LoginForm
      match={{ params: { loginError: "", registrationError: "" } }}
      authLoginRequest={jest.fn()}
      authRegistrationRequest={jest.fn()}
    />,
  );

  describe("Метод Render", () => {
    it('Содержит Form.Input с name="email', () => {
      expect(
        wrapper.findWhere(
          el => el.type() === Form.Input && el.prop("name") === "email",
        ),
      ).toHaveLength(1);
    });

    it('Содержит Form.Input с name="email', () => {
      expect(
        wrapper.findWhere(
          el => el.type() === Form.Input && el.prop("name") === "password",
        ),
      ).toHaveLength(1);
    });

    it("Содержит кнопку отправки формы", () => {
      expect(wrapper.find(Button)).toHaveLength(1);
    });

    it("Содержит элемент <a> меняющий состояние формы вход/регистрация", () => {
      const authorized = wrapper.state().fromIsLogin;
      wrapper.find("a").simulate("click", { preventDefault: jest.fn() });
      expect(wrapper.state().fromIsLogin).toEqual(!authorized);
    });
  });

  describe("Содержит методы", () => {
    it("handleToggleForm", () => {
      expect(wrapper.instance().handleToggleForm).toBeDefined();
    });
    it("handelChange", () => {
      expect(wrapper.instance().handelChange).toBeDefined();
    });
    it("handleSubmit", () => {
      expect(wrapper.instance().handleSubmit).toBeDefined();
    });
  });
});
