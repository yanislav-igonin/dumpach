const router = require('koa-router')();
const { boards } = require('../handlers');

router.get('/', boards.list);

module.exports = router.routes();
