const Router = require('koa-router');
const controller = require('./controller');

const router = new Router({
  prefix: '/boards/:boardId',
});

router.get('/threads', controller.list);

module.exports = router.routes();
