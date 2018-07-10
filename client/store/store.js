/**
 * User: abhijit.baldawa
 *
 * This module creates react store with either passed in initialState or from scratch. It uses thunk middleware to
 * handle async actions
 */

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducer';

/**
 *
 * @param {Object} :OPTIONAL: initialState
 * @returns {Object} Store
 */
export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware( thunk )
    );
};