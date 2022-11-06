import * as express from 'express';
import { gatewayUrl } from '../config/app-config';
import correlator from 'express-correlation-id';
import { logReqError, logRequest } from '../helpers/logger-methods';
import { mapRequest, saveReqInDB, setRedirectDestination } from './route-helpers/request-helpers';
import * as nodeCache from '../helpers/storage-methods';
import { UrlTypes } from '../constants';
import { GenericObject } from '../helpers/helper-methods';

const server = app => {
    const router = express.Router();

    router.use(correlator());
    router.use(logRequest);
    router.use(logReqError);

    app.use('/r', router);

    router.use('/:redirectKey', (req, res, next) => {
        const cacheMap = nodeCache.read(UrlTypes.EXTERNAL) as GenericObject;
        const destination = mapRequest(req.params.redirectKey, cacheMap);
        setRedirectDestination(destination, res, req);
        next();
    });

    router.use('/', async(req, res) => {
        const forwardUrl = res.get('destination-url') || gatewayUrl;
        res.redirect(301, forwardUrl);
        await saveReqInDB(req);
    });
};

export default server;
