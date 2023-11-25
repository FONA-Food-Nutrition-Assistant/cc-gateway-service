import { HttpStatus } from '@nestjs/common';
import { ResponseMessage } from './message.enum';

type THandledError =
	| HttpStatus.INTERNAL_SERVER_ERROR
	| HttpStatus.NOT_IMPLEMENTED
	| HttpStatus.BAD_GATEWAY
	| HttpStatus.BAD_REQUEST
	| HttpStatus.UNAUTHORIZED
	| HttpStatus.FORBIDDEN
	| HttpStatus.NOT_FOUND
	| HttpStatus.METHOD_NOT_ALLOWED
	| HttpStatus.REQUEST_TIMEOUT
	| HttpStatus.TOO_MANY_REQUESTS;

type TErrorMessages = {
	[key in THandledError]: ResponseMessage;
};

export const ErrorMessage: TErrorMessages = {
	[HttpStatus.INTERNAL_SERVER_ERROR]: ResponseMessage.ERR_INTERNAL_SERVER_ERROR,
	[HttpStatus.NOT_IMPLEMENTED]: ResponseMessage.ERR_NOT_IMPLEMENTED,
	[HttpStatus.BAD_GATEWAY]: ResponseMessage.ERR_BAD_GATEWAY,
	[HttpStatus.BAD_REQUEST]: ResponseMessage.ERR_BAD_REQUEST,
	[HttpStatus.UNAUTHORIZED]: ResponseMessage.ERR_UNAUTHORIZED,
	[HttpStatus.FORBIDDEN]: ResponseMessage.ERR_FORBIDDEN,
	[HttpStatus.NOT_FOUND]: ResponseMessage.ERR_NOT_FOUND,
	[HttpStatus.METHOD_NOT_ALLOWED]: ResponseMessage.ERR_METHOD_NOT_ALLOWED,
	[HttpStatus.REQUEST_TIMEOUT]: ResponseMessage.ERR_REQUEST_TIMEOUT,
	[HttpStatus.TOO_MANY_REQUESTS]: ResponseMessage.ERR_TOO_MANY_REQUESTS,
};
