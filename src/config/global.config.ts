import * as dotenv from 'dotenv';

const envFound = dotenv.config();

export const init = () => {
	if (envFound.error) {
		throw envFound.error;
	}
};

export const config = {
	nodeEnv: process.env.NODE_ENV || 'development',
	app: {
		host: process.env.APP_HOST || '127.0.0.1',
		port: process.env.APP_PORT || 8080,
		prefix: process.env.APP_PREFIX || 'api',
	},
};
