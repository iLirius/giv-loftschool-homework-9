import {
  authLoginSuccess,
  authRegistrationSuccess,
  authLogout,
} from "../../actions/auth";
import { take, put, call, select } from "redux-saga/effects";
import { setTokenApi, clearTokenApi } from "../../api";
import { getIsAuthorized } from "../../reducers/auth";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage,
} from "../../localStorage";
import { authFlow } from "../auth";

describe("Saga AuthFlow", () => {
  const saga = authFlow();
  const token = 123;
  describe("Сценарий без токена авторизации в localstorage", () => {
    it("1. Эфект select getIsAuthorized", () => {
      expect(saga.next().value).toEqual(select(getIsAuthorized));
    });

    it("2. Эфект call getTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
    });

    it("3. Эфект take с ожиданием authLoginSuccess или authRegistrationSuccess", () => {
      expect(saga.next().value).toEqual(
        take([authLoginSuccess, authRegistrationSuccess]),
      );
    });

    it("4. Эфект call(setTokenApi, token) где токен, который получен из прошлого шага", () => {
      expect(saga.next({ payload: token }).value).toEqual(
        call(setTokenApi, token),
      );
    });

    it("5. Эфект call setTokenToLocalStorage", () => {
      expect(saga.next().value).toEqual(call(setTokenToLocalStorage, token));
    });
    it("6. Эфект take authLogout", () => {
      expect(saga.next().value).toEqual(take(authLogout));
    });

    it("7. Эфект call removeTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(removeTokenFromLocalStorage));
    });

    it("8. Эфект call clearTokenApi", () => {
      expect(saga.next().value).toEqual(call(clearTokenApi));
    });
  });

  describe("Сценарий c токеном авторизации из localstorage", () => {
    const localStorageToken = 123;

    it("1. Эфект select getIsAuthorized", () => {
      expect(saga.next().value).toEqual(select(getIsAuthorized));
    });
    it("2. Эфект call getTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(getTokenFromLocalStorage));
    });
    it("3. Эфект put(authLoginSuccess()) при наличии токена в LS", () => {
      expect(saga.next(localStorageToken).value).toEqual(
        put(authLoginSuccess()),
      );
    });
    it("4. Эфект call(setTokenApi, token) где токен, который получен из прошлого шага", () => {
      expect(saga.next({ payload: token }).value).toEqual(
        call(setTokenApi, token),
      );
    });

    it("5. Эфект call setTokenToLocalStorage", () => {
      expect(saga.next().value).toEqual(call(setTokenToLocalStorage, token));
    });
    it("6. Эфект take authLogout", () => {
      expect(saga.next().value).toEqual(take(authLogout));
    });

    it("7. Эфект call removeTokenFromLocalStorage", () => {
      expect(saga.next().value).toEqual(call(removeTokenFromLocalStorage));
    });

    it("8. Эфект call clearTokenApi", () => {
      expect(saga.next().value).toEqual(call(clearTokenApi));
    });
  });
});
