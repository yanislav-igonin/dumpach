const router = require('express').Router();
const boards = require('./boards');
const auth = require('./auth');

router.use('/boards', boards);
router.use('/auth', auth);

module.exports = router;
