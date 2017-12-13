import { fork } from "redux-saga/effects";
import { onAuthRequestsWatch } from "./auth";
import { currencyWatch, fetchBtcWatch, fetchEthWatch } from "./currency";
import { fetchWalletWatch } from "./wallet";

export default function*() {
  yield fork(onAuthRequestsWatch);
  yield fork(fetchBtcWatch);
  yield fork(fetchEthWatch);
  yield fork(currencyWatch);
  yield fork(fetchWalletWatch);
}
