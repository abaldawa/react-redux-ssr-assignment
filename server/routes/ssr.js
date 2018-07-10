/**
 * User: abhijit.baldawa
 *
 * This module exposes <BASE_URL>/ssr endpoint. This URL is used to see the UI rendered from the server using react/redux.
 */

const
    express = require('express'),
    router = express.Router(),
    viaplayService = require('../services/viaplayService'),
    {formatPromiseResult, ObjParse} = require('../../common/utils'),
    {renderAndGetState} = require('../../views/serverSideRender'),
    template = require('../../views/template');

/**
 * Exposes <BASE_URL>/ssr endpoint and returns a server side rendered react/redux application with pre-initialized store
 */
router.get('/', async (req, res) => {
    let
        initialStateObj = {
            seriesArr: [],
            isLoading: false,
            errorMessage: null,
            initialStateQueried: true,
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
        },
        err,
        result;

    // ---------- 1. Get the series and other metadata object from VIAPLAY server to show on FIRST PAGE-------------
    [err, result] = await formatPromiseResult(
                            viaplayService.getPerPageSeriesFromViaplay()
                          );

    if( err ) {
        return res.status(500).send(err);
    }
    // ------------------------------ 1. END ---------------------------------------------------------------


    // --------------------------- 2. Initialize the state ------------------------------------------------
    initialStateObj.seriesArr = ObjParse(result).getKey('seriesArr').getVal();
    initialStateObj.links = ObjParse(result).getKey('links').getVal();
    initialStateObj.navigation = ObjParse(result).getKey('navigation').getVal();
    // --------------------------- 2. END ---------------------------------------------------------------


    // ------ 3. Get the server side rendered string representation of react/redux app and pre-initialized redux store object ------
    const
        { initialState, template: templateString}  = renderAndGetState(initialStateObj);
    // --------------------------------- 3. END ---------------------------------------------------------------------------


    // -- 4. Generate the HTML string representation for the UI based on templateString and initialState and send response ----
    res.send(template("Server Rendered Page", initialState, templateString));
    // ---------------------------------- 4. END ---------------------------------------------------------------------------
});

module.exports = router;

