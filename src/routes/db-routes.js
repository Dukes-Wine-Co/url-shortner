const express = require('express');
const constants = require('../helpers/constants');
const { apiResponse } = require('../helpers/helper-methods');
const { addPair, getAllPairs } = require('../helpers/db-transactions');
const { mongoShortnedUrls } = require('../mongo-connect');

const router = express.Router();

router.use('/', (req, res, next) => {
    if (req.headers.apikey === process.env.DWC_API_KEY)
        return next();

    const apiMsg = 'You are not authorized to view this route.';

    res.send(apiResponse(constants.failMessage, apiMsg));
});

router.post('/add-pair', (req, res) => {
    const { short, destination } = req.body;
    const pairToAdd = { short, destination };

    return addPair(mongoShortnedUrls, pairToAdd)
        .then(() => {
            res.send(apiResponse(constants.trueMessage, `Added values ${pairToAdd} to the mongo document`));
        })
        .catch(e => {
            res.send(apiResponse(constants.failMessage, e));
        });
});

router.get('/view-pairs', (req, res) => {
    return getAllPairs(mongoShortnedUrls)
        .then(urls => {
            res.send(apiResponse(constants.trueMessage, urls));
        })
        .catch(e => {
            res.send(apiResponse(constants.failMessage, e));
        });
});

router.use('/', (req, res) => {
    const apiMsg = `This api does not support the endpoint "${req.path}". Please try a supported endpoint`;
    res.send(apiResponse(constants.failMessage, apiMsg));
});

module.exports = router;
