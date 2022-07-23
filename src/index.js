import React from 'react';
import ReactDOM from 'react-dom';
import './assets/font/handelsonsix_cyr_six.ttf';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import Main from './Main';
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from 'react-router-dom';
import store from './app/store';
import { Provider } from 'react-redux';
// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.unregister();
