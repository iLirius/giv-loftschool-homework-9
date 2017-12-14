import currency from "../currency";
import {
  selectBtc,
  selectEth,
  fetchCurrencyBtcRequest,
  fetchCurrencyEthRequest,
  fetchCurrencyBtcSuccess,
  fetchCurrencyBtcFailure,
  fetchCurrencyEthFailure,
  fetchCurrencyEthSuccess,
  selectOffset,
} from "../../actions/currency";

describe("In currency reducer", () => {
  describe("action selectBtc", () => {
    it("change selected field to \"btc\"", () => {
      const next = currency({ selected: "eth" }, selectBtc());
      expect(next.selected).toEqual("btc");
    });
  });
  describe("action selectEth", () => {
    it("change selected field to \"eth\"", () => {
      const next = currency({ selected: "btc" }, selectEth());
      expect(next.selected).toEqual("eth");
    });
  });
  describe("action fetchCurrencyBtcRequest", () => {
    it("change isBtcLoading from false to true", () => {
      const next = currency({ isBtcLoading: false }, fetchCurrencyBtcRequest());
      expect(next.isBtcLoading).toBeTruthy;
    });
  });
  describe("action fetchCurrencyEthRequest", () => {
    it("change isEthLoading from false to true", () => {
      const next = currency({ isEthLoading: false }, fetchCurrencyEthRequest());
      expect(next.isEthLoading).toBeTruthy;
    });
  });

  describe("action fetchCurrencyBtcSuccess", () => {
    const payload = [1, 2, 3];
    it("change isBtcLoading from true to false", () => {
      const next = currency(
        { isBtcLoading: true },
        fetchCurrencyBtcSuccess(payload),
      );
      expect(next.isBtcLoading).toBeFalsy;
    });
    it("fill with data btc field", () => {
      const next = currency({ btc: [] }, fetchCurrencyBtcSuccess(payload));
      expect(next.btc).toEqual(payload);
    });
  });
  describe("action fetchCurrencyEthSuccess", () => {
    const payload = [1, 2, 3];
    it("change isEthLoading from true to false", () => {
      const next = currency(
        { isEthLoading: true },
        fetchCurrencyEthSuccess(payload),
      );
      expect(next.isEthLoading).toBeFalsy;
    });
    it("fill with data eth field", () => {
      const next = currency({ eth: [] }, fetchCurrencyEthSuccess(payload));
      expect(next.eth).toEqual(payload);
    });
  });
  describe("action fetchCurrencyBtcFailure", () => {
    it("change isBtcLoading from true to false", () => {
      const next = currency({ isBtcLoading: true }, fetchCurrencyBtcFailure());
      expect(next.isBtcLoading).toBeFalsy;
    });
  });
  describe("action fetchCurrencyEthFailure", () => {
    it("change isEthLoading from true to false", () => {
      const next = currency({ isEthLoading: true }, fetchCurrencyEthFailure());
      expect(next.isEthLoading).toBeFalsy;
    });
  });
  describe("action selectOffset", () => {
    const payload = "1d";
    it("set offset field value", () => {
      const next = currency({ offset: "4h" }, selectOffset(payload));
      expect(next.offset).toEqual(payload);
    });
  });
});
