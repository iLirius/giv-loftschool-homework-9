import { put, call } from "redux-saga/effects";
import { onFetchWalletRequest, fetchWalletWatch } from "../wallet";
import { buyCurrencyFlow, sellCurrencyFlow } from "../currency";
import {
  buyCurrencySuccess,
  buyCurrencyFailure,
  sellCurrencySuccess,
  sellCurrencyFailure,
} from "../../actions/currency";
import { fetchWalletSuccess, fetchWalletFailure } from "../../actions/wallet";
import { getWallet, buyCurrency, sellCurrency } from "../../api";

describe("Saga Wallet", () => {
  describe("if buyCurrencyRequest", () => {
    it("call buyCurrency from api", () => {
      const action = { payload: { currencyName: "eth", value: 1 } };
      const saga = buyCurrencyFlow(action);
      expect(saga.next().value).toEqual(
        call(buyCurrency, action.payload.currencyName, action.payload.value),
      );
    });
    it("dispatch buyCurrencySuccess() with results, if byuCurrency success", () => {
      const action = { payload: { currencyName: "eth", value: 1 } };
      const saga = buyCurrencyFlow(action);
      const result = { data: { btc: 1, eth: 1, usd: 1 } };
      saga.next();
      expect(saga.next(result).value).toEqual(
        put(buyCurrencySuccess(result.data)),
      );
    });
    it("dispatch buyCurrencyFailure() with error, if byuCurrency failure", () => {
      const action = { payload: { currencyName: "eth", value: 1 } };
      const saga = buyCurrencyFlow(action);
      const error = new Error("error!");
      saga.next();
      expect(saga.throw(error).value).toEqual(put(buyCurrencyFailure(error)));
    });
  });
  describe("if sellCurrencyRequest", () => {
    it("call sellCurrency from api", () => {
      const action = { payload: { currencyName: "eth", value: 1 } };
      const saga = sellCurrencyFlow(action);
      expect(saga.next().value).toEqual(
        call(sellCurrency, action.payload.currencyName, action.payload.value),
      );
    });
    it("dispatch sellCurrencySuccess() with results, if byuCurrency success", () => {
      const action = { payload: { currencyName: "eth", value: 1 } };
      const saga = sellCurrencyFlow(action);
      const result = { data: { btc: 1, eth: 1, usd: 1 } };
      saga.next();
      expect(saga.next(result).value).toEqual(
        put(sellCurrencySuccess(result.data)),
      );
    });
    it("dispatch sellCurrencyFailure() with error, if byuCurrency failure", () => {
      const action = { payload: { currencyName: "eth", value: 1 } };
      const saga = sellCurrencyFlow(action);
      const error = new Error("error!");
      saga.next();
      expect(saga.throw(error).value).toEqual(put(sellCurrencyFailure(error)));
    });
  });
  describe("Если отправлен экшен fetchWalletRequest", () => {
    const saga = onFetchWalletRequest();

    it("Вызвать из api getWallet", () => {
      expect(saga.next().value).toEqual(call(getWallet));
    });
  });
});
