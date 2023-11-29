import {
	Catch,
	ArgumentsHost,
	HttpStatus,
	HttpException,
	Logger,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { ResponseMessage } from '../message/message.enum';
import { ErrorMessage } from '../message/message.constant';
import { ServerResponse } from 'http';
import { FastifyReply } from 'fastify';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
	catch(exception: any, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response: FastifyReply = ctx.getResponse();
		const request = ctx.getRequest();

		const isHttpException = exception instanceof HttpException;

		const status = isHttpException
			? exception.getStatus()
			: HttpStatus.INTERNAL_SERVER_ERROR;
		let message =
			ErrorMessage[status] || ResponseMessage.ERR_INTERNAL_SERVER_ERROR;

		const errorData = isHttpException
			? (exception.getResponse() as any)
			: exception.response;

		const responseData = {
			status,
			method: request.method,
			message,
			data: errorData,
		};

		if (response instanceof ServerResponse) {
			response.writeHead(status, { 'Content-Type': 'application/json' });
			response.write(JSON.stringify(responseData));
			response.end();
			return;
		}

		response.status(status).send(responseData);
	}
}
