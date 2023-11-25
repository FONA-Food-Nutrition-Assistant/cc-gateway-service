import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import axios from 'axios';
import { ResponseMessage } from 'src/common/message/message.enum';
import { GatewayService } from './gateway.service';
import { TidyResponse } from 'src/util/responseHelper';
import { FastifyRequest } from 'fastify';

@Controller()
export class GatewayController {
	constructor(private gatewayService: GatewayService) {}

	@Get('/status')
	async getStatus(): Promise<TidyResponse> {
		return new TidyResponse(HttpStatus.OK, ResponseMessage.OK, 'Gateway is running');
	}

	@Get(':service/*')
	async routeHandler(@Req() request: FastifyRequest): Promise<any> {
		return await this.gatewayService.forwardRequest(request);
	}
}
