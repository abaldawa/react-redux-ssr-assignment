/**
 * User: abhijit.baldawa
 */

const
    path = require('path'),
    express = require('express'),
    app = express(),
    ssrRouter = require('./routes/ssr'),
    clientRoter = require('./routes/pureClient'),
    navigationRouter = require('./routes/navigation'),
    {httpServer} = require('./serverConfig');

/**
 * Immediately invoking async method which does all the standard server startup routine.
 */
(async () =>{
    let
        err,
        result;

    // --------------------- 1. Add all the required express middleware ---------------------
    app.use('/assets', express.static(path.resolve(__dirname, '..','assets')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use( '/ssr', ssrRouter );
    app.use( '/client', clientRoter );
    app.use( '/navigation', navigationRouter );
    // --------------------- 1. END --------------------------------------------------------


    // -------------------- 2. initialize i/o clients (ex. database, redis etc) ----------------
    /**
     * We would generally use this space to initialize DB and other I/O clients to connect to their
     * respective servers. As our use case does not involve any so just keeping this space as place holder
     */
    // -------------------- 2. END --------------------------------------------------------


    // ------------------- 3. Start Http Server -------------------------------------------
    await new Promise((resolve, reject) => {
        app.listen(httpServer.port, () => {
            resolve();
        });
    });

    console.log(`Server is listening on port = ${httpServer.port}`);
    // -------------------- 3. END -------------------------------------------------------
})();