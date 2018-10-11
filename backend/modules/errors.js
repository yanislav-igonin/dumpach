const httpStatus = require('http-status');

class AppError extends Error {
  constructor(message, status, error) {
    super(message);

    this.name = this.constructor.name;
    this.status = status || 500;
    this.error = error || httpStatus[500];

    Error.captureStackTrace(this, this.constructor);
  }
}

class HttpBadRequestException extends AppError {
  constructor(message) {
    super(message || 'Bad request', httpStatus.BAD_REQUEST, httpStatus[400]);
  }
}

class HttpNotFoundException extends AppError {
  constructor(message) {
    super(message || 'Not found', httpStatus.NOT_FOUND, httpStatus[404]);
  }
}

class HttpPayloadTooLargeException extends AppError {
  constructor(message) {
    super(
      message || 'Payload Too Large',
      httpStatus.REQUEST_ENTITY_TOO_LARGE,
      httpStatus[413],
    );
  }
}

class HttpUnsupportedMediaTypeException extends AppError {
  constructor(message) {
    super(
      message || 'Unsupported Media Type',
      httpStatus.UNSUPPORTED_MEDIA_TYPE,
      httpStatus[415],
    );
  }
}

module.exports = {
  HttpBadRequestException,
  HttpNotFoundException,
  HttpPayloadTooLargeException,
  HttpUnsupportedMediaTypeException,
};
