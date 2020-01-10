const express = require('express');
const bodyParser = require('body-parser');
const { isMongoUrl } = require('./helper-methods');
const { gatewayUrl } = require('../config/app-config');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/', (req, res, next) => {
    if (isMongoUrl()) {
        next();
    } else {
        console.err('bad route');
        res.send({success: false})
    }
});

app.use('/', (req, res, next) => {
    res.redirect(gatewayUrl);
});

module.exports = app;
