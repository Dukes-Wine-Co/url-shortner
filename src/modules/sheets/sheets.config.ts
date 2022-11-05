import { google } from 'googleapis';

export const {
	SHEET_ID,
	SERVICE_ACCOUNT_EMAIL,
	SERVICE_ACCOUNT_PRIVATE_KEY,
} = process.env;

export const auth = new google.auth.JWT({
	email: SERVICE_ACCOUNT_EMAIL,
	key: SERVICE_ACCOUNT_PRIVATE_KEY,
	scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

export const sheetAPI = google.sheets("v4");
