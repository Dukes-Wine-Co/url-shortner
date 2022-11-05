declare global {
	namespace NodeJS {
		interface ProcessEnv {
			GATEWAY_URL: string;
			NODE_ENV: 'development' | 'production' | 'test';
			DWC_API_KEY: string;
			MONGO_DB_URL: string;
			STRYKER_DASHBOARD_API_KEY: string;
			ZOOM_LINK: string;
			NGROK_AUTH_TOKEN: string;
			NGROK_SUBDOMAIN: string;
			PROCESSING_API_URL: string;
			SERVICE_ACCOUNT_EMAIL: string;
			SERVICE_ACCOUNT_PRIVATE_KEY: string;
			SHEET_ID: string;
		}
	}
}

export {}
