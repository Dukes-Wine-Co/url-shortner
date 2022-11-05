import * as express from 'express';
import correlator from 'express-correlation-id';
import { logReqError, logRequest } from '../helpers/logger-methods';
import { saveReqInDB } from './route-helpers/request-helpers';

const memberUrl = 'https://members.dukeswines.com';

const server = app => {
    const router = express.Router();

    router.use(correlator());
    router.use(logRequest);
    router.use(logReqError);

    app.use('/m', router);

    router.use('/', async(req, res) => {
        const forwardUrl = `${memberUrl}${req.originalUrl}`.replace(/\/m\//i, '/');
        res.redirect(301, forwardUrl);
        await saveReqInDB(req);
    });
};

export default server;
