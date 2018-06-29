const router = require('koa-router')();
const { threads } = require('../handlers');

router.get('/:boardId', threads.list);

router.get('/:boardId/:threadId', threads.read);

module.exports = router.routes();
