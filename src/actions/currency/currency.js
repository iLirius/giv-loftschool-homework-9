import { createActions } from "redux-actions";

export const {
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
  },
});
