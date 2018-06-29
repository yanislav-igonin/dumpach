const status = require('http-status');
const logger = require('../modules/logger');
const { HttpNotFoundException } = require('../modules/errors');
const env = process.env.NODE_ENV;

// console.log(HttpNotFoundException);
module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (env === 'development') {
      ctx.body = {
        error: {
          code: status.INTERNAL_SERVER_ERROR,
          message: err.message,
          stack: err.stack,
        },
      };
    }
  }
};
