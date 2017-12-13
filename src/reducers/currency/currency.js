import { combineReducers } from "redux";
import { handleAction, handleActions } from "redux-actions";
import {
  selectBtc,
  selectEth,
  fetchCurrencyBtcFailure,
  fetchCurrencyBtcRequest,
  fetchCurrencyBtcSuccess,
  fetchCurrencyEthFailure,
  fetchCurrencyEthRequest,
  fetchCurrencyEthSuccess,
  selectOffset,
} from "../../actions/currency";

const selected = handleActions(
  {
    [selectBtc]: () => "btc",
    [selectEth]: () => "eth",
  },
  "btc",
);
const offset = handleAction(
  selectOffset,
  (state, action) => action.payload,
  "4h",
);
const btc = handleAction(
  fetchCurrencyBtcSuccess,
  (state, action) => action.payload,
  [],
);
const eth = handleAction(
  fetchCurrencyEthSuccess,
  (state, action) => action.payload,
  [],
);

const isBtcLoading = handleActions(
  {
    [fetchCurrencyBtcFailure]: () => true,
    [fetchCurrencyBtcRequest]: () => false,
    [fetchCurrencyBtcSuccess]: () => true,
  },
  false,
);

const isEthLoading = handleActions(
  {
    [fetchCurrencyEthFailure]: () => true,
    [fetchCurrencyEthRequest]: () => false,
    [fetchCurrencyEthSuccess]: () => true,
  },
  false,
);

export const getIsBtcLoading = state => state.currency.isBtcLoading;
export const getIsEthLoading = state => state.currency.isEthLoading;
export const getOffset = state => state.currency.offset;
export const getSelected = state => state.currency.selected;
export const getBtcData = state => state.currency.btc;
export const getEthData = state => state.currency.eth;

export const getCurrentBtcPurchase = state =>
  state.currency.btc[0] ? state.currency.btc[0].purchase : 0;

export const getCurrentEthPurchase = state =>
  state.currency.eth[0] ? state.currency.eth[0].purchase : 0;

export const getCurrentBtcSell = state =>
  state.currency.btc[0] ? state.currency.btc[0].sell : 0;

export const getCurrentEthSell = state =>
  state.currency.eth[0] ? state.currency.eth[0].sell : 0;

export default combineReducers({
  selected,
  offset,
  btc,
  eth,
  isBtcLoading,
  isEthLoading,
});
