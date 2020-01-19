const express = require('express');
const bodyParser = require('body-parser');
const { isSavedUrl } = require('./helpers/helper-methods');
const { gatewayUrl } = require('../config/app-config');

const app = express();

const dbRoutes = require('./routes/db-routes');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/db', dbRoutes);

app.use('/', (req, res, next) => {
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

app.use('/', (req, res, next) => {
    const forwarUrl = res.get('destination-url');
    res.redirect(`${gatewayUrl}/${forwarUrl}`);
});

module.exports = app;
