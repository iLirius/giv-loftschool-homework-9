import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import {
  fetchWalletFailure,
  fetchWalletRequest,
  fetchWalletSuccess,
} from "../../actions/wallet";
import {
  buyCurrencySuccess,
  sellCurrencySuccess,
  buyCurrencyFailure,
  sellCurrencyFailure,
} from "../../actions/currency";

export const error = handleActions(
  {
    [fetchWalletRequest]: () => null,
    [fetchWalletSuccess]: () => null,
    [fetchWalletFailure]: (state, action) => action.payload,
    [buyCurrencyFailure]: (state, action) => action.payload,
    [sellCurrencyFailure]: (state, action) => action.payload,
  },
  null,
);

const isLoading = handleActions(
  {
    [fetchWalletFailure]: () => true,
    [fetchWalletRequest]: () => false,
    [fetchWalletSuccess]: () => true,
  },
  false,
);

const btc = handleActions(
  {
    [fetchWalletSuccess]: (state, action) => action.payload.btc,
    [buyCurrencySuccess]: (state, action) => action.payload.btc,
    [sellCurrencySuccess]: (state, action) => action.payload.btc,
  },
  0,
);
const eth = handleActions(
  {
    [fetchWalletSuccess]: (state, action) => action.payload.eth,
    [buyCurrencySuccess]: (state, action) => action.payload.eth,
    [sellCurrencySuccess]: (state, action) => action.payload.eth,
  },
  0,
);
const usd = handleActions(
  {
    [fetchWalletSuccess]: (state, action) => action.payload.usd,
    [buyCurrencySuccess]: (state, action) => action.payload.usd,
    [sellCurrencySuccess]: (state, action) => action.payload.usd,
  },
  0,
);

export const getError = state => state.wallet.error;
export const getCoinsUsd = state =>
  state.wallet.coins.usd.toString().split(".");
export const getCoinsBtc = state =>
  state.wallet.coins.btc.toString().split(".");
export const getCoinsEth = state =>
  state.wallet.coins.eth.toString().split(".");

const coins = combineReducers({ btc, eth, usd });
export default combineReducers({ error, isLoading, coins });
