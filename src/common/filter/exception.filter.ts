import { Catch, ArgumentsHost, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { ResponseMessage } from '../message/message.enum';
import { ErrorMessage } from '../message/message.constant';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
	catch(exception: any, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();

		const isHttpException = exception instanceof HttpException;

		const status = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		let message = ErrorMessage[status] || ResponseMessage.ERR_INTERNAL_SERVER_ERROR;

		const errorData = exception.getResponse() as any;

		const responseData = {
			status,
			method: request.method,
			message,
			data: errorData,
		};

		response.status(status).send(responseData);
	}
}
