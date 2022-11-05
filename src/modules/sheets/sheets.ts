import { sheets_v4 } from "googleapis"
import {
	GetSheetDataOptions,
	SheetRowData
} from './sheets.types';
import {
	sheetAPI,
	SHEET_ID,
	auth
} from "./sheets.config";

const getSheetsData = async () => {
	const resp = await sheetAPI.spreadsheets.get({
		spreadsheetId: SHEET_ID,
		includeGridData: true,
		ranges: ['A2:B', 'A2:B'],
		auth,
	});

	return resp.data.sheets
}

const parseRowData = (row: sheets_v4.Schema$RowData): SheetRowData => {
	return {
		short: row.values?.[0].formattedValue,
		destination: row.values?.[1].formattedValue
	}
}

export const getSheetData = async (options: GetSheetDataOptions): Promise<SheetRowData[]> => {
	const sheets = await getSheetsData();
	const sheet = sheets.find(sheet => sheet.properties.title === options.sheetName);
	let sheetData: SheetRowData[] = []

	if (sheet !== undefined){
		const gridData = sheet.data?.[0];

		sheetData = gridData.rowData.map(row => {
			return parseRowData(row)
		})
	} else {
		throw new Error(`Sheet undefined: ${options.sheetName}`)
	}

	return sheetData
}
