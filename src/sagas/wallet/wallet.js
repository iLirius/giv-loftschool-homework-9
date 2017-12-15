import { takeLatest, put, call } from "redux-saga/effects";
import {
  fetchWalletFailure,
  fetchWalletRequest,
  fetchWalletSuccess,
} from "../../actions/wallet";

import { getWallet } from "../../api";

export function* onFetchWalletRequest() {
  try {
    const data = yield call(getWallet);
    yield put(fetchWalletSuccess(data.data.result));
  } catch (error) {
    yield put(fetchWalletFailure(error.data.message));
  }
}

export function* fetchWalletWatch() {
  yield takeLatest(fetchWalletRequest, onFetchWalletRequest);
}
