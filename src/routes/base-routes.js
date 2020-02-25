const express = require('express');
const { isSavedUrl } = require('../helpers/helper-methods');
const { gatewayUrl } = require('../../config/app-config');

module.exports = app => {
    const router = express.Router();

    app.use('/', router);

    router.use('/', (req, res, next) => {
        const entryPath = req.path.slice(1);
        const destinationPath = isSavedUrl(entryPath);
        if (destinationPath)
            res.set('destination-url', destinationPath);
        else {
            console.error(`bad route: ${entryPath}. redirecting to home page`);
            res.set('destination-url', '');
        }

        next();
    });

    router.use('/', (req, res) => {
        const forwarUrl = res.get('destination-url');
        res.redirect(`${gatewayUrl}/${forwarUrl}`);
    });
};
