const Router = require('koa-router');
const controller = require('./controller');

const router = new Router({
  prefix: '/boards/:boardId',
});

router.get('/threads', controller.list);
router.get('/threads/:threadId', controller.get);

module.exports = router.routes();
