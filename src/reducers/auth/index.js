import {
  default as auth,
  getIsAuthorized as _getIsAuthorized,
  getLoginError as _getLoginError,
  getRegistationError as _getRegistationError,
} from "./auth";

export const getIsAuthorized = _getIsAuthorized;
export const getLoginError = _getLoginError;
export const getRegistationError = _getRegistationError;

export default auth;
