import { SheetRowData } from '../modules/sheets/sheets.types';

export interface GenericObject {
    [k: string]: string
}

export const processUrls = (arrOfUrls: SheetRowData[]): GenericObject => {
    const urlMap = {};
    arrOfUrls.forEach(urlEntry => {
        urlMap[urlEntry.short] = urlEntry.destination;
    });

    return urlMap;
};

export const apiResponse = (resType, msg) => {
    const targetObj = { response: msg };
    return Object.assign(targetObj, resType);
};

