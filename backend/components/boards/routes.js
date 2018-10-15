const Router = require('koa-router');
const controller = require('./controller');

const router = new Router({
  prefix: '/api/boards',
});

router.get('/', controller.list);
// TODO: add GET one board

module.exports = router.routes();
