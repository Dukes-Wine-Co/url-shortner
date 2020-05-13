const express = require('express');
const bodyParser = require('body-parser');
const dbRoutes = require('./db-routes');
const baseRoutes = require('./base-routes');
const dependencyGraphRoute = require('./dependency-graph-route');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

dbRoutes(app);
dependencyGraphRoute(app);
baseRoutes(app);

module.exports = app;
