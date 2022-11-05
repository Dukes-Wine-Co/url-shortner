export enum DSheets {
	EXTERNAL = "external",
	REDIRECT = "redirect"
}

export interface GetSheetDataOptions {
	sheetName: DSheets;
}

export interface SheetRowData {
	short: string;
	destination: string;
}

export type ParsedSheetData = {
	[key in DSheets]: SheetRowData[];
};
