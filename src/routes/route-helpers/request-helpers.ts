import * as nodeCache from '../../helpers/storage-methods';
import { logError, logInfo, parseRequestDetails } from '../../helpers/logger-methods';
import { saveRequest } from './mongo-helpers';
import { UrlTypes } from '../../constants';
import { GenericObject } from '../../helpers/helper-methods';

const REDIRECT_MAP: GenericObject = {
    'virtual-tasting-1': process.env.ZOOM_LINK,
    'virtual-tasting': process.env.ZOOM_LINK,
    'juneteenth-2020': 'https://www.dukeswines.com/our-story',
    'trends-1': 'https://issuu.com/trendspublishing/docs/trends_mayjune21_emag?fr=sYTFjMjMwNjIzMg',
    'catalog-fall-2021': 'https://static1.squarespace.com/static/5dde0017fbd78f1f18e94e3c/t/61902046f8750318f4aa8adc/1636835398996/2021_Fall_Catalog.pdf',
    'catalog-winter-2021': 'https://static1.squarespace.com/static/5dde0017fbd78f1f18e94e3c/t/61debbb036f857659c36ea03/1641986993344/2021_winter_wine_catalog.pdf',
    'mahalome': 'https://mahalome.com/',
    'promo-mini-bottles-1': 'https://www.members.dukeswines.com/signup?isPromo=true&specialPromo=true&specialPromoTypes=sampleBottles&redirect=checkout'
};

export const isSavedUrl = entryUrlPath => {
    const formattedUrl = entryUrlPath.slice(1);

    if (formattedUrl === '') {
        return '';
    }

    const urlMap = nodeCache.read(UrlTypes.REDIRECT);
    return urlMap?.[formattedUrl] || false;
};

export const isValidDBReq = (
    req,
    dwcApiKey = process.env.DWC_API_KEY
) => {
    return req.headers?.apikey === dwcApiKey || req.query?.apikey === dwcApiKey;
};

export const mapRequest = (incoming, redirectMap = REDIRECT_MAP): string => {
    return redirectMap[incoming] || '';
};

export const setRedirectDestination = (destinationUrl, res, req) => {
    const entryPath = req.path || '';

    if (destinationUrl !== '') {
        res.set('destination-url', destinationUrl);
    } else {
        logError({
            log: 'invalid location. redirecting to home page',
            entryPath
        });

        res.set('destination-url', '');
    }
};

export const urlIsPhishing = url => {
    return url.includes('.');
};

export const skipDbSave = (req, parseReq = true) => {
    const { originalPath } = parseReq ? parseRequestDetails(req) : req;

    return urlIsPhishing(originalPath);
};

export const saveReqInDB = async req => {
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
