import { take, put, call, select, takeLatest, fork } from "redux-saga/effects";
import {
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
  authRegistrationRequest,
  authRegistrationSuccess,
  authRegistrationFailure,
  authLogout,
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
        const action = yield take([authLoginSuccess, authRegistrationSuccess]);
        token = action.payload;
      }
    }
    yield call(setTokenApi, token);
    yield call(setTokenToLocalStorage, token);
    yield take(authLogout);
    yield call(removeTokenFromLocalStorage);
    yield call(clearTokenApi);
  }
}

export function* onAuthLoginFlow(action) {
  try {
    yield call(login, action.payload);
    yield put(authLoginSuccess());
  } catch (error) {
    yield put(authLoginFailure(error.data.message));
  }
}
export function* onAuthRegistrationFlow(action) {
  try {
    yield call(registration, action.payload);
    yield put(authRegistrationSuccess());
  } catch (error) {
    yield put(authRegistrationFailure(error.data.message));
  }
}

export function* onAuthLoginFlowWatch() {
  yield takeLatest(authLoginRequest, onAuthLoginFlow);
}

export function* onAuthRegistrationFlowWatch() {
  yield takeLatest(authRegistrationRequest, onAuthRegistrationFlow);
}
