import { createActions } from "redux-actions";

const {
  wallet: { fetchWalletFailure, fetchWalletRequest, fetchWalletSuccess },
} = createActions({
  WALLET: {
    FETCH_WALLET_FAILURE: undefined,
    FETCH_WALLET_REQUEST: undefined,
    FETCH_WALLET_SUCCESS: undefined,
  },
});

export { fetchWalletFailure, fetchWalletRequest, fetchWalletSuccess };
