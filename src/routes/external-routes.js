const express = require('express');
const { gatewayUrl } = require('../config/app-config');
const correlator = require('express-correlation-id');
const { logRequest, logReqError } = require('../helpers/logger-methods');
const { setRedirectDestination, mapRequest, saveReqInDB } = require('./route-helpers/request-helpers');

module.exports = app => {
    const router = express.Router();

    router.use(correlator());
    router.use(logRequest);
    router.use(logReqError);

    app.use('/r', router);

    router.use('/:redirectKey', (req, res, next) => {
        const destination = mapRequest(req.params.redirectKey);
        setRedirectDestination(destination, res, req);
        next();
    });

    router.use('/', async(req, res) => {
        const forwardUrl = res.get('destination-url') || gatewayUrl;
        res.redirect(301, forwardUrl);
        await saveReqInDB(req);
    });
};
