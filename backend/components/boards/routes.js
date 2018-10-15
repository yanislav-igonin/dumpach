const Router = require('koa-router');
const controller = require('./controller');

const router = new Router({
  prefix: '/api/boards',
});

router.get('/', controller.list);
router.get('/:boardId', controller.get);

module.exports = router.routes();
