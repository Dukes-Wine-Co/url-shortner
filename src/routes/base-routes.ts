import * as express from 'express';
import { gatewayUrl } from '../config/app-config';
import correlator from 'express-correlation-id';
import { logReqError, logRequest } from '../helpers/logger-methods';
import { isSavedUrl, saveReqInDB, setRedirectDestination } from './route-helpers/request-helpers';

const server = app => {
    const router = express.Router();

    router.use(correlator());
    router.use(logRequest);
    router.use(logReqError);

    app.use('/', router);

    router.use('/', (req, res, next) => {
        const destinationPath = isSavedUrl(req.path);
        setRedirectDestination(destinationPath, res, req);
        next();
    });

    router.use('/', async(req, res) => {
        const forwardUrl = res.get('destination-url');
        res.redirect(301, `${gatewayUrl}/${forwardUrl}`);
        await saveReqInDB(req);
    });
};

export default server;
