const express = require('express');
const { cruise } = require('dependency-cruiser');
const Viz = require('viz.js');
const { Module, render } = require('viz.js/full.render.js');

const viz = new Viz({ Module, render });
const graphOptions = {
    includeOnly: '^(src)',
    exclude: '^(node_modules)',
    outputType: 'dot',
    doNotFollow: {
        dependencyTypes: [
            'npm',
            'npm-dev',
            'npm-optional',
            'npm-peer',
            'npm-bundled',
            'npm-no-pkg'
        ]
    },
    prefix: 'https://github.com/Dukes-Wine-Co/url-shortner/tree/master/'
};

module.exports = app => {
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
