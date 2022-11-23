import { getAllPairs } from '../../helpers/db-transactions';
import { mongoShortnedUrls } from '../../config/mongo-config';
import { DSheets, ParsedSheetData, SheetRowData } from './sheets.types';
import { GenericObject, processUrls } from '../../helpers/helper-methods';
import { getSheetData } from './sheets';
import { UrlTypes } from '../../constants';
import * as nodeCache from '../../helpers/storage-methods'
import { logInfo } from '../../helpers/logger-methods';

export const getAllPairsInCache = () => {
	const externalPairs = nodeCache.read(UrlTypes.EXTERNAL) as GenericObject;
	const redirectPairs = nodeCache.read(UrlTypes.REDIRECT) as GenericObject;

	return {
		externalPairs,
		redirectPairs
	}
}

const getAllPairsInDb = async (): Promise<SheetRowData[]> => {
	return getAllPairs(mongoShortnedUrls)
}

const getAllSheetData = async (): Promise<ParsedSheetData> => {
	const [
		redirectPairs,
		externalPairs
	] = await Promise.all([
		getSheetData({ sheetName: DSheets.REDIRECT }),
		getSheetData({ sheetName: DSheets.EXTERNAL }),
	])

	return {
		[DSheets.REDIRECT]: redirectPairs,
		[DSheets.EXTERNAL]: externalPairs,
	}
}

export const syncAllPairs = async (): Promise<void> => {
	const sheetData = await getAllSheetData();
	const urls = await getAllPairsInDb();
	logInfo('The url pairs were successfully retrieved from the sync sheet');

	nodeCache.write(UrlTypes.REDIRECT, processUrls([
		...urls,
		...sheetData[DSheets.REDIRECT]
	]));

	nodeCache.write(UrlTypes.EXTERNAL, processUrls(sheetData[DSheets.EXTERNAL]));
}
