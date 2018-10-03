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

class HttpNotFoundException extends AppError {
  constructor(message) {
    super(message || 'Not found!', httpStatus.NOT_FOUND, httpStatus[404]);
  }
}

class HttpBadRequestException extends AppError {
  constructor(message) {
    super(message || 'Bad request!', httpStatus.BAD_REQUEST, httpStatus[400]);
  }
}

module.exports = {
  HttpNotFoundException,
  HttpBadRequestException,
};
