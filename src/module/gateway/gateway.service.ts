import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { FastifyRequest } from 'fastify';
import { FonaService } from 'src/common/interface/global.interface';
import { getListOfServices } from 'src/util/envHelper';
import * as https from 'https';
import { ResponseMessage } from 'src/common/message/message.enum';

@Injectable()
export class GatewayService {
	private readonly services: Array<FonaService>;

	constructor() {
		this.services = getListOfServices();
	}

	async forwardRequest(request: FastifyRequest): Promise<any> {
		try {
			const requestedService = request.params['service'];
			const service = this.services.find(s => s.prefix === requestedService);

			if (!service)
				throw new HttpException(
					ResponseMessage.ERR_NOT_FOUND,
					HttpStatus.NOT_FOUND,
				);

			const { status, data } = await this._createRequest({
				method: request.method,
				url: `${service.url}/${request.params['*']}`,
				params: request.query,
				headers: request.headers,
				data: request.body,
			});

			return { status, data };
		} catch (error) {
			Logger.error(
				`[GatewayService] ${JSON.stringify(error.response?.status)}`,
			);
			return {
				status: error.response?.status || 500,
				data: error.response?.data || error,
			};
		}
	}

	private async _createRequest(axiosConfig: AxiosRequestConfig): Promise<any> {
		const { method, url, params, headers, data } = axiosConfig;

		// Create https agent to allow self-signed certificate
		// TODO: Change this to use certificate from trusted CA
		const agent = new https.Agent({
			rejectUnauthorized: false,
		});

		// Rewrite headers to be sent to the target service
		const targetHost = url.split('/')[2];
		const newHeaders = {
			host: targetHost,
			'fona-client-uid': headers['fona-client-uid'],
		};

		return await axios({
			method,
			url,
			params,
			headers: newHeaders,
			data,
			httpsAgent: agent,
		});
	}
}
