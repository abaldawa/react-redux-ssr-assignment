/**
 * User: abhijit.baldawa
 *
 * This module exposes <BASE_URL>/client endpoint. This URL is used to see react/redux application rendered on client side.
 */

const
    express = require('express'),
    router = express.Router(),
    template = require('../../views/template');

/**
 * exposes <BASE_URL>/client URL to get react/redux application rendered on the client
 */
router.get('/', async (req, res) => {
    let
        response = template('Client Side Rendered page');

    res.send(response);
});

module.exports = router;