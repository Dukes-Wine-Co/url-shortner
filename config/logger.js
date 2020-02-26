const winston = require('winston');

const format = winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
);

const logger = winston.createLogger({
    level: 'info',
    format,
    transports: new winston.transports.Console({
        format: winston.format.simple()
    })
});

logger.error = error => logger.log({ level: 'error', message: error });

const logDetails = req => {
    const statusCode = req.res ? req.res.statusCode : '';
    const requestHost = req.headers['request-host'] || '';
    const originalPath = req.originalUrl || '';
    const referrer = req.headers.referer || '';
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.headers['x-forwarded-for'] || !!req.connection && req.connection.remoteAddress || '';
    const acceptLanguage = req.headers['accept-language'] || '';
    const domain = req.headers.host || '';
    const correlationId = req.correlationId() || '';
    const timestamp = Date.now();

    const redirectedUrl = !!req.res && !!req.res.getHeaders().location ? req.res.getHeaders().location : '';

    return {
        statusCode,
        requestHost,
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
    const msgObj = { message: msg };

    if (req) {
        logger.error(JSON.stringify(Object.assign(msgObj, logDetails(req))));
    } else {
        logger.error(JSON.stringify(msgObj));
    }
};

const logInfo = (msg, req) => {
    const msgObj = { message: msg };

    if (req) {
        logger.info(JSON.stringify(Object.assign(msgObj, logDetails(req))));
    } else {
        logger.info(JSON.stringify(msgObj));
    }
};

const logRequest = (req, res, next) => {
    console.log('inside');
    logger.info(JSON.stringify(logDetails(req)));
    next();
};

const logReqError = (err, req, res, next) => {
    logger.error(JSON.stringify(logDetails(err)));
    next();
};

module.exports = {
    logError,
    logInfo,
    logReqError,
    logRequest
};
