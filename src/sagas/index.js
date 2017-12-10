import { fork } from "redux-saga/effects";
import { onAuthRequestsWatch } from "./auth";
import { currencyWatch, fetchBtcWatch, fetchEthWatch } from "./currency";

export default function*() {
  yield fork(onAuthRequestsWatch);
  yield fork(fetchBtcWatch);
  yield fork(fetchEthWatch);
  yield fork(currencyWatch);
}
