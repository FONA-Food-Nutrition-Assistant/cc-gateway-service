import {
	Controller,
	Get,
	HttpStatus,
	Req,
	All,
	UseInterceptors,
	Post,
} from '@nestjs/common';
import { ResponseMessage } from 'src/common/message/message.enum';
import { GatewayService } from './gateway.service';
import { GatewayProxyResponse, TidyResponse } from 'src/util/responseHelper';
import { FastifyRequest } from 'fastify';
import {
	FileInterceptor,
	MemoryStorageFile,
	UploadedFile,
} from '@blazity/nest-file-fastify';

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

	@Post(`${process.env.FONA_SERVICE_IDENTIFICATION_PREFIX}/*`)
	@UseInterceptors(FileInterceptor('image'))
	async identificationPredict(
		@Req() request: FastifyRequest & { decodedToken: any },
		@UploadedFile() image: MemoryStorageFile,
	): Promise<GatewayProxyResponse> {
		const data = await this.gatewayService.forwardRequestContainImage(
			request,
			image,
		);
		return new GatewayProxyResponse(data.status, data.data);
	}

	@All(':service/*')
	async routeHandler(
		@Req() request: FastifyRequest & { decodedToken: any },
	): Promise<GatewayProxyResponse> {
		const data = await this.gatewayService.forwardRequest(request);
		return new GatewayProxyResponse(data.status, data.data);
	}
}
