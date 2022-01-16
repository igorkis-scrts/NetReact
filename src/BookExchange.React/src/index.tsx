import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";

import App from "./App";
import { configureApp } from "@config/configureApp";

import "./index.css";

import reportWebVitals from "./reportWebVitals";

const configuration = configureApp();

ReactDOM.render(
  <React.StrictMode>
    <Provider {...configuration.stores}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
