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
  /* eslint-disable-next-line consistent-return */
  .then(async () => {
    logger.info('database - online');

    try {
      await db.sync();
      logger.info('database - models syncing - success');
    } catch (err) {
      logger.error('database - models syncing - failure');
      return logger.error(err);
    }

    try {
      await seeders.init();
      logger.info('database - seeding - success');
    } catch (err) {
      logger.error('database - seeding - failure');
      return logger.error(err);
    }

    /* eslint-disable-next-line consistent-return */
    server.listen(app.port, (err) => {
      if (err) {
        logger.error('server - offline');
        return logger.error(err);
      }

      logger.info('server - online');
      logger.info('all systems nominal');
    });
  })
  .catch((err) => {
    logger.error('database - offline:');
    return logger.error(err);
  });

// TODO: add boards stats(separate table)
