const logger = require('../config/logger');

const logDetails = req => {
    const statusCode = req.res?.statusCode || '';
    const requestHost = req.headers['request-host'] || '';
    const originalPath = req.originalUrl || '';
    const referer = req.headers.referer || '';
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || '';
    const acceptLanguage = req.headers['accept-language'] || '';
    const domain = req.headers.host || '';
    const correlationId = req.correlationId?.() || '';
    const timestamp = Date.now();
    const redirectedUrl = req.res?.getHeaders?.().location || '';

    return {
        statusCode,
        requestHost,
        originalPath,
        referer,
        userAgent,
        ip,
        acceptLanguage,
        domain,
        correlationId,
        redirectedUrl,
        timestamp
    };
};

const logError = (msg, req) => {
    const msgObj = { log: msg };

    if (req) {
        logger.error(Object.assign(msgObj, logDetails(req)));
    } else {
        logger.error(msgObj);
    }
};

const logInfo = (msg, req) => {
    const msgObj = { log: msg };

    if (req) {
        logger.info(Object.assign(msgObj, logDetails(req)));
    } else {
        logger.info(msgObj);
    }
};

const logRequest = (req, res, next) => {
    logger.http(logDetails(req));
    next();
};

const logReqError = (err, req, res, next) => {
    logger.error(logDetails(err));
    next();
};

module.exports = {
    logError,
    logInfo,
    logReqError,
    logRequest,
    logDetails
};
