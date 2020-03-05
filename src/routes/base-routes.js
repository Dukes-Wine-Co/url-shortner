const express = require('express');
let { isSavedUrl } = require('../helpers/helper-methods');
let { gatewayUrl } = require('../../config/app-config');
let correlator = require('express-correlation-id');
let { logRequest, logReqError, logError } = require('../../config/logger');


module.exports = app => {
    const router = express.Router();

    router.use(correlator());
    router.use(logRequest);
    router.use(logReqError);

    app.use('/', router);

    router.use('/', (req, res, next) => {
        const entryPath = req.path ? req.path.slice(1) : '';

        const destinationPath = isSavedUrl(entryPath);
        if (destinationPath) {
            res.set('destination-url', destinationPath);
        } else {
            logError(`bad route: ${entryPath}. redirecting to home page`);
            res.set('destination-url', '');
        }

        next();
    });

    router.use('/', (req, res) => {
        const forwardUrl = res.get('destination-url');
        res.redirect(301, `${gatewayUrl}/${forwardUrl}`);
    });
};
