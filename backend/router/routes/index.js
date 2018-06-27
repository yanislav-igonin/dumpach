const router = require('koa-router')();

const boardsRoutes = require('./boards');
const threadsRoutes = require('./threads');

router.use('/boards', boardsRoutes);
router.use('/threads', threadsRoutes);

module.exports = router.routes();