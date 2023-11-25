import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { config, init as initConfig } from './config/global.config';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filter/exception.filter';

async function bootstrap() {
	try {
		// Initialize config
		initConfig();

		const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

		app.enableCors({
			origin: '*',
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			allowedHeaders: ['Content-Type', 'Authorization'],
		});

		app.setGlobalPrefix(config.app.prefix);

		app.useGlobalFilters(new AllExceptionsFilter());

		await app.listen(config.app.port, config.app.host);
		Logger.log(`Server running on http://${config.app.host}:${config.app.port}`);
	} catch (error) {
		Logger.error(`Error starting server: ${error}`);
		process.exit(1);
	}
}

bootstrap();
