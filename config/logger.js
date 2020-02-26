const logger = console;

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

module.exports = {
    logError,
    logInfo
};
