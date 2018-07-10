/**
 * User: abhijit.baldawa
 *
 * This module is used hydrate the server side rendered 'React app' and 'store' in the browser and restore the state generated
 * on the server
 */

import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import {Provider} from 'react-redux';
import {hydrate} from 'react-dom';
import configureStore from './store/store';
import App from './components/App';

const state = window.__STATE__;

delete window.__STATE__;

const store = configureStore(state);

class Main extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        return <App />
    }
}

// Create a theme instance.
const theme = createMuiTheme({
    palette: {}
});

hydrate(
    <Provider store={store} >
        <MuiThemeProvider theme={theme}>
            <Main />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById("app")
);

