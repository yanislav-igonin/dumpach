const status = require('http-status');
const logger = require('../modules/logger');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    logger.error('ERROR HANDLER');
    logger.error(err.message);
    logger.error(err.stack);

    ctx.body = {
      error: {
        code: status.INTERNAL_SERVER_ERROR,
        message: err.message,
        stack: err.stack,
      },
    };
  }
};
