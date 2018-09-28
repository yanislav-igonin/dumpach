const Koa = require('koa');
global.Promise = require('bluebird');
const logger = require('./modules/logger');
const { routes } = require('./components');
const db = require('./db/connection');
const seedAll = require('./db/seeders');

const server = new Koa();

const middlewares = require('./middlewares');

middlewares.forEach(middleware => server.use(middleware));
logger.info('server - middlewares connection - success');

routes.forEach(route => server.use(route));
logger.info('server - routes initialization - success');

db.authenticate()
  .then(async () => {
    logger.info('database - online');

    try {
      await db.sync();
      logger.info('database - models syncing - success');
    } catch (e) {
      logger.error('database - models syncing - failure');
      logger.error('message:', e.message);
    }

    try {
      await seedAll();
      logger.info('database - seeding - success');
    } catch (e) {
      logger.error('database - seeding - failure');
      logger.error('message:', e.message);
    }

    server.listen(3000, () => {
      logger.info('server - online');
      logger.info('all systems nominal');
    });
  })
  .catch((e) => {
    logger.error(e);
  });
