import { combineReducers } from "redux";
import {
  // handleAction,
  handleActions,
} from "redux-actions";
import {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
  authRegistrationRequest,
  // authRegistrationSuccess,
  authRegistrationFailure,
} from "../../actions/auth";

const initialState = null;

export const isAuthorized = handleActions(
  {
    [authLoginRequest]: () => false,
    [authLoginSuccess]: () => true,
    [authLoginFailure]: () => false,
    [authRegistrationRequest]: () => false,
    [authRegistrationFailure]: () => false,
  },
  false,
);
export const loginError = handleActions(
  {
    [authLoginRequest]: () => initialState,
    [authLoginSuccess]: () => initialState,
    [authLoginFailure]: (state, action) => action.payload,
    [authRegistrationRequest]: () => initialState,
    [authRegistrationFailure]: () => initialState,
  },
  null,
);
export const registationError = handleActions(
  {
    [authLoginRequest]: () => initialState,
    [authLoginSuccess]: () => initialState,
    [authLoginFailure]: () => initialState,
    [authRegistrationRequest]: () => initialState,
    [authRegistrationFailure]: (state, action) => action.payload,
  },
  null,
);

export default combineReducers({
  isAuthorized,
  loginError,
  registationError,
});

export const getIsAuthorized = state => state.auth.isAuthorized;
export const getLoginError = state => state.auth.loginError;
export const getRegistationError = state => state.auth.registationError;
