import { HttpStatus } from '@nestjs/common';
import { ResponseMessage } from 'src/common/message/message.enum';

export class GatewayProxyResponse {
	public status: HttpStatus;
	public data: any;

	constructor(status: HttpStatus, data: any) {
		this.status = status;
		this.data = data;
	}
}

export class TidyResponse extends GatewayProxyResponse {
	public message: ResponseMessage;

	constructor(status: HttpStatus, message: ResponseMessage, data: any) {
		super(status, data);
		this.message = message;
	}
}
