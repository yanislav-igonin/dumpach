const router = require('koa-router')();
const routes = require('./routes');

router.use('/api', routes);

module.exports = router;