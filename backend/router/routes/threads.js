const router = require('koa-router')();
const { threads } = require('../handlers');

router.get('/:boardId', threads.list);

router.get('/:boardId/:threadId', threads.read);
router.post('/:boardId', threads.create);

module.exports = router.routes();
