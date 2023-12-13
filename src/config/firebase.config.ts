import admin from 'firebase-admin';

const serviceAccount = process.env.GATEWAY_SERVICE_ACCOUNT,

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

export default admin;
