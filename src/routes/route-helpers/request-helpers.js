const nodeCache = require('../../helpers/storage-methods');

const isSavedUrl = entryUrlPath => {
    const urlMap = nodeCache.read('mongoUrls');
    return urlMap[entryUrlPath] || false;
};

const isValidDBReq = (req, dwcApiKey = process.env.DWC_API_KEY) => {
    return req.headers?.apikey === dwcApiKey;
};

module.exports = {
    isSavedUrl,
    isValidDBReq
};
