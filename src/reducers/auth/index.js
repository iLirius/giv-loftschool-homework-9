import {
  default as auth,
  getIsAuthorized as _getIsAuthorized,
  getLoginError as _getLoginError,
  getregistrationError as _getregistrationError,
} from "./auth";

export const getIsAuthorized = _getIsAuthorized;
export const getLoginError = _getLoginError;
export const getregistrationError = _getregistrationError;

export default auth;
