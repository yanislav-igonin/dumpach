const httpStatus = require('http-status');

class AppError extends Error {
  constructor(message, status) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);

    this.status = status || 500;
  }
}

class HttpNotFoundException extends AppError {
  constructor(message) {
    super(message || 'Not found!', httpStatus.NOT_FOUND);
  }
}

module.exports = {
  HttpNotFoundException,
};
