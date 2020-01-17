const express = require('express');
const bodyParser = require('body-parser');
const { isSavedUrl } = require('./helpers/helper-methods');
const { gatewayUrl } = require('../config/app-config');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/', (req, res, next) => {
    const entryPath = req.path.slice(1);
    const destinationPath = isSavedUrl(entryPath);
    if (destinationPath) {
        res.set('destination-url', destinationPath);
        next();
    } else {
        console.err(`bad route: ${entryPath}. redirecting to home page`);
        res.set('destination-url', '');
    }
});

app.use('/', (req, res, next) => {
    const forwarUrl = res.get('destination-url');
    res.redirect(`${gatewayUrl}/${forwarUrl}`);
});

module.exports = app;
