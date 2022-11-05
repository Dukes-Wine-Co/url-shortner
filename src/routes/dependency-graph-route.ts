import * as express from 'express';
import { cruise } from 'dependency-cruiser';
import Viz from 'viz.js';
import { Module, render } from 'viz.js/full.render.js';

const viz = new Viz({ Module, render });

const graphOptions = {
    includeOnly: '^(src)',
    exclude: '^(node_modules)',
    outputType: 'dot',
    prefix: 'https://github.com/Dukes-Wine-Co/url-shortner/tree/master/'
};

const server = app => {
    const router = express.Router();

    app.use(/\/dependency[-]?graph/, router);

    router.use('/', (req, res) => {
        const dependencyGraph = cruise(['src', 'server.js'], graphOptions).output;

        return viz.renderString(dependencyGraph, { format: 'svg' })
            .then(svg => {
                res.header('content-type', 'image/svg+xml');
                res.send(svg);
            })
            .catch(() => {
                res.status(404).send('Page not found');
            });
    });
};

export default server;
