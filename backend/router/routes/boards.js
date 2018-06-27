const router = require('koa-router')();
const handlers = require('../handlers');

router.get('/', handlers.boards.list);

module.exports = router.routes();
