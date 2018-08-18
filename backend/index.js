const Koa = require('koa');
global.Promise = require('bluebird');
const logger = require('./modules/logger');
const router = require('./router');
const db = require('./db/connection');
const seedAll = require('./db/seeders');

const server = new Koa();

const middlewares = require('./middlewares');

middlewares.forEach((middleware) => server.use(middleware));
logger.info('server - middlewares connection - success');

server.use(router.routes());
logger.info('server - routes initialization - success');

db.authenticate().then(async () => {
  logger.info('database - online');

  try {
    await db.sync({force: true}); // TODO: remove force sync
    logger.info(`database - models syncing - success`);
    await seedAll();
    logger.info(`database - seeding - success`);
  } catch (e) {
    logger.error(`database - models syncing - failure`);
    logger.error(`database - seeding - failure`);
    logger.error('message:', e.message);
  }

  server.listen(3000, () => {
    logger.info('server - online');
    logger.info('all systems nominal');
  });
});
