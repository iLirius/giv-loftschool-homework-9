import { fork } from "redux-saga/effects";
import { onAuthRequestsWatch } from "./auth";

export default function*() {
  // yield fork(authFlow);
  yield fork(onAuthRequestsWatch);
}
