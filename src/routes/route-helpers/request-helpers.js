const nodeCache = require('../../helpers/storage-methods');
const { logError } = require('../../helpers/logger-methods');

const REDIRECT_MAP = {
    'virtual-tasting-1': process.env.ZOOM_LINK
};

const isSavedUrl = entryUrlPath => {
    const formattedUrl = entryUrlPath.slice(1);
    const urlMap = nodeCache.read('mongoUrls');
    return urlMap?.[formattedUrl] || false;
};

const isValidDBReq = (
    req,
    dwcApiKey = process.env.DWC_API_KEY
) => req.headers?.apikey === dwcApiKey;

const mapRequest = (incoming, redirectMap = REDIRECT_MAP) => {
    return redirectMap[incoming] || false;
};

const setRedirectDestination = (destinationUrl, res, req) => {
    const entryPath = req.path || '';

    if (destinationUrl) {
        res.set('destination-url', destinationUrl);
    } else {
        logError({
            log: 'invalid location. redirecting to home page',
            entryPath
        });

        res.set('destination-url', '');
    }
};

module.exports = {
    isSavedUrl,
    isValidDBReq,
    setRedirectDestination,
    mapRequest
};
