import { combineReducers } from "redux";
import auth from "./auth";
import currency from "./currency";
import wallet from "./wallet";

export default combineReducers({
  auth,
  currency,
  wallet,
});
