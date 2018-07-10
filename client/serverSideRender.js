/**
 * User: abhijit.baldawa
 *
 * This module is used to render react application on the server
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
    MuiThemeProvider,
    createMuiTheme,
    createGenerateClassName,
} from '@material-ui/core/styles';

import { Provider } from 'react-redux';
import configureStore from './store/store';
import App from './components/App';


function renderAndGetState(initialState) {
    const
        store = configureStore(initialState),
        // Create a sheetsRegistry instance.
        sheetsRegistry = new SheetsRegistry(),
        // Create a theme instance.
        theme = createMuiTheme({ palette: {} }),
        generateClassName = createGenerateClassName(),

        template = renderToString(
                        <Provider store={store} >
                            <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                                <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
                                    <App />
                                </MuiThemeProvider>
                            </JssProvider>
                        </Provider>
                   ),

        // Grab the CSS from our sheetsRegistry.
        css = sheetsRegistry.toString();

    return {template, initialState: store.getState(), css};
};

module.exports = {
    renderAndGetState
};