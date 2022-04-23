const nodeCache = require('../../helpers/storage-methods');
const { logError, logInfo, parseRequestDetails } = require('../../helpers/logger-methods');
const { saveRequest } = require('./mongo-helpers');

const REDIRECT_MAP = {
    'virtual-tasting-1': process.env.ZOOM_LINK,
    'virtual-tasting': process.env.ZOOM_LINK,
    'juneteenth-2020': 'https://www.dukeswines.com/our-story',
    'trends-1': 'https://issuu.com/trendspublishing/docs/trends_mayjune21_emag?fr=sYTFjMjMwNjIzMg',
    'catalog-fall-2021': 'https://static1.squarespace.com/static/5dde0017fbd78f1f18e94e3c/t/61902046f8750318f4aa8adc/1636835398996/2021_Fall_Catalog.pdf',
    'catalog-winter-2021': 'https://static1.squarespace.com/static/5dde0017fbd78f1f18e94e3c/t/61debbb036f857659c36ea03/1641986993344/2021_winter_wine_catalog.pdf',
    'mahalome': 'https://mahalome.com/',
    'promo-mini-bottles-1': 'https://www.members.dukeswines.com/signup?isPromo=true&specialPromo=true&specialPromoTypes=sampleBottles&redirect=checkout'
};

const isSavedUrl = entryUrlPath => {
    const formattedUrl = entryUrlPath.slice(1);

    if (formattedUrl === '') {
        return '';
    }

    const urlMap = nodeCache.read('mongoUrls');
    return urlMap?.[formattedUrl] || false;
};

const isValidDBReq = (
    req,
    dwcApiKey = process.env.DWC_API_KEY
) => {
    return req.headers?.apikey === dwcApiKey || req.query?.apikey === dwcApiKey;
};

const mapRequest = (incoming, redirectMap = REDIRECT_MAP) => {
    return redirectMap[incoming] || false;
};

const setRedirectDestination = (destinationUrl, res, req) => {
    const entryPath = req.path || '';

    if (destinationUrl !== false) {
        res.set('destination-url', destinationUrl);
    } else {
        logError({
            log: 'invalid location. redirecting to home page',
            entryPath
        });

        res.set('destination-url', '');
    }
};

const urlIsPhishing = url => {
    return url.includes('.');
};

const skipDbSave = (req, parseReq = true) => {
    const { originalPath } = parseReq ? parseRequestDetails(req) : req;

    return urlIsPhishing(originalPath);
};

const saveReqInDB = async req => {
    try {
        if (skipDbSave(req)){
            return;
        }

        await saveRequest(req);
        logInfo('saveReqInDB(): req saved to db', req);
    } catch (e){
        logError(
            e.message,
            req
        );
    }
};

module.exports = {
    isSavedUrl,
    isValidDBReq,
    setRedirectDestination,
    mapRequest,
    saveReqInDB,
    skipDbSave
};
