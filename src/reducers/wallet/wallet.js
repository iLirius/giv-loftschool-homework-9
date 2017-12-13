import { combineReducers } from "redux";
import { handleAction, handleActions } from "redux-actions";
import {
  fetchWalletFailure,
  fetchWalletRequest,
  fetchWalletSuccess,
} from "../../actions/wallet";

const error = handleAction(fetchWalletFailure, (state, action) => {}, false);

const isLoading = handleActions(
  {
    [fetchWalletFailure]: () => true,
    [fetchWalletRequest]: () => false,
    [fetchWalletSuccess]: () => true,
  },
  false,
);
const coins = handleAction(
  fetchWalletSuccess,
  (state, action) => ({ ...state, ...action.payload }),
  {
    usd: 0,
    btc: 0,
    eth: 0,
  },
);

export const getError = state => state.wallet.error;
export const getCoinsUsd = state =>
  state.wallet.coins.usd.toString().split(".");
export const getCoinsBtc = state =>
  state.wallet.coins.btc.toString().split(".");
export const getCoinsEth = state =>
  state.wallet.coins.eth.toString().split(".");

export default combineReducers({ error, isLoading, coins });
