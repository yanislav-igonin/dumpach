const router = require('koa-router')();
const handlers = require('../handlers');

router.get('/:boardId', handlers.threads.list);

router.get('/:boardId/:threadId', handlers.threads.read);

module.exports = router.routes();
