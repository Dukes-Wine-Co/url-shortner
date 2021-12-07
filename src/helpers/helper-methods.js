const processUrls = arrOfUrls => {
    const urlMap = {};
    arrOfUrls.forEach(urlEntry => {
        urlMap[urlEntry.short] = urlEntry.destination;
    });

    return urlMap;
};

const apiResponse = (resType, msg) => {
    const targetObj = { response: msg };
    return Object.assign(targetObj, resType);
};

module.exports = {
    processUrls,
    apiResponse
};

