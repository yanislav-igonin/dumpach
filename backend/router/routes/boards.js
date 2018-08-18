const router = require('koa-router')();
const { boards } = require('../handlers');
const threadsRoutes = require('./threads');

router.get('/', boards.list);
router.use('/:boardId', threadsRoutes);

module.exports = router.routes();
