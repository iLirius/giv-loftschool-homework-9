import React from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import { shallow } from "enzyme";
import { Input, Button } from "semantic-ui-react";
import { styled } from "styled-components";

describe("Components LoginForm", () => {
  const wrapper = shallow(
    <LoginForm
      match={{ params: { loginError: "", registationError: "" } }}
      authLoginRequest={jest.fn()}
      authRegistrationRequest={jest.fn()}
    />,
  );

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
