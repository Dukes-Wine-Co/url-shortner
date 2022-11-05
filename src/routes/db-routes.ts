import * as express from 'express';
import { failMessage, trueMessage } from '../constants';
import { apiResponse } from '../helpers/helper-methods';
import { addPair, getAllPairs } from '../helpers/db-transactions';
import { mongoShortnedUrls } from '../config/mongo-config';
import { logError, logInfo } from '../helpers/logger-methods';
import { isValidDBReq } from './route-helpers/request-helpers';

const server = app => {
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

    router.post('/add', async (req, res) => {
        const { short, destination } = req.body;
        const pairToAdd = { short, destination };

        try {
            await addPair(mongoShortnedUrls, pairToAdd)

            const apiMsg = `Added values ${JSON.stringify(pairToAdd)} to the mongo document`;
            logInfo(apiMsg, req);
            res.send(apiResponse(trueMessage, apiMsg));
        } catch(e){
            logError(e, req);
            res.send(apiResponse(failMessage, e));
        }
    });

    router.get('/view', async (req, res) => {
        try {
            const urls = await getAllPairs(mongoShortnedUrls)
            const apiMsg = 'Returning the mongo urls';

            logInfo(apiMsg, req);
            res.send(apiResponse(trueMessage, urls));
        } catch(e){
            logError(e, req);
            res.send(apiResponse(failMessage, e));
        }
    });

    router.use('/', (req, res) => {
        const apiMsg = `This api does not support the endpoint "${req.path}". Please try a supported endpoint`;
        logError(apiMsg, req);

        res.send(apiResponse(failMessage, apiMsg));
    });
};

export default server;
