/**
 * User: abhijit.baldawa
 *
 * This modules is used to manage constants used by action/reducers and server endpoint URL's
 */

export const IS_QUERIED = "IS_QUERIED"; // This is just to record whether the first page state was queried or not
export const NEXT_PAGE_URL = "NEXT_PAGE_URL"; //When the user clicks next button
export const PREVIOUS_PAGE_URL = "PREVIOUS_PAGE_URL"; //When the user clicks previous button
export const IS_LOADING = "IS_LOADING"; // If something is loading
export const ERROR_LOADING = "ERROR_LOADING"; // If there is error while loading
export const ADD_SERIES = "ADD_SERIES"; // Once the series metadata is loaded then add it to the state
export const CLEAR_ERROR = "CLEAR_ERROR"; // Clear error once the user closes the error popup

export const FETCH_PAGE_URL = "/navigation"; //Server ENDPOINT URL for navigation to be used with first, prev, next, last buttons