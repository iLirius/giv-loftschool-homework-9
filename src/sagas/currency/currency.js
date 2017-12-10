import {
  takeLatest,
  fork,
  take,
  select,
  put,
  cancel,
  call,
} from "redux-saga/effects";
import { delay } from "redux-saga";
import { authLoginSuccess, authLogoutSuccess } from "../../actions/auth";
import { getOffset } from "../../reducers/currency";
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
import { candles } from "../../api";

function* fetchCurrencyFlow() {
  while (true) {
    const offset = yield select(getOffset);
    yield put(fetchCurrencyBtcRequest(offset));
    yield put(fetchCurrencyEthRequest(offset));

    yield delay(15000);
  }
}

export function* currencyWatch() {
  let currencyTask;
  while (true) {
    const action = yield take([
      authLoginSuccess,
      authLogoutSuccess,
      selectBtc,
      selectEth,
      selectOffset,
    ]);

    if (currencyTask) {
      yield cancel(currencyTask);
      currencyTask = undefined;
    }
    if (action.type !== authLogoutSuccess.toString()) {
      currencyTask = yield fork(fetchCurrencyFlow);
    }
    // yield delay(15000);
  }
}

function* fetchBtcFlow(action) {
  try {
    const response = yield call(candles, "btc", action.payload);
    yield put(fetchCurrencyBtcSuccess(response.data.result));
  } catch (error) {
    yield put(fetchCurrencyBtcFailure(error));
  }
}

function* fetchEthFlow(action) {
  try {
    const response = yield call(candles, "eth", action.payload);
    yield put(fetchCurrencyEthSuccess(response.data.result));
  } catch (error) {
    yield put(fetchCurrencyEthFailure(error));
  }
}

export function* fetchBtcWatch() {
  yield takeLatest(fetchCurrencyBtcRequest, fetchBtcFlow);
}

export function* fetchEthWatch() {
  yield takeLatest(fetchCurrencyEthRequest, fetchEthFlow);
}
