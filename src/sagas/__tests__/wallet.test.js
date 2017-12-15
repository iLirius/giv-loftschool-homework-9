import { takeLatest, put, call } from "redux-saga/effects";
import { onFetchWalletRequest } from "../wallet";
import {
  buyCurrencySuccess,
  buyCurrencyFailure,
  sellCurrencySuccess,
  sellCurrencyFailure,
} from "../../actions/currency";
import { fetchWalletSuccess, fetchWalletFailure } from "../../actions/wallet";
import { getWallet, buyCurrency, sellCurrency } from "../../api";

describe("Saga Wallet", () => {
  describe("Если отправлен экшен fetchWalletRequest", () => {
    it("Вызвать из api getWallet", () => {
      const saga = onFetchWalletRequest();
      expect(saga.next().value).toEqual(call(getWallet));
    });
    // it("Отправка данных в экшен fetchWalletSuccess() если результат запроса getWallet success", () => {
    //   const saga = onFetchWalletRequest();
    //   const result = { btc: 1, eth: 1, usd: 10000 };
    //   saga.next();
    //   console.log(saga);
    //   expect(saga.next(result).value).toEqual(put(fetchWalletSuccess(result)));
    // });
    // it("Отправка данных в экшен fetchWalletFailure() если результат error getWallet failure", () => {
    //   const saga = fetchWalletWatch();
    //   const error = new Error("error!");
    //   saga.next();
    //   expect(saga.throw(error).value).toEqual(put(fetchWalletFailure(error)));
    // });
  });
});
