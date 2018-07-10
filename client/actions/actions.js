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
import {VIAPLAY_SERIES_URL} from '../../common/endPoints';
import {getSeriesObj} from '../../common/initialState';
import {formatPromiseResult, ObjParse} from '../../common/utils';

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
 * This thunk action creator is used to fetch the series of first page.
 *
 * This action does below by dispatching below actions:
 * 1] Marks the 'initialStateQueried' status to true in the store
 * 2] Sets isloading to true
 * 3] Fetches the series data
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

            let response = await fetch(`${VIAPLAY_SERIES_URL}`);
            let json = await response.json();

            let firstPageUrl = ObjParse(json)
                                    .getKey("_embedded")
                                    .getKey('viaplay:blocks')
                                    .getKey(0)
                                    .getKey('_links')
                                    .getKey('self')
                                    .getKey('href')
                                    .getVal();

            if( !firstPageUrl ) {
                throw "NO_FIRST_PAGE_URL_FOUND";
            }

            firstPageUrl = firstPageUrl.replace("https://", "http://");

            response = await fetch(`${firstPageUrl}`);
            json = await response.json();

            dispatch(addSeries(getSeriesObj(json)));
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

            let response = await fetch(`${FETCH_PAGE_URL}?pageUrl=${URL}`);
            let json = await response.json();

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