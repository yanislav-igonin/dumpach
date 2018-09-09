const logger = require('../modules/logger');
// const { HttpNotFoundException } = require('../modules/errors');

const env = process.env.NODE_ENV;

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const error = {
      message: err.message,
      code: err.status,
    };

    if (env === 'development') {
      logger.error(err);
    }

    ctx.status = err.status || 500;
    ctx.body = {
      error,
    };
  }
};
