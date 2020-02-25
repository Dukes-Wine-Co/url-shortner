const express = require('express');
const bodyParser = require('body-parser');
const dbRoutes = require('./routes/db-routes');
const baseRoutes = require('./routes/base-routes');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

dbRoutes(app);
baseRoutes(app);

module.exports = app;
