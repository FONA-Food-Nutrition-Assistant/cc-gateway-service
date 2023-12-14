import admin from 'firebase-admin';

const fs = require('fs');

const data = {
	type: process.env.GOOGLE_APPLICATION_CREDENTIALS_TYPE,
	project_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_PROJECT_ID,
	private_key_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY_ID,
	private_key: process.env.GOOGLE_APPLICATION_CREDENTIALS_PRIVATE_KEY,
	client_email: process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_EMAIL,
	client_id: process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_ID,
	auth_uri: process.env.GOOGLE_APPLICATION_CREDENTIALS_AUTH_URI,
	token_uri: process.env.GOOGLE_APPLICATION_CREDENTIALS_TOKEN_URI,
	auth_provider_x509_cert_url:
		process.env.GOOGLE_APPLICATION_CREDENTIALS_AUTH_PROVIDER,
	client_x509_cert_url:
		process.env.GOOGLE_APPLICATION_CREDENTIALS_CLIENT_CERT_URL,
	universe_domain: process.env.GOOGLE_APPLICATION_CREDENTIALS_UNIVERSE_DOMAIN,
};

fs.writeFile('./serviceAccountKeyGithub.json', JSON.stringify(data), error => {
	if (error) {
		console.log('An error has occurred ', error);
		return;
	}
	console.log('Data written successfully to disk');
});

const serviceAccount = require(__dirname + '/../../serviceAccountKey.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

export default admin;
