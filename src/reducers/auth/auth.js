import { combineReducers } from "redux";
import {
  // handleAction,
  handleActions,
} from "redux-actions";
import {
  authLoginSuccess,
  authLoginFailure,
  authRegistrationSuccess,
  authRegistrationFailure,
} from "../../actions/auth";

export const isAuthorized = handleActions(
  {
    [authLoginSuccess]: () => true,
    [authRegistrationSuccess]: () => true,
  },
  false,
);
export const loginError = handleActions(
  {
    [authLoginFailure]: (state, action) => action.payload,
    [authLoginSuccess]: () => null,
    [authRegistrationSuccess]: () => null,
  },
  null,
);
export const registrationError = handleActions(
  {
    [authLoginSuccess]: () => null,
    [authRegistrationFailure]: (state, action) => action.payload,
    [authRegistrationSuccess]: () => null,
  },
  null,
);

export default combineReducers({
  isAuthorized,
  loginError,
  registrationError,
});

export const getIsAuthorized = state => state.auth.isAuthorized;
export const getLoginError = state => state.auth.loginError;
export const getregistrationError = state => state.auth.registrationError;
