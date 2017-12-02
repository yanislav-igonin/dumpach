const router = require('express').Router();
const boards = require('./boards');
const users = require('./users');

router.use('/boards', boards);
router.use('/users', users);

module.exports = router;
