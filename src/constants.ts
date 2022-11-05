export const trueMessage = { success: true };
export const failMessage = { success: false };
export const isProd = (envVal = process.env.NODE_ENV) => envVal === 'production';
export const isTesting = (envVal = process.env.NODE_ENV) => envVal === 'test';

export enum UrlTypes {
	REDIRECT = "redirect",
	EXTERNAL = "external",
}
