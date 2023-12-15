import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

const envFound = dotenv.config();

if (!envFound || envFound.error) {
	Logger.error("Couldn't find .env file");
}

export default () => ({
	nodeEnv: process.env.NODE_ENV || 'development',
	app: {
		host: process.env.APP_HOST || '127.0.0.1',
		port: process.env.APP_PORT || 8080,
		prefix: process.env.APP_PREFIX || 'api',
	},
});
