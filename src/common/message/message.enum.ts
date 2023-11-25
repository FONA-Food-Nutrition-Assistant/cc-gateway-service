export enum ResponseMessage {
	// Data Related
	OK = 'Successfully get data',
	OK_LIST = 'Successfully get list of data',
	OK_CREATE = 'Successfully create data',
	OK_UPDATE = 'Successfully update data',
	OK_DELETE = 'Successfully delete data',
	ERR = 'Failed to get data',
	ERR_LIST = 'Failed to get list of data',
	ERR_CREATE = 'Failed to create data',
	ERR_UPDATE = 'Failed to update data',
	ERR_DELETE = 'Failed to delete data',

	// Server Error
	ERR_INTERNAL_SERVER_ERROR = 'Internal server error',
	ERR_NOT_IMPLEMENTED = 'Not implemented',
	ERR_BAD_GATEWAY = 'Bad gateway',

	// Client Error
	ERR_BAD_REQUEST = 'Bad request',
	ERR_UNAUTHORIZED = 'Unauthorized',
	ERR_FORBIDDEN = 'Forbidden',
	ERR_NOT_FOUND = 'Not found',
	ERR_METHOD_NOT_ALLOWED = 'Method not allowed',
	ERR_REQUEST_TIMEOUT = 'Request timeout',
	ERR_TOO_MANY_REQUESTS = 'Too many requests',
}
