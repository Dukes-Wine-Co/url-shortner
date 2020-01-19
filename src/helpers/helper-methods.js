const nodeCache = require('../storage');
const { isProd, isTesting } = require('./constants');

const isSavedUrl = entryUrlPath => {
    const urlMap = nodeCache.read('mongoUrls');
    return urlMap[entryUrlPath] || false;
};

const processUrls = arrOfUrls => {
    const urlMap = {};
    arrOfUrls.forEach(urlEntry => {
        urlMap[urlEntry.short] = urlEntry.destination;
    });

    return urlMap;
};

const configureMongoCollectionName = name => {
    if (isProd) {
        return name;
    } else if (isTesting){
        return `${name}-testing`;
    } else {
        return `${name}-preProd`;
    }
};

const apiResponse = (resType, msg) => {
    const targetObj = { response: msg };
    return Object.assign(targetObj, resType);
};

module.exports = {
    isSavedUrl,
    processUrls,
    configureMongoCollectionName,
    apiResponse
};

