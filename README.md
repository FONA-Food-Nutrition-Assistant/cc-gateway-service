# FONA Gateway Service

FONA gateway service is a REST API that provides a gateway to the other FONA microservices.

## Features

- ✅ Validation Pipeline
- ✅ Response templates
- ✅ Error handling
- ✅ Code formatting and linting
- ✅ Dockerized
- ❌ Logging

## Service Configuration

To add a new service to the gateway, you need to add a new entry to the environment variable `FONA_SERVICE` in the `.env` file. The format of the entry is:

- `FONA_SERVICE_<SERVICE_NAME>_PREFIX=<SERVICE_PREFIX>` to add a new service prefix
- `FONA_SERVICE_<SERVICE_NAME>_URL=<SERVICE_URL>` to add a new service url

example:

```env
FONA_SERVICE_BOOKSHELF_PREFIX = bookshelf
FONA_SERVICE_BOOKSHELF_URL = http://localhost:3000
```

## Service Endpoints

To access a service endpoint, you need to use the following format:

`METHOD /<GATEWAY_PREFIX>/<SERVICE_PREFIX>/<SERVICE_ENDPOINT>`.

example:

```http
GET http://localhost:8080/gateway/bookshelf/books
```
