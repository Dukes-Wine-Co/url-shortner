const nodeCache = require('../storage');
const { isProd } = require('./constants');

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

const configureMongoCollectionName = name => isProd ? name : `${name}-preProd`;

module.exports = {
    isSavedUrl,
    processUrls,
    configureMongoCollectionName
};

