const { logger } = require('../modules');

const env = process.env.NODE_ENV;

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const error = {
      message: err.message,
      code: err.status,
      error: err.error,
    };

    if (env === 'development') {
      logger.error(err);
      error.stack = err.stack;
    }

    ctx.status = err.status || 500;
    ctx.body = {
      error,
    };
  }
};
