import * as React from "react";
import { connect } from "react-redux";
import { Button, Form, Segment } from "semantic-ui-react";
import Particles from "react-particles-js";
import particlesParams from "../../config/particles-params";

import { authLoginRequest, authRegistrationRequest } from "../../actions/auth";
import { getLoginError, getregistrationError } from "../../reducers/auth";

import Logo from "../../assets/img/Logo.svg";
import "./LoginForm.css";

export class LoginForm extends React.PureComponent {
  state = {
    email: { value: "", isError: false },
    password: { value: "", isError: false },
    fromIsLogin: true,
  };

  handleToggleForm = event => {
    event.preventDefault();
    const { fromIsLogin } = this.state;
    this.setState({ fromIsLogin: !fromIsLogin });
  };

  handelChange = event => {
    const { value, name } = event.target;
    let reg = new RegExp(/\S+@\S+\.\S+/),
      isError = false;

    if (!reg.test(value) && value.length && name === "email") {
      isError = true;
    }

    this.setState({ [name]: { value: value, isError: isError } });
  };

  handleSubmit = event => {
    const { authLoginRequest, authRegistrationRequest } = this.props;
    const { fromIsLogin, email, password } = this.state;
    let _email = email.value,
      _password = password.value;

    if (_email.trim().length && !email.isError && _password.trim().length) {
      event.preventDefault();
      fromIsLogin
        ? authLoginRequest({ email: _email, password: _password })
        : authRegistrationRequest({ email: _email, password: _password });
    }
  };
  render() {
    const { email, password, fromIsLogin } = this.state;
    const { loginError, registrationError } = this.props;

    return (
      <div className="wraper">
        <Particles params={particlesParams} className="particles" />
        <div className="login-form">
          <div className="login-form--header">
            <img className="login-form--logo" src={Logo} alt="project logo" />
          </div>
          <Form>
            <Segment raised>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={this.handelChange}
                error={email.isError}
                value={email.value}
                required
                name="email"
                type="email"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                value={password.value}
                onChange={this.handelChange}
                required
              />
              <div className="login-form--errorMessage">
                {loginError || (registrationError && registrationError.email)}
              </div>
              <Button
                color="teal"
                fluid
                className="login-form--btn-submit"
                onClick={this.handleSubmit}
              >
                {!fromIsLogin ? "Зарегистрироваться" : "Войти"}
              </Button>
            </Segment>
          </Form>
          <Segment raised textAlign="center" size="large">
            {fromIsLogin ? "Впервые на сайте?" : "Уже зарегистрированы?"}{" "}
            <a href="" onClick={this.handleToggleForm}>
              {fromIsLogin ? "Регистрация" : "Войти"}
            </a>
          </Segment>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginError: getLoginError(state),
  registrationError: getregistrationError(state),
});

const mapDispatchToProps = {
  authLoginRequest,
  authRegistrationRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
