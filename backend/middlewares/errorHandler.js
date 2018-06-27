const status = require('http-status');
const logger = require('../modules/logger');
const { HttpNotFoundException } = require('../modules/errors');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err.name);
    console.log(err instanceof HttpNotFoundException);
    // if (err instanceof HttpNotFoundException) {
      ctx.body = {
        error: {
          code: status.NOT_FOUND,
          message: err.message,
        },
      };
    // }
  }
};
