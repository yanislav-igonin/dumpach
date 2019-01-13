const Router = require('koa-router');
const controller = require('./controller');

const router = new Router({
  prefix: '/api/v1/boards/:boardId',
});

router.get('/threads', controller.list);
router.post('/threads', controller.create);
router.get('/threads/:threadId', controller.get);
router.post('/threads/:threadId', controller.update);

module.exports = router.routes();
