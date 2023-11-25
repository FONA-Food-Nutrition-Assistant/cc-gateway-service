import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TidyResponse } from 'src/util/responseHelper';
import { FastifyReply } from 'fastify';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			tap(data => {
				if (data instanceof TidyResponse) {
					const res = context.switchToHttp().getResponse<FastifyReply>();
					res.header('Content-Type', 'application/json; charset=utf-8');
					res.status(data.status).send({
						status: data.status,
						method: res.request.method,
						message: data.message,
						data: data.data,
					});
				}
			}),
		);
	}
}
