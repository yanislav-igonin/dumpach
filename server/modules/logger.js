const pino = require('pino');

const logger = {
  development: pino({timestamp: false, level: 'debug', prettyPrint: true}),
  production: pino({level: 'error'})
}

module.exports = logger[process.env.NODEENV];
