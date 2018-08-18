const router = require('koa-router')();

const boardsRoutes = require('./boards');

router.use('/boards', boardsRoutes);

module.exports = router.routes();