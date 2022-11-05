import * as bodyParser from 'body-parser';
import * as express from 'express';
import dbRoutes from './db-routes';
import baseRoutes from './base-routes';
import dependencyGraphRoute from './dependency-graph-route';
import externalRedirectRoutes from './external-routes';
import memberRoutes from './member-routes';
import originalRoutes from './original-routes';
import storageRoutes from './storage-routes';

const app = express();
app.set('json spaces', 2);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

dbRoutes(app);
memberRoutes(app);
originalRoutes(app);
dependencyGraphRoute(app);
externalRedirectRoutes(app);
storageRoutes(app);
baseRoutes(app);

app.use((req, res) => {
    res.status(404).send({
        message: 'This route does not exist',
        route: req.originalUrl
    });
});

export default app;
