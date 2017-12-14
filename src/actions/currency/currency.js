import { createActions } from "redux-actions";

const {
  currency: {
    fetch: {
      btc: {
        failure: fetchCurrencyBtcFailure,
        request: fetchCurrencyBtcRequest,
        success: fetchCurrencyBtcSuccess,
      },
      eth: {
        failure: fetchCurrencyEthFailure,
        request: fetchCurrencyEthRequest,
        success: fetchCurrencyEthSuccess,
      },
    },
    select: { btc: selectBtc, eth: selectEth, offset: selectOffset },
    buy: {
      failure: buyCurrencyFailure,
      request: buyCurrencyRequest,
      success: buyCurrencySuccess,
    },
    sell: {
      failure: sellCurrencyFailure,
      request: sellCurrencyRequest,
      success: sellCurrencySuccess,
    },
  },
} = createActions({
  CURRENCY: {
    FETCH: {
      BTC: {
        FAILURE: undefined,
        REQUEST: undefined,
        SUCCESS: undefined,
      },
      ETH: {
        FAILURE: undefined,
        REQUEST: undefined,
        SUCCESS: undefined,
      },
    },
    SELECT: {
      BTC: undefined,
      ETH: undefined,
      OFFSET: undefined,
    },
    BUY: {
      FAILURE: undefined,
      REQUEST: undefined,
      SUCCESS: undefined,
    },
    SELL: {
      FAILURE: undefined,
      REQUEST: undefined,
      SUCCESS: undefined,
    },
  },
});

export {
  fetchCurrencyBtcFailure,
  fetchCurrencyBtcRequest,
  fetchCurrencyBtcSuccess,
  fetchCurrencyEthFailure,
  fetchCurrencyEthRequest,
  fetchCurrencyEthSuccess,
  selectBtc,
  selectEth,
  selectOffset,
  buyCurrencyFailure,
  buyCurrencyRequest,
  buyCurrencySuccess,
  sellCurrencyFailure,
  sellCurrencyRequest,
  sellCurrencySuccess,
};
