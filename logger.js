const winston = require('winston');

const format = winston.format.combine(
    winston.format.timestamp(),
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
    const originalURL = req.originalUrl || '';
    const referrer = req.headers.referer || '';
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.headers['x-forwarded-for'] || !!req.connection && req.connection.remoteAddress || '';
    const acceptLanguage = req.headers['accept-language'] || '';
    const domain = req.headers.host || '';
    const correlationId = req.correlationId() || '';

    const redirectedUrl = !!req.res && !!req.res.getHeaders().location ? req.res.getHeaders().location : '';

    return {
        statusCode,
        requestHost,
        originalURL,
        referrer,
        userAgent,
        ip,
        acceptLanguage,
        domain,
        correlationId,
        redirectedUrl
    };
};

const logError = (msg, req) => {
    const msgObj = { message: msg };

    if (req) 
        logger.error(JSON.stringify(Object.assign(msgObj, logDetails(req))));
     else logger.error(JSON.stringify(msgObj)); 
};

const logInfo = (msg, req) => {
    const msgObj = { message: msg };

    if (req) 
        logger.info(JSON.stringify(Object.assign(msgObj, logDetails(req))));
     else logger.error(JSON.stringify(msgObj)); 
};

module.exports = {
    logError,
    logInfo
};
