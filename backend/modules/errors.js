class HttpException extends Error {
  toJSON() {
    const { type, message } = this;
    return { error: { type, message } };
  }
}

class HttpNotFoundException extends HttpException {
  constructor(msg) {
    super(msg);

    this.type = 'not_found_error';
  }
}

module.exports = {
  HttpNotFoundException,
};
