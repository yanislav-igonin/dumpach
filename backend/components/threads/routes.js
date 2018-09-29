const Router = require('koa-router');
const controller = require('./controller');

const router = new Router({
  prefix: '/boards/:boardId',
});

router.get('/threads', controller.list);
router.post('/threads', controller.create);
router.get('/threads/:threadId', controller.get);
router.put('/threads/:threadId', controller.update);

module.exports = router.routes();
