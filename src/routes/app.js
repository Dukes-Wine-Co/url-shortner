const express = require('express');
const bodyParser = require('body-parser');
const dbRoutes = require('./db-routes');
const baseRoutes = require('./base-routes');
const dependencyGraphRoute = require('./dependency-graph-route');
const externalRedirectRoutes = require('./external-routes');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

dbRoutes(app);
dependencyGraphRoute(app);
externalRedirectRoutes(app);
baseRoutes(app);

module.exports = app;
