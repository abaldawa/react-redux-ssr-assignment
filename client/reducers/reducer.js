/**
 * User: abhijit.baldawa
 *
 * Standard reducer to generate the new state based on appropriate actions
 */

import {
    IS_LOADING,
    ADD_SERIES,
    CLEAR_ERROR,
    ERROR_LOADING,
    IS_QUERIED
} from '../constants/action-types';

/**
 * The structure of entire state
 */
const initialState = {
    seriesArr: [],
    isLoading: false,
    initialStateQueried: false,
    errorMessage: null,
    links: {
        next: null,
        prev: null,
        first: null,
        last: null
    },
    navigation: {
        start: null,
        end: null,
        total: null
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case IS_LOADING:
            return {...state, isLoading: action.payload };
        case ADD_SERIES:
            return {
                ...state,
                seriesArr: [...action.payload.seriesArr],
                links: action.payload.links,
                navigation: action.payload.navigation
            };
        case ERROR_LOADING:
            return {...state, errorMessage: action.payload};
        case CLEAR_ERROR:
            return {...state, errorMessage: null};
        case IS_QUERIED:
            return {...state, initialStateQueried: true};
        default:
            return state;
    }
};