import { createActions } from "redux-actions";

export const {
  auth: {
    login: {
      request: authLoginRequest,
      success: authLoginSuccess,
      failure: authLoginFailure,
    },
    registration: {
      request: authRegistrationRequest,
      failure: authRegistrationFailure,
    },
    logout: { request: authLogoutRequest, failure: authLogoutFailure },
  },
} = createActions({
  AUTH: {
    LOGIN: {
      REQUEST: [data => data, () => {}],
      SUCCESS: [data => data, () => {}],
      FAILURE: undefined,
    },
    REGISTRATION: {
      REQUEST: [data => data, () => {}],
      FAILURE: undefined,
    },
    LOGOUT: {
      REQUEST: [data => data, () => {}],
      FAILURE: undefined,
    },
  },
});
