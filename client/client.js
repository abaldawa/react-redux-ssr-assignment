/**
 * User: abhijit.baldawa
 *
 * This module is used to render react/redux application on the client and is the start point
 */

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from './store/store';

const
    store = configureStore();

window.mystore = store;

import App from "./components/App";

render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById("app")
);