const status = require('http-status');
const logger = require('../modules/logger');
const { HttpNotFoundException } = require('../modules/errors');

// console.log(HttpNotFoundException);
module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof HttpNotFoundException) {
      ctx.body = {
        error: {
          code: status.NOT_FOUND,
          message: err.message,
        },
      };
    }
  }
};
