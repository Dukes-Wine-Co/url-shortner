const logger = require('../config/logger');

const parseRequestDetails = req => {
    const statusCode = req.res?.statusCode || '';
    const originalPath = req.originalUrl || '';
    const referrer = req.headers.referer || '';
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.headers['x-forwarded-for'] || req.connection?.remoteAddress || '';
    const acceptLanguage = req.headers['accept-language'] || '';
    const domain = req.headers.host || '';
    const correlationId = req.correlationId?.() || '';
    const timestamp = Date.now();
    const redirectedUrl = req.res?.getHeaders?.().location || '';

    return {
        statusCode,
        originalPath,
        referrer,
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
        logger.error(Object.assign(msgObj, parseRequestDetails(req)));
    } else {
        logger.error(msgObj);
    }
};

const logInfo = (msg, req) => {
    const msgObj = { log: msg };

    if (req) {
        logger.info(Object.assign(msgObj, parseRequestDetails(req)));
    } else {
        logger.info(msgObj);
    }
};

const logRequest = (req, res, next) => {
    logger.http(parseRequestDetails(req));
    next();
};

const logReqError = (err, req, res, next) => {
    logger.error(parseRequestDetails(err));
    next();
};

module.exports = {
    logError,
    logInfo,
    logReqError,
    logRequest,
    parseRequestDetails
};
