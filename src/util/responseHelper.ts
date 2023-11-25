import { HttpStatus } from '@nestjs/common';
import { ResponseMessage } from 'src/common/message/message.enum';

export class TidyResponse {
	public status: HttpStatus;
	public message: ResponseMessage;
	public data: any;

	constructor(status: HttpStatus, message: ResponseMessage, data: any) {
		this.status = status;
		this.message = message;
		this.data = data;
	}
}
