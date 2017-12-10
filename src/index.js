import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import createStore from "./store";
import AppRouter from "./component/AppRouter";
import "./index.css";

window.Chart = require("chart.js");
const store = createStore({});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);
