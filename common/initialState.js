/**
 * User: abhijit.baldawa
 */

const
    {ObjParse} = require("./utils");

/**
 * @method PRIVATE
 *
 * This method returns the start range based on productsPerPage and currentPage
 *
 * @param {Number} productsPerPage
 * @param {Number} currentPage
 * @returns {number}
 */
function getStartNavIndex( productsPerPage = 1, currentPage = 1  ) {
    return (productsPerPage * currentPage) - (productsPerPage -1);
}

/**
 * @method PUBLIC
 *
 * This method receives fetched data from viaPlay URL ex. say from below URL:
 * 'https://content.viaplay.se/pc-se/serier/samtliga?blockId=6dd481845f73b596b7a95456c2d918e0&partial=1&pageNumber=1' which has
 * a structure as below:
 * {
 *    ....
 *    "_embedded": {
 *        "viaplay:products": {
 *            [
 *                {this is series information object},
 *                ...
 *            ]
 *        }
 *    },
 *    .....
 * }
 *
 * and this method reads the above structure and returns an output Object as below:
 *
 * {
 *    seriesArr: [
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
 * @param {Object} fetchedSeriesMetaObj
 * @returns {Object} Returns the object in above format
 */
function getSeriesObj( fetchedSeriesMetaObj ) {
    let
        fetchedSeriesMetaArr,
        seriesArr,
        start,
        end;

    fetchedSeriesMetaArr = ObjParse(fetchedSeriesMetaObj)
                            .getKey("_embedded")
                            .getKey('viaplay:products')
                            .getVal();

    if( !fetchedSeriesMetaArr || !Array.isArray(fetchedSeriesMetaArr) || !fetchedSeriesMetaArr.length ) {
        throw "NO_SERIES_FOUND"
    }

    seriesArr = [];

    for( let seriesMeta of fetchedSeriesMetaArr ) {
        seriesArr.push({
            type: ObjParse(seriesMeta).getKey('type').getVal(),
            title: ObjParse(seriesMeta).getKey('content').getKey('series').getKey('title').getVal(),
            thumbnailUrl: ObjParse(seriesMeta).getKey('content').getKey('images').getKey('boxart').getKey('url').getVal(),
            guid: ObjParse(seriesMeta).getKey('system').getKey('guid').getVal(),
            imdb: {
                url: ObjParse(seriesMeta).getKey('content').getKey('imdb').getKey('url').getVal(),
                rating: ObjParse(seriesMeta).getKey('content').getKey('imdb').getKey('rating').getVal()
            }
        });
    }

    start = getStartNavIndex( ObjParse(fetchedSeriesMetaObj).getKey('productsPerPage').getVal(), ObjParse(fetchedSeriesMetaObj).getKey('currentPage').getVal());
    end = start + seriesArr.length -1;

    return {
        seriesArr,
        links: {
            next: ObjParse(fetchedSeriesMetaObj).getKey('_links').getKey('next').getKey('href').getVal(),
            prev: ObjParse(fetchedSeriesMetaObj).getKey('_links').getKey('prev').getKey('href').getVal(),
            first: ObjParse(fetchedSeriesMetaObj).getKey('_links').getKey('first').getKey('href').getVal(),
            last: ObjParse(fetchedSeriesMetaObj).getKey('_links').getKey('last').getKey('href').getVal()
        },
        navigation: {
            start,
            end,
            total: ObjParse(fetchedSeriesMetaObj).getKey('totalProductCount').getVal()
        }
    };
}

module.exports = {
    getSeriesObj
};