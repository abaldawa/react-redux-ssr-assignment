/**
 * User: abhijit.baldawa
 *
 * This module is used hydrate the server side rendered 'React app' and 'store' in the browser and restore the state generated
 * on the server
 */

import React from 'react';
import {Provider} from 'react-redux';
import {hydrate} from 'react-dom';
import configureStore from './store/store';
import App from './components/App';

const state = window.__STATE__;

delete window.__STATE__;

const store = configureStore(state);


hydrate(
    <Provider store={store} >
        <App />
    </Provider>,
    document.getElementById("app")
);

