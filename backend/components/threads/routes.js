const Router = require('koa-router');
const controller = require('./controller');

const router = new Router({
  prefix: '/boards/:boardId',
});

router.get('/', controller.get);

module.exports = router.routes();
