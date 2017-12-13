import wallet from "../wallet";
import {
  fetchWalletRequest,
  fetchWalletSuccess,
  fetchWalletFailure
} from "../../actions/wallet";
import {
  buyCurrencySuccess,
  sellCurrencySuccess,
  buyCurrencyFailure,
  sellCurrencyFailure
} from "../../actions/currency";

describe("In wallet reducer", () => {
  describe("action fetchWalletRequest", () => {
    it("change isLoading from false to true", () => {
      const next = wallet({ isLoading: false }, fetchWalletRequest());
      expect(next.isLoading).toBeTruthy;
    });
    it("clear error message", () => {
      const next = wallet({ error: "error!!" }, fetchWalletRequest());
      expect(next.error).toBeNull;
    });
  });
  describe("action fetchWalletSuccess", () => {
    const payload = {
      data: {
        result: {
          btc: 12,
          eth: 0.5,
          usd: 10000
        }
      }
    };
    it("change isLoading from true to false", () => {
      const next = wallet({ isLoading: true }, fetchWalletSuccess(payload));
      expect(next.isLoading).toBeFalsy;
    });
    it("clear error message", () => {
      const next = wallet({ error: "error!" }, fetchWalletSuccess(payload));
      expect(next.isLoading).toBeNull;
    });
    it("fill with data coins.btc filed", () => {
      const next = wallet({ coins: { btc: 0 } }, fetchWalletSuccess(payload));
      expect(next.coins.btc).toEqual(payload.data.result.btc);
    });
    it("fill with data coins.eth filed", () => {
      const next = wallet({ coins: { eth: 0 } }, fetchWalletSuccess(payload));
      expect(next.coins.eth).toEqual(payload.data.result.eth);
    });
    it("fill with data coins.usd filed", () => {
      const next = wallet({ coins: { usd: 0 } }, fetchWalletSuccess(payload));
      expect(next.coins.usd).toEqual(payload.data.result.usd);
    });
  });
  describe("action fetchWalletFailure", () => {
    const payload = new Error("warn");
    it("change isLoading from true to false", () => {
      const next = wallet({ isLoading: true }, fetchWalletFailure(payload));
      expect(next.isLoading).toBeFalsy;
    });
    it("fill with data error filed", () => {
      const next = wallet({ error: null }, fetchWalletFailure(payload));
      expect(next.error).toEqual(payload);
    });
  });
  describe("action buyCurrencySuccess", () => {
    const payload = {
      data: {
        btc: 12,
        eth: 0.5,
        usd: 10000
      }
    };
    it("fill with data coins.btc filed", () => {
      const next = wallet({ coins: { btc: 0 } }, buyCurrencySuccess(payload));
      expect(next.coins.btc).toEqual(payload.data.btc);
    });
    it("fill with data coins.eth filed", () => {
      const next = wallet({ coins: { eth: 0 } }, buyCurrencySuccess(payload));
      expect(next.coins.eth).toEqual(payload.data.eth);
    });
    it("fill with data coins.usd filed", () => {
      const next = wallet({ coins: { usd: 0 } }, buyCurrencySuccess(payload));
      expect(next.coins.usd).toEqual(payload.data.usd);
    });
  });
  describe("action buyCurrencyFailure", () => {
    const payload = new Error("warn");
    it("fill with data error filed", () => {
      const next = wallet({ error: null }, buyCurrencyFailure(payload));
      expect(next.error).toEqual(payload);
    });
  });
  describe("action sellCurrencySuccess", () => {
    const payload = {
      data: {
        btc: 12,
        eth: 0.5,
        usd: 10000
      }
    };
    it("fill with data coins.btc filed", () => {
      const next = wallet({ coins: { btc: 0 } }, sellCurrencySuccess(payload));
      expect(next.coins.btc).toEqual(payload.data.btc);
    });
    it("fill with data coins.eth filed", () => {
      const next = wallet({ coins: { eth: 0 } }, sellCurrencySuccess(payload));
      expect(next.coins.eth).toEqual(payload.data.eth);
    });
    it("fill with data coins.usd filed", () => {
      const next = wallet({ coins: { usd: 0 } }, sellCurrencySuccess(payload));
      expect(next.coins.usd).toEqual(payload.data.usd);
    });
  });
  describe("action sellCurrencyFailure", () => {
    const payload = new Error("warn");
    it("fill with data error filed", () => {
      const next = wallet({ error: null }, sellCurrencyFailure(payload));
      expect(next.error).toEqual(payload);
    });
  });
});
