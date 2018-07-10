/**
 * User: abhijit.baldawa
 *
 * This module is used for action creators
 */

import {
    ERROR_LOADING,
    CLEAR_ERROR,
    ADD_SERIES,
    IS_LOADING,
    IS_QUERIED,
    FETCH_PAGE_URL
} from '../constants/action-types';
import { ObjParse} from '../../common/utils';

/**
 * @methods PRIVATE
 *
 * below action creators are privately used by thunk actions
 */
const loadingData = isLoading => ({type: IS_LOADING, payload: isLoading});
const addSeries = seriesObj => ({type:ADD_SERIES, payload: seriesObj });
const addError = errMsg => ({type: ERROR_LOADING, payload: errMsg});
const isInitialStateQueried = () => ({type: IS_QUERIED});

/**
 * @method PUBLIC
 *
 * This action creator is used to clear the errorMessage from the state
 *
 * @returns {Object} action object
 */
const clearError = () => ({type: CLEAR_ERROR});


/**
 * @method PUBLIC
 *
 * This thunk action creator is used to fetch the series of first page. This will be called in client side rendering once.
 *
 * This action does below by dispatching below actions:
 * 1] Marks the 'initialStateQueried' status to true in the store
 * 2] Sets isloading to true
 * 3] Fetches the series first page data
 * 4] If successful updates the state to 'isLoading' false and add series to state, else, isLoading to false and add errorMessage
 *    to state
 *
 * @returns {Function}
 */
const fetchFirstPageSeries = () => {
    return async (dispatch) => {
        try{
            dispatch(isInitialStateQueried());
            dispatch(loadingData(true));


            const response = await fetch(`${FETCH_PAGE_URL}`);
            const json = await response.json();

            dispatch(addSeries({
                seriesArr: ObjParse(json).getKey('seriesArr').getVal(),
                links: ObjParse(json).getKey('links').getVal(),
                navigation: ObjParse(json).getKey('navigation').getVal()
            }));
            dispatch(loadingData(false));
        } catch(err) {
            dispatch(loadingData(false));
            dispatch(addError("Error while loading page data"));
        }
    } ;
};

/**
 * @method PUBLIC
 *
 * This thunk action creator is used to fetch a page series data from the server. This will be triggered by
 * navigation buttons (first, prev, next, last)
 *
 * This action does below by dispatching below actions:
 * 1] Sets the state to loading
 * 2] Fetches the data from server
 * 3] Updates the state with the fetched series from server
 * 4] Sets the state to not loading
 *
 * If there is any error while fetching the data from the server then set state to loading false and updates the state errorMessage
 *
 * @param URL
 * @returns {Function}
 */
const fetchPage = ( URL ) => {
    return async (dispatch) => {
        try{
            dispatch(loadingData(true));

            const response = await fetch(`${FETCH_PAGE_URL}?pageUrl=${URL}`);
            const json = await response.json();

            dispatch(addSeries({
                seriesArr: ObjParse(json).getKey('seriesArr').getVal(),
                links: ObjParse(json).getKey('links').getVal(),
                navigation: ObjParse(json).getKey('navigation').getVal()
            }));
            dispatch(loadingData(false));
        } catch( err ) {
            dispatch(loadingData(false));
            dispatch(addError("Error while loading page data"));
        }
    }
};

export {
    fetchFirstPageSeries,
    fetchPage,
    clearError
}