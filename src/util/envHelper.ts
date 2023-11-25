import { FonaService } from 'src/common/interface/global.interface';

export const getListOfServices = (): Array<FonaService> =>
	Object.keys(process.env)
		.filter(key => key.startsWith('FONA_SERVICE'))
		.reduce((acc, key) => {
			const [, , serviceName, property] = key.split('_');
			const serviceObj = acc.find(obj => obj.serviceName === serviceName) || {
				serviceName: serviceName,
			};

			serviceObj[property.toLowerCase()] = process.env[key];
			if (!acc.find(obj => obj.serviceName === serviceName)) {
				acc.push(serviceObj);
			}
			return acc;
		}, []);
