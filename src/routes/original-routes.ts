import * as express from 'express';
import * as correlator from 'express-correlation-id';
import { logReqError, logRequest } from '../helpers/logger-methods';
import { saveReqInDB } from './route-helpers/request-helpers';

const memberUrl = 'https://dukeswines.com';

const server = app => {
    const router = express.Router();

    router.use(correlator());
    router.use(logRequest);
    router.use(logReqError);

    app.use('/i', router);

    router.use('/', async(req, res) => {
        const forwardUrl = `${memberUrl}${req.originalUrl}`.replace(/\/i\//i, '/');
        res.redirect(301, forwardUrl);
        await saveReqInDB(req);
    });
};

export default server;
