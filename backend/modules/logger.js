const pino = require('pino');

const env = process.env.NODE_ENV;

const logger = {
  development: pino({ timestamp: false, level: 'debug', prettyPrint: true }),
  production: pino({ level: 'error' }),
};

module.exports = logger[env];
