const logger = require('../modules/logger');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    logger.error('ERROR HANDLER');
    logger.error(err.message);
    logger.error(err.stack);
  }
}