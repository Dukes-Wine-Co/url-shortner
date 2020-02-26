const express = require('express');
let { isSavedUrl } = require('../helpers/helper-methods');
let { gatewayUrl } = require('../../config/app-config');
let { logInfo } = require('../../logger');
const correlator = require('express-correlation-id');

module.exports = app => {
    const router = express.Router();

    app.use('/', router);

    router.use(correlator());

    router.use('/', (req, res, next) => {
        const entryPath = req.path.slice(1);

        logInfo(`Incoming request for ${entryPath}`, req);
        const destinationPath = isSavedUrl(entryPath);
        if (destinationPath) {
            res.set('destination-url', destinationPath);
        } else {
            console.error(`bad route: ${entryPath}. redirecting to home page`);
            res.set('destination-url', '');
        }

        next();
    });

    router.use('/', (req, res) => {
        const forwarUrl = res.get('destination-url');

        logInfo(`Outgoing request for /${forwarUrl}`, req);
        res.redirect(301, `${gatewayUrl}/${forwarUrl}`);
    });
};
