/**
 * User: abhijit.baldawa
 *
 * This module is used to render react application on the server
 */

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import configureStore from './store/store'
import App from './components/App'


function renderAndGetState(initialState) {
    const
        store = configureStore(initialState);

    let
        template = renderToString(
                        <Provider store={store} >
                            <App />
                        </Provider>
                   );


    return {template, initialState: store.getState()};
};

module.exports = {
    renderAndGetState
};