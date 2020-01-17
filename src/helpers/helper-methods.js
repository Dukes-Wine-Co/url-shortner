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

module.exports = {
    isSavedUrl,
    processUrls
};

