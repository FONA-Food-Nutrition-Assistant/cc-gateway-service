import {
	Controller,
	Get,
	HttpStatus,
	Put,
	Req,
	Post,
	Delete,
} from '@nestjs/common';
import axios from 'axios';
import { ResponseMessage } from 'src/common/message/message.enum';
import { GatewayService } from './gateway.service';
import { GatewayProxyResponse, TidyResponse } from 'src/util/responseHelper';
import { FastifyRequest } from 'fastify';

@Controller()
export class GatewayController {
	constructor(private gatewayService: GatewayService) {}

	@Get('/status')
	async getStatus(): Promise<TidyResponse> {
		return new TidyResponse(
			HttpStatus.OK,
			ResponseMessage.OK,
			'Gateway is running',
		);
	}

	@Get(':service/*')
	async routeHandler(
		@Req() request: FastifyRequest & { decodedToken: any },
	): Promise<GatewayProxyResponse> {
		const data = await this.gatewayService.forwardRequest(request);
		return new GatewayProxyResponse(data.status, data.data);
	}
}
