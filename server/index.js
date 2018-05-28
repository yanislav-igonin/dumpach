const Koa = require('koa');
global.Promise = require('bluebird');
const logger = require('./modules/logger');

const server = new Koa();

const middlewares = require('./middlewares');

middlewares.forEach((middleware) => server.use(middleware));
logger.info('server - middlewares connection - success');

server.listen(3000, () => logger.info('server - online'));