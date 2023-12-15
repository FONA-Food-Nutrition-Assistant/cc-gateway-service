import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filter/exception.filter';
import { ConfigService } from '@nestjs/config';
import multiPart from '@fastify/multipart';

async function bootstrap() {
	try {
		const env = process.env.NODE_ENV || 'development';
		const app = await NestFactory.create<NestFastifyApplication>(
			AppModule,
			new FastifyAdapter({ maxParamLength: 1000, bodyLimit: 30 * 1024 * 1024 }),
			{
				logger:
					env === 'production'
						? []
						: ['warn', 'error', 'debug', 'log', 'verbose'],
			},
		);

		app.register(multiPart);

		const configService = app.get(ConfigService);

		app.enableCors({
			origin: '*',
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			allowedHeaders: ['Content-Type', 'Authorization'],
		});

		app.setGlobalPrefix(configService.get('app.prefix'));

		app.useGlobalFilters(new AllExceptionsFilter());

		await app.listen(
			configService.get('app.port'),
			configService.get('app.host'),
		);
		Logger.log(
			`Server running on http://${configService.get(
				'app.host',
			)}:${configService.get('app.port')}`,
		);
	} catch (error) {
		Logger.error(`Error starting server: ${error}`);
		process.exit(1);
	}
}

bootstrap();
