const Router = require('koa-router');
const controller = require('./controller');

const router = new Router({
  prefix: '/boards',
});

router.get('/', controller.list);

module.exports = router.routes();
