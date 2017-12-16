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
    logout: authLogout,
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
    LOGOUT: undefined,
  },
});

export {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
  authRegistrationRequest,
  authRegistrationSuccess,
  authRegistrationFailure,
  authLogout,
};
