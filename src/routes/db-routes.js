const express = require('express');
const { trueMessage, failMessage } = require('../constants');
const { apiResponse } = require('../helpers/helper-methods');
const { addPair, getAllPairs } = require('../helpers/db-transactions');
const { mongoShortnedUrls } = require('../config/mongo-config');
const { logInfo, logError } = require('../helpers/logger-methods');
const { isValidDBReq } = require('./route-helpers/request-helpers');

module.exports = app => {
    const router = express.Router();

    app.use('/db', router);

    router.use('/', (req, res, next) => {
        if (isValidDBReq(req)) {
            return next();
        }

        const apiMsg = 'You are not authorized to view this route.';
        logInfo(apiMsg, req);

        res.send(apiResponse(failMessage, apiMsg));
    });

    router.post('/add', (req, res) => {
        const { short, destination } = req.body;
        const pairToAdd = { short, destination };

        return addPair(mongoShortnedUrls, pairToAdd)
            .then(() => {
                const apiMsg = `Added values ${JSON.stringify(pairToAdd)} to the mongo document`;

                logInfo(apiMsg, req);
                res.send(apiResponse(trueMessage, apiMsg));
            })
            .catch(e => {
                logError(e, req);
                res.send(apiResponse(failMessage, e));
            });
    });

    router.get('/view', (req, res) => {
        return getAllPairs(mongoShortnedUrls)
            .then(urls => {
                const apiMsg = 'Returning the mongo urls';

                logInfo(apiMsg, req);
                res.send(apiResponse(trueMessage, urls));
            })
            .catch(e => {
                logError(e, req);
                res.send(apiResponse(failMessage, e));
            });
    });

    router.use('/', (req, res) => {
        const apiMsg = `This api does not support the endpoint "${req.path}". Please try a supported endpoint`;
        logError(apiMsg, req);

        res.send(apiResponse(failMessage, apiMsg));
    });
};
