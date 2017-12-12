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

export const getError = state => state.wallet.error;

export default combineReducers({ error, isLoading });
