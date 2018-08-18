const router = require('koa-router')();
const { threads } = require('../handlers');

router.get('/threads/', threads.list);
router.get('/threads/:threadId', threads.read);
router.post('/threads', threads.create);
router.put('/threads/:threadId', threads.update);

module.exports = router.routes();
