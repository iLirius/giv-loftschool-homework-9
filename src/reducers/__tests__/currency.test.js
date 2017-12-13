import currency from "../currency";
import {
  selectBtc,
  selectEth,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  fetchEthSuccess,
  selectOffset
} from "../../actions/currency";

describe("In currency reducer", () => {
  describe("action selectBtc", () => {
    it('change selected field to "btc"', () => {
      const next = currency({ selected: "eth" }, selectBtc());
      expect(next.selected).toEqual("btc");
    });
  });
  describe("action selectEth", () => {
    it('change selected field to "eth"', () => {
      const next = currency({ selected: "btc" }, selectEth());
      expect(next.selected).toEqual("eth");
    });
  });
  describe("action fetchBtcRequest", () => {
    it("change isBtcLoading from false to true", () => {
      const next = currency({ isBtcLoading: false }, fetchBtcRequest());
      expect(next.isBtcLoading).toBeTruthy;
    });
  });
  describe("action fetchEthRequest", () => {
    it("change isEthLoading from false to true", () => {
      const next = currency({ isEthLoading: false }, fetchEthRequest());
      expect(next.isEthLoading).toBeTruthy;
    });
  });
  describe("action fetchBtcSuccess", () => {
    const payload = [1, 2, 3];
    it("change isBtcLoading from true to false", () => {
      const next = currency({ isBtcLoading: true }, fetchBtcSuccess(payload));
      expect(next.isBtcLoading).toBeFalsy;
    });
    it("fill with data btc field", () => {
      const next = currency({ btc: [] }, fetchBtcSuccess(payload));
      expect(next.btc).toEqual(payload);
    });
  });
  describe("action fetchEthSuccess", () => {
    const payload = [1, 2, 3];
    it("change isEthLoading from true to false", () => {
      const next = currency({ isEthLoading: true }, fetchEthSuccess(payload));
      expect(next.isEthLoading).toBeFalsy;
    });
    it("fill with data eth field", () => {
      const next = currency({ eth: [] }, fetchEthSuccess(payload));
      expect(next.eth).toEqual(payload);
    });
  });
  describe("action fetchBtcFailure", () => {
    it("change isBtcLoading from true to false", () => {
      const next = currency({ isBtcLoading: true }, fetchBtcFailure());
      expect(next.isBtcLoading).toBeFalsy;
    });
  });
  describe("action fetchEthFailure", () => {
    it("change isEthLoading from true to false", () => {
      const next = currency({ isEthLoading: true }, fetchEthFailure());
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
