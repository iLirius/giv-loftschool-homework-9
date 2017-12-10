import { take, put, call, select, takeLatest, fork } from "redux-saga/effects";
import {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
  authRegistrationRequest,
  authRegistrationFailure,
  authLogoutRequest,
  // authLogoutFailure,
} from "../../actions/auth";
import { setTokenApi, clearTokenApi, login, registration } from "../../api";
import { getIsAuthorized } from "../../reducers/auth";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage,
} from "../../localStorage";

export function* authFlow() {
  while (true) {
    const isAuthorized = yield select(getIsAuthorized);
    const localStorageToken = yield call(getTokenFromLocalStorage);
    let token;

    if (!isAuthorized) {
      if (localStorageToken) {
        token = localStorageToken;
        yield put(authLoginSuccess());
      } else {
        const action = yield take(authLoginSuccess);
        token = action.payload;
      }
    }

    yield call(setTokenApi, token);
    yield call(setTokenToLocalStorage, token);
    yield take(authLogoutRequest);
    yield call(removeTokenFromLocalStorage);
    yield call(clearTokenApi);
  }
}

export function* onAuthRequestsFlow(action) {
  if (authLoginRequest.toString() === action.type) {
    try {
      const data = yield call(login, action.payload),
        token = data.data.jwt;

      yield put(authLoginSuccess());
      yield call(setTokenApi, token);
      yield call(setTokenToLocalStorage, token);
    } catch (error) {
      yield put(authLoginFailure(error.data.message));
    }
  }
  if (authRegistrationRequest.toString() === action.type) {
    try {
      yield call(registration, action.payload);
    } catch (error) {
      yield put(authRegistrationFailure(error.data.message));
    }
  }
}

export function* onAuthRequestsWatch() {
  yield takeLatest(
    [authLoginRequest, authRegistrationRequest],
    onAuthRequestsFlow,
  );
  yield fork(authFlow);
}