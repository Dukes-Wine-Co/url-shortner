const nodeCache = require('../storage');

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
    switch (process.env.NODE_ENV) {
        case 'production':
            return name;
        case 'test':
            return `${name}-testing`;
        default:
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

