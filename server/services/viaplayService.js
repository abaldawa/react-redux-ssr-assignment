/**
 * User: abhijit.baldawa
 *
 * This module is used to get Series details from Viaplay server via its provided public REST API's
 */

const
    http = require('http'),
    {formatPromiseResult} = require('../../common/utils'),
    initialState = require('../../common/initialState'),
    {ObjParse} = require('../../common/utils'),
    {VIAPLAY_SERIES_URL} = require('../../common/endPoints');

/**
 * @method PRIVATE
 *
 * This method fetches the JSON data from the provided input URL
 *
 * Note: We are using node.js built-in 'http' module because our use-case is to just GET response from the endpoint. This way we do not
 *       have to install any third-party REST client. For more complex usage we can also use "node-fetch" (or any-other) module which
 *       returns promise by default and can be directly used with async/await without having to wrap it inside promise constructor.
 *
 * @param {string} URL The REST endpoint to fetch JSON data from
 * @return {Promise}
 */
function fetchDataFromUrl( URL ) {
    return new Promise((resolve, reject) => {
        if( !URL || typeof URL !== "string" ) {
            return reject( "Missing URL" );
        }

        http.get(URL, (response) => {
            let
                rawData = '';

            response.setEncoding('utf8');

            response
                .on('data', (chunk) => {
                    rawData += chunk;
                })
                .on('end', () => {
                    try {
                        resolve(JSON.parse(rawData));
                    } catch (e) {
                        reject(e);
                    }
                });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

/**
 * @method PUBLIC
 *
 * This method fetches series information from Viaplay server. If input URL is present then it wont try to fetch the first page URL
 * from viaplay server but instead directly fetch the metadata from the provided URL. If URL is missing then first page URL is
 * first fetched and then the metadata of the first page is fetched and proceeded.
 *
 * From usability perspective when loading data for the first time in UI (ssr) input URL is not present. This 'URL' is passed
 * when user is trying to navigate to "first", "next", "prev", "last" urls as we have reference of those by that time.
 *
 * @param {String} URL Input URL to fetch data from
 * @returns {Promise}
 */
async function getPerPageSeriesFromViaplay( URL ) {
    let
        err,
        result,
        pageUrl;

    // ---- 1. If the input URL is given then do not try to fetch the first page URL from 'VIAPLAY_SERIES_URL' else fetch first page----
    if( !URL ) {
        [err, result] = await formatPromiseResult(
                                fetchDataFromUrl(VIAPLAY_SERIES_URL)
                              );

        if( err ) {
            throw err;
        }

        pageUrl = ObjParse(result)
                    .getKey("_embedded")
                    .getKey('viaplay:blocks')
                    .getKey(0)
                    .getKey('_links')
                    .getKey('self')
                    .getKey('href')
                    .getVal();

        if( !pageUrl ) {
            throw "NO_FIRST_PAGE_URL_FOUND";
        }

    } else {
        pageUrl = URL;
    }
    // ------------------------------- 1. END ----------------------------------------------------------------------------


    // --------------------------- 2. Now that we have the URL, fetch series and other metadata from the URL --------------
    pageUrl = pageUrl.replace("https://", "http://");

    [err, result] = await formatPromiseResult(
                            fetchDataFromUrl(pageUrl)
                          );

    if( err ) {
        throw err;
    }
    // --------------------------------- 2. END --------------------------------------------------------------------------

    // ---------------------- 3. Generate metadata based on result and return -------------------------------------------
    return initialState.getSeriesObj(result);
    // -------------------------- 3. END --------------------------------------------------------------------------------
}


module.exports = {
    getPerPageSeriesFromViaplay
};