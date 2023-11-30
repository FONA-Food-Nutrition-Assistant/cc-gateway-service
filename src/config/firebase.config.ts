import admin from 'firebase-admin';

const serviceAccount = require(__dirname + '/../../serviceAccountKey.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

export default admin;
