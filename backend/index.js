const Koa = require('koa');
global.Promise = require('bluebird');
const { logger } = require('./modules');
const { routes } = require('./components');
const { db, seeders } = require('./db');
const { app } = require('./config');

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
    } catch (err) {
      logger.error('database - models syncing - failure');
      throw err;
    }

    try {
      await seeders.init();
      logger.info('database - seeding - success');
    } catch (err) {
      logger.error('database - seeding - failure');
      throw err;
    }

    server.listen(app.port, () => {
      logger.info('server - online');
      logger.info('all systems nominal');
    });
  })
  .catch((err) => {
    logger.error('message:', err.message);
    logger.error(err.stack);
    process.exit();
  });

// TODO: add boards stats(separate table)
