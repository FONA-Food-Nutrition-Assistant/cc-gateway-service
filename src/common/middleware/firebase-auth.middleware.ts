import {
	HttpException,
	HttpStatus,
	Injectable,
	Logger,
	NestMiddleware,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ResponseMessage } from 'src/common/message/message.enum';
import admin from 'src/config/firebase.config';
import { ServerResponse } from 'http';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
	async use(req: FastifyRequest, res: ServerResponse, next: () => void) {
		const authorization = req.headers.authorization;
		if (!authorization) {
			throw new HttpException(
				ResponseMessage.ERR_UNAUTHORIZED,
				HttpStatus.UNAUTHORIZED,
			);
		}

		const token = authorization.split(' ')[1];
		if (!token) {
			throw new HttpException(
				ResponseMessage.ERR_UNAUTHORIZED,
				HttpStatus.UNAUTHORIZED,
			);
		}

		try {
			const decodedToken = await admin.auth().verifyIdToken(token);
			req['decodedToken'] = decodedToken;
			req.headers['fona-client-uid'] = decodedToken.uid;
			Logger.log(`[FirebaseAuthMiddleware] ${JSON.stringify(decodedToken)}`);

			next();
		} catch (error) {
			throw new HttpException(
				ResponseMessage.ERR_UNAUTHORIZED,
				HttpStatus.UNAUTHORIZED,
			);
		}
	}
}
