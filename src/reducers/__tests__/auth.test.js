import {
  authLoginSuccess,
  authLoginFailure,
  authRegistrationSuccess,
  authRegistrationFailure,
} from "../../actions/auth";
import auth from "../auth";

describe("In auth reducer", () => {
  describe("action authLoginRequest", () => {
    it("изменение isAuthorized", () => {
      const next = auth({ isAuthorized: false }, authLoginSuccess());
      expect(next.isAthorized).toBeTruthy;
    });
  });

  describe("action authRegistrationSuccess", () => {
    it("изменение isAuthorized", () => {
      const next = auth({ isAuthorized: false }, authRegistrationSuccess());
      expect(next.isAthorized).toBeTruthy;
    });
    it("clear loginError field", () => {
      const next = auth({ loginError: "error" }, authRegistrationSuccess());
      expect(next.loginError).toBeNull();
    });
    it("clear registrationError field", () => {
      const next = auth(
        { registrationError: "error" },
        authRegistrationSuccess(),
      );
      expect(next.registrationError).toBeNull();
    });
  });

  describe("action authLoginFailure", () => {
    it("loginError field", () => {
      const payload = "error";
      const next = auth({ loginError: null }, authLoginFailure(payload));
      expect(next.loginError).toEqual(payload);
    });
  });

  describe("action authRegistrationFailure", () => {
    it("registrationError field", () => {
      const payload = "error";
      const next = auth(
        { registrationError: null },
        authRegistrationFailure(payload),
      );
      expect(next.registrationError).toEqual(payload);
    });
  });
});
