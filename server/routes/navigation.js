/**
 * User: abhijit.baldawa
 *
 * This module exposes the REST endpoints for <BASE_URL>/navigation URL
 */

const
    express = require('express'),
    router = express.Router(),
    viaplayService = require('../services/viaplayService'),
    {formatPromiseResult} = require('../../common/utils');

/**
 * REST endpoint for GET /navigation?pageUrl=<URL> URL.
 * This endpoint is used to fetch the "series" information along with "links" and "navigation" metadata from the viaPlay server.
 * This endpoint is useful for navigating to "prev", "next", "first", "last" pages.
 *
 * Also, request MUST have "pageUrl" query param which does point to viaplay "URL" whose metadata is to be fetched. If "pageUrl"
 * query param is not passed then the endpoint responds with 400 status.
 *
 * An example response sent by this endpoint is as below:
 *
 * {
 *    seriesArr: [
 *       ...
 *       {
 *          type: <String, ex. "series">,
 *          title: <String, Series title>
 *          thumbnailUrl: <String, URL of the thumbnail>,
 *          guid: <String, ex. "series-scrubs">,
 *          imdb: {
 *              url: <String, Imdb link with via play reference>,
 *              rating: <String, imdb rating>
 *          }
 *       }
 *       ...
 *    ],
 *    links: {
 *      next: <String, URL of next page>,
 *      prev: <String, URL of prev page>,
 *      first: <String, URL of first page>,
 *      last: <String, URL of last page>,
 *    },
 *    navigation: {
 *      start: <Number, start range of the current page in display>,
 *      end: <Number, end range of the current page in display>,
 *      total: <Number, total number of series>
 *    }
 * }
 *
 * Error response which could be sent by this endpoint is as below:
 * HTTP Status code: 400, message "URL query param 'URL'"
 * HTTP Status code: 500, Unexpected errors
 */
router.get('/', async (req, res) => {
    const
         pageUrl = req.originalUrl.split("pageUrl=").pop();

    let
        err,
        result;

    // ---------------------------- 1. Validation ----------------------------
    if( !pageUrl ) {
        return res.status(400).send(`URL query param 'URL'`);
    }
    // ---------------------------- 1. END ----------------------------


    // --------------------------- 2. Fetch series information from viaplay server -------------
    [err, result] = await formatPromiseResult(
                            viaplayService.getPerPageSeriesFromViaplay( pageUrl )
                          );

    if( err ) {
        return res.status(500).send(err);
    }
    // --------------------------- 2. END ------------------------------------------------------

    res.json(result);
});

module.exports = router;