const express = require('express');
let { gatewayUrl } = require('../config/app-config');
let correlator = require('express-correlation-id');
let { logRequest, logReqError } = require('../helpers/logger-methods');
let { setRedirectDestination, isSavedUrl } = require('./route-helpers/request-helpers');

module.exports = app => {
    const router = express.Router();

    router.use(correlator());
    router.use(logRequest);
    router.use(logReqError);

    app.use('/', router);

    router.use('/', (req, res, next) => {
        const destinationPath = isSavedUrl(req.path);
        setRedirectDestination(destinationPath, res, req);
        next();
    });

    router.use('/', (req, res) => {
        const forwardUrl = res.get('destination-url');
        res.redirect(301, `${gatewayUrl}/${forwardUrl}`);
    });
};
