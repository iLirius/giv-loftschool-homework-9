import { createActions } from "redux-actions";

const {
  auth: {
    login: {
      request: authLoginRequest,
      success: authLoginSuccess,
      failure: authLoginFailure,
    },
    registration: {
      request: authRegistrationRequest,
      success: authRegistrationSuccess,
      failure: authRegistrationFailure,
    },
    logout: {
      request: authLogoutRequest,
      success: authLogoutSuccess,
      failure: authLogoutFailure,
    },
  },
} = createActions({
  AUTH: {
    LOGIN: {
      REQUEST: [data => data, () => {}],
      SUCCESS: [data => data, () => {}],
      FAILURE: [data => data, () => {}],
    },
    REGISTRATION: {
      REQUEST: [data => data, () => {}],
      SUCCESS: [data => data, () => {}],
      FAILURE: [data => data, () => {}],
    },
    LOGOUT: {
      REQUEST: [data => data, () => {}],
      SUCCESS: [data => data, () => {}],
      FAILURE: [data => data, () => {}],
    },
  },
});

export {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
  authRegistrationRequest,
  authRegistrationSuccess,
  authRegistrationFailure,
  authLogoutRequest,
  authLogoutSuccess,
  authLogoutFailure,
};
