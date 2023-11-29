import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
	constructor(private readonly configService: ConfigService) {}
	use(req: FastifyRequest, res: FastifyReply, next: () => void) {
		const { method, originalUrl, body, query } = req;
		const apiPrefix = this.configService.get('app.prefix');
		const url = originalUrl.replace(`/${apiPrefix}`, '').replace(/\?.*$/, '');
		const data = {
			body,
			query,
		};

		Logger.log(`[${method}] ${url} ${JSON.stringify(data)}`);
		next();
	}
}
