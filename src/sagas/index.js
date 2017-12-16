import { fork } from "redux-saga/effects";
import {
  authFlow,
  onAuthLoginFlowWatch,
  onAuthRegistrationFlowWatch,
} from "./auth";
import {
  currencyWatch,
  fetchBtcWatch,
  fetchEthWatch,
  buyCurrencyWatch,
  sellCurrencyWatch,
} from "./currency";
import { fetchWalletWatch } from "./wallet";

export default function*() {
  yield fork(onAuthLoginFlowWatch);
  yield fork(onAuthRegistrationFlowWatch);
  yield fork(authFlow);
  yield fork(fetchBtcWatch);
  yield fork(fetchEthWatch);
  yield fork(currencyWatch);
  yield fork(fetchWalletWatch);
  yield fork(buyCurrencyWatch);
  yield fork(sellCurrencyWatch);
}
