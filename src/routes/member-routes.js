const express = require('express');
const correlator = require('express-correlation-id');
const { logRequest, logReqError } = require('../helpers/logger-methods');
const { saveReqInDB } = require('./route-helpers/request-helpers');

const memberUrl = 'https://members.dukeswines.com';

module.exports = app => {
    const router = express.Router();

    router.use(correlator());
    router.use(logRequest);
    router.use(logReqError);

    app.use('/m', router);

    router.use('/', async(req, res) => {
        const forwardUrl = `${memberUrl}${req.originalUrl}`.replace(/\/m\//i, '/');
        res.redirect(301, forwardUrl);
        await saveReqInDB(req);
    });
};